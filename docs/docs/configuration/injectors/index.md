---
slug: /configuration-injectors
title: Telemetry Injectors
authors: Bernt Christian Egeland
tags: []
---

# Telemetry Injectors

Injectors bridge external sensors and scripts into the MAVLink stream as `NAMED_VALUE_FLOAT` / `NAMED_VALUE_INT` messages. Any connected ground station (QGroundControl, Mission Planner, fleet tools) sees the values as native telemetry, and they appear automatically in your [Data Streams](/docs/6.x/configuration-data-streams) dashboards.

Find the page under **Flight Controller → Injectors**.

## Why use Injectors

Before Injectors, the common workaround was to abuse a Ground Control Station slot to push synthetic MAVLink into the stream. Injectors replace that hack with a first-class, listener-based pipeline that runs inside the Rust factory and auto-starts on boot, so injected signals keep flowing without any UI interaction.

Typical uses:

- **Companion-computer sensors:** radiation, weather, gas, light, anything not native to the autopilot.
- **LTE / cellular signal stats** (RSRP, SINR, RSSI) so the operator can monitor link quality in real time.
- **Custom scripts on the Pi** that compute derived values (filtered, averaged, healthy / unhealthy flags).

## Transport types

Pick a transport when you add an injector. Type cannot be changed after creation; rotate or delete and recreate if you need to switch.

### HTTP

The injector exposes a unique URL with a secret token after creation. Any tool that can make an HTTP POST (curl, Python, an MCU with WiFi) sends JSON to that URL and the values flow into MAVLink.

- **Easiest to integrate**, no port forwarding needed beyond what UAVcast already exposes.
- Use **Copy URL** to grab the full endpoint, or **Copy token only** to plug into existing tooling.
- Use **Rotate token** if you need to revoke the URL. Existing clients will start getting `401` immediately.

Example with curl:

```bash
curl -X POST https://your-uavcast/inject/<token> \
    -H "Content-Type: application/json" \
    -d '{"name": "RAD1", "value": 0.42}'
```

Batched form:

```json
[
    {"name": "RAD1", "value": 0.42},
    {"name": "RAD2", "value": 0.51}
]
```

### UDP

The injector binds a port and receives line-delimited or JSON packets. Lowest overhead, no authentication, anyone who can reach the port can send. Good for trusted local networks (the Pi itself, a tethered companion, an Arduino on the same LAN).

- **Port:** pick something unused. `14600` is a safe default.
- **Bind address:** `0.0.0.0` to accept packets from other devices on the network, `127.0.0.1` to lock to the same machine.
- **Protocol:** `Key=Value` (one signal per line as `NAME=VALUE`) or `JSON` (`{"name":"X","value":1.23}` per packet, or a batched array).

### Serial

The injector reads line-delimited samples from a tty device. Best for hardwired companion sensors (an Arduino over USB, an RS-232 sensor on a USB-to-Serial adapter).

- **Device path:** `/dev/ttyUSB0`, `/dev/ttyACM0`, etc. Run `ls /dev/tty*` to discover.
- **Baud rate:** must match the sender (9600, 57600, 115200 are common).
- The injector reconnects automatically if the device unplugs.

:::tip dialout group
The user running `uavcast-mavlink-manager` needs access to the serial device. On Debian / Raspberry Pi OS that usually means adding the user to the `dialout` group:

```bash
sudo usermod -aG dialout <user>
```
:::

## Configuration fields

### Name

A friendly label shown in the UI only. Does not affect MAVLink output.

### Enabled

Disable to keep the configuration but stop the listener. The HTTP endpoint will return 503, UDP and serial listeners are not bound.

### MAVLink sysid

MAVLink **System ID**, identifies which "vehicle" a message belongs to. The flight controller is usually `sysid 1`. Keeping injected values on the same sysid groups them with that vehicle in QGroundControl and Mission Planner. Range `1–255`. Default `1`.

### MAVLink compid

MAVLink **Component ID**, identifies which device within the system sent the message. Range `0–255`.

Common values:

- `1` &mdash; autopilot
- `25–50` &mdash; onboard companions
- `190` &mdash; generic onboard sensor
- `194` &mdash; popular choice for user payload sensors

Default `194`.

### Name prefix

Optional. Automatically prepended to every signal name from this injector. Useful when multiple sources publish similar names: set `BAL_` so an incoming `RAD1` becomes `BAL_RAD1` on the wire.

:::warning 10-character cap
MAVLink hard-caps the total `NAMED_VALUE_*` name length at 10 characters, so keep the prefix short. The injector truncates anything beyond 10 characters.
:::

### Rate limit (Hz per signal)

Maximum samples per second, **per signal name**. A sensor reporting at 100 Hz with `rateLimit=10` gets 90 samples dropped silently. Protects the MAVLink bus from being saturated by a runaway source.

## Sample formats

### Key=Value

One signal per line:

```
RAD1=0.42
TEMP=21.5
LTE_RSRP=-92
```

Optional type suffix forces integer encoding (`NAMED_VALUE_INT` instead of `NAMED_VALUE_FLOAT`):

```
LTE_BAR:int=4
```

### JSON

Single sample:

```json
{"name": "RAD1", "value": 0.42}
```

Batched:

```json
[
    {"name": "RAD1", "value": 0.42},
    {"name": "TEMP", "value": 21.5}
]
```

Use `"kind": "int"` to force integer encoding:

```json
{"name": "LTE_BAR", "value": 4, "kind": "int"}
```

## Sending a test signal

Each injector has a **Send test signal** action. Type a signal name and value, hit **Send**, and a single `NAMED_VALUE_FLOAT` (or `INT`) message will be emitted on the bus with the configured sysid / compid / prefix. The effective name after prefix is shown in the dialog.

Useful for confirming a ground station sees the value, or to seed a dashboard widget before the real sensor is wired up.

## Stats

Each injector card shows live counters refreshed every 2 seconds:

- **Accepted** &mdash; samples that passed validation and were emitted on MAVLink.
- **Rate-limited** &mdash; samples dropped because they exceeded the per-signal Hz cap.
- **Rejected** &mdash; samples that failed parsing or sanitation (empty name, NaN value, etc.).

Counters survive listener restarts (configuration edits) but reset if the device reboots.

## Viewing injected values

Injected values appear automatically in the [Data Streams](/docs/6.x/configuration-data-streams) dashboards under their configured names (with prefix applied). They are also forwarded to every connected Ground Control Station alongside normal flight controller telemetry.

## Troubleshooting

### HTTP injection returns 404

- Double-check the token in the URL matches the one shown in the injector card. If you rotated the token, your client needs to be updated.
- Confirm the injector is **Enabled**.

### UDP packets sent but counters do not move

- Verify your sender targets the same port and host shown on the UDP endpoint card.
- If you bound to `127.0.0.1` but are sending from another device, switch the bind address to `0.0.0.0`.
- Watch the **Rejected** counter: if it climbs, the payload is malformed. The Rust factory logs the reason.

### Serial device not found

- Run `ls /dev/tty*` and confirm the device exists.
- Confirm the running user is in the `dialout` group: `groups | grep dialout`.
- Make sure no other process holds the port (a Mission Planner instance, a stale Arduino IDE).

### Values appear in QGroundControl but not in Data Streams

- The widget binding looks for the **effective** name (prefix applied). Open the widget config and verify the name there matches what you see in QGroundControl.

## Related pages

- [Data Streams](/docs/6.x/configuration-data-streams) &mdash; visualize injected values
- [Flight Controller](/docs/6.x/configuration-flight-controller) &mdash; the page that hosts the Injectors tab
- [Ground Control Stations](/docs/6.x/configuration-ground-controller) &mdash; where injected values are forwarded
