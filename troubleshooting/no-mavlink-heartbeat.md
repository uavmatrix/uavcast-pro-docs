# No MAVLink heartbeat from the flight controller

> UAVcast-Pro shows No heartbeat or Waiting for device? Check the USB cable, TELEM wiring, SERIAL protocol and baud rate, then use Auto-detect.

The **Flight Controller → Connection** page shows **No heartbeat**, **Waiting for device**, **Detecting baud rate** or **Searching**, and the dashboard's **Flight controller** row never turns green. UAVcast-Pro can't hear the flight controller yet.

The page has a live **Connection check** that tests each step once per second and explains the first problem it finds. Read it first: it is usually faster than this page.

![Connection check card with four rows: flight controller plugged in, readable flight controller data, flight controller responding and sending to ground station](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/flight-controller--connection-check.webp)

*The Connection check on a working link: all four steps pass. When the link fails, the first failing step is marked and explained.*

| What you see | Likely cause | Start at |
| --- | --- | --- |
| Waiting for device, or Flight controller plugged in: Not detected | No data cable, or the board is not powered | [Check 1](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/#check-1) |
| Signal on the wire, but no readable data | Wrong baud rate, TX/RX swapped, or the port is not set to MAVLink | [Check 2](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/#check-2) |
| Readable data shows a high % damaged | Loose or long wire, missing ground, or electrical noise | [Check 3](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/#check-3) |
| Port shows in use by another program | Something else holds the serial port | [Check 4](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/#check-4) |
| Status Off or Stopped | The link is switched off | [Check 5](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/#check-5) |

## Check 1: Is the flight controller seen at all?

**Over USB:**

1. Make sure the flight controller is powered and its USB cable goes to the companion computer.
2. Try another cable. Many USB cables only charge and carry no data. If the board lights up but **Flight controller plugged in** says **Not detected**, the cable is the usual cause.
3. Under **Link type**, choose **USB** and leave **Port** on **Automatic**. Automatic finds the flight controller and follows it if the device number changes.

**Over a TELEM port (UART / Serial):**

1. Under **Link type**, choose **UART / Serial**.
2. Check the wiring: flight controller **TX → RX** on the companion computer, **RX → TX**, and **GND → GND**. A missing ground wire is a common cause.
3. Never power the Raspberry Pi from the TELEM port. Power it separately.

> **Raspberry Pi serial port**
>
> The installer enables the Pi's UART and removes the serial console from `cmdline.txt`. On a Pi 3, 4 or Zero 2 W it also disables Bluetooth so the full UART is free. If you installed the OS again after UAVcast-Pro, run the installer again.

## Check 2: Match the port settings on the flight controller

On a TELEM port, the flight controller must speak MAVLink at the speed UAVcast-Pro listens on. USB connections don't use a baud rate.

1. Connect the flight controller to Mission Planner or QGroundControl over USB.
2. Open the full parameter list and find the serial port you wired: `SERIAL1` for TELEM1, `SERIAL2` for TELEM2.
3. Set `SERIALx_PROTOCOL` to `2` (MAVLink2). Write the parameters and reboot the flight controller.
4. Note `SERIALx_BAUD`. In UAVcast-Pro, leave **Baud rate** on **Automatic**, or pick the same value.

With **Automatic**, UAVcast-Pro tries 57600, 115200, 921600, 1500000, 460800, 230400 and 500000 baud and remembers the rate that worked. The status shows *Trying … baud (n of 7)* while it searches.

> **Let UAVcast-Pro search for you**
>
> Press **Auto-detect**. It pauses the link, listens on every port and baud rate, then saves what it finds. This can take up to a minute. If it reports **No flight controller found**, open **Show what was tried** to see each port and speed it tested.

## Check 3: Damaged data

If **Readable flight controller data** shows a percentage *damaged*, bytes are arriving but corrupted. This usually means a loose or long wire, a missing ground wire, or noise from motors and power cables.

- Re-seat the connectors and shorten the cable.
- Route the signal wires away from ESC and battery leads.
- Try a lower `SERIALx_BAUD`, for example 57600 or 115200.

## Check 4: Port in use

The **Port** list marks ports that another program holds (*in use by …*). Stop that program, for example a MAVProxy or a second router you started yourself, or pick another port.

## Check 5: Is the link switched on?

At the top of the page, **Link enabled** must be on. If the status says **Link stopped**, press **Connect**. Settings apply immediately, without a restart.

## Still no heartbeat?

[Download the logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/) with **Mavlink Manager** selected. The included `diagnostics.txt` lists the serial devices, who holds them and the USB and power events from the kernel, which is what support needs for link problems.

Once the flight controller shows **Connected** but your ground station still waits, go to [No telemetry in the ground station](https://docs.uavmatrix.com/troubleshooting/no-telemetry-in-gcs/).

Related: [Flight controller connection](https://docs.uavmatrix.com/uavcast-pro/flight-controller/) · [Hardware requirements](https://docs.uavmatrix.com/get-started/hardware-requirements/)

Source: https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/
