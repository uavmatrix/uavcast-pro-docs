# MAVLink Inspector

> Use the UAVcast-Pro MAVLink Inspector to see every message from the flight controller with its rate, system ID and component ID, and debug telemetry and injectors.

The Inspector lists every MAVLink message UAVcast-Pro receives, grouped by vehicle, with its rate and latest field values. Use it to check that the flight controller sends what you expect, to find a message's exact field names, or to confirm that an [injector](https://docs.uavmatrix.com/uavcast-pro/flight-controller/injectors/) produces `NAMED_VALUE_FLOAT` messages. Open **Flight Map → Inspector**.

![MAVLink Inspector with connection status and the message list for system 1 showing message names, rates in Hz and counts](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/flight-map--inspector.webp)

*Flight Map → Inspector with the messages from the flight controller (system 1) and ATTITUDE expanded.*

## What you see

**MAVLink Connection Status** at the top: **Connection**, **Vehicle**, **GPS Satellites**, **Total Messages** and **System ID**.

**Message Inspector** below: one group per vehicle (*Vehicle (System ID: 1)*), and in it one row per message with:

- the message name,
- **COMP**: the component ID that sent it (1 = autopilot, 194 = the default for injectors),
- the rate in **Hz** and the number of messages received.

Open a message to see its fields and current values.

## Typical checks

| Question | Look for |
| --- | --- |
| Is the GPS sending data? | `GPS_RAW_INT` at 2 to 10 Hz, and `GPS_RTK` if you use [RTK](https://docs.uavmatrix.com/uavcast-pro/flight-controller/ntrip-rtk/). |
| Why is telemetry slow in the ground station? | Low rates on `ATTITUDE`, `VFR_HUD` or `GLOBAL_POSITION_INT`. Raise the `SRx_` stream rates on the flight controller's MAVLink port. |
| Does my injector work? | `NAMED_VALUE_FLOAT` under COMP 194 (or the compid you set). |

If the list says *Waiting for messages...*, the flight controller link isn't connected. See [Flight controller](https://docs.uavmatrix.com/uavcast-pro/flight-controller/).

Source: https://docs.uavmatrix.com/uavcast-pro/flight-map/inspector/
