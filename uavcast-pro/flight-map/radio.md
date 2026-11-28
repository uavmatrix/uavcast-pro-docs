# Radio tab

> See live RC channel PWM values and RSSI from your flight controller in the UAVcast-Pro Radio tab, to check transmitter switches and RC camera switching.

The Radio tab shows the RC input the flight controller receives from your transmitter: every channel's PWM value and the RSSI (signal strength). Use it to check switch assignments, for example the channel you use for [RC camera switching](https://docs.uavmatrix.com/uavcast-pro/camera/multi-camera/), without connecting a ground station. Open **Flight Map → Radio**.

![Radio tab with the RSSI badge, the four primary channels and the auxiliary channels, all at 0](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/flight-map--radio.webp)

*Flight Map → Radio on a bench unit without an RC receiver, so every channel reads 0.*

## What you see

- **RSSI**: the receiver's signal strength from the flight controller, rated **No Signal**, **Weak**, **Fair**, **Good** or **Excellent**. It needs RSSI to be set up on the flight controller (`RSSI_TYPE` on ArduPilot).
- **Primary Controls**: **Channel 1 - Roll**, **Channel 2 - Pitch**, **Channel 3 - Throttle** and **Channel 4 - Yaw**, in the Mission Planner layout.
- **Auxiliary Channels**: the remaining channels.

PWM values typically range from 1000 (min) to 2000 (max). A channel that never moves means it isn't mapped on the transmitter, or the receiver doesn't send it.

The values come from the flight controller's `RC_CHANNELS` message, so they only update while the flight controller link is **Connected**.

Source: https://docs.uavmatrix.com/uavcast-pro/flight-map/radio/
