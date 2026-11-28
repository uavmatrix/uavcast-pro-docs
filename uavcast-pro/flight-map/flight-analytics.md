# Flight Analytics

> Graph live MAVLink telemetry or a recorded .tlog file in UAVcast-Pro Flight Analytics. Pick up to 10 parameters, compare them over time and review a flight on the drone.

Flight Analytics plots MAVLink values over time, either live from the flight controller or from a recorded `.tlog` file. Use it to check vibration, battery sag, altitude hold or signal values without copying logs to a PC. Open **Flight Map → Flight Analytics**.

![Flight Analytics tab with No Log File Loaded, the Open Log File button, the Live switch and the Parameters panel](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/flight-map--flight-analytics.webp)

*Flight Analytics before a log is loaded. Open Log File loads a .tlog.*

## Plot live telemetry

1. Select **Live**. The parameter list fills as messages arrive. If it stays on *Waiting for MAVLink Data*, connect the flight controller first.
2. Search **Parameters** and tick the values to plot. You can plot up to **10** at once.
3. Turn on **Accumulate Data** to keep every point (*Storing all data points*). Off, the chart keeps a rolling window (*Last … points*).

## Analyze a recorded log

1. Select **Open Log File**.
2. In **Select Log File**, pick a recorded `.tlog`. Telemetry logs come from [Recordings](https://docs.uavmatrix.com/uavcast-pro/camera/recordings/) (by default one per armed flight).
3. Tick parameters to plot. **Duration** and the number of **Parameters** in the file are shown at the top.

**Clear All** removes every plotted parameter.

## Where the logs come from

Telemetry is logged on the drone according to **Record telemetry** on **Camera → Recordings → Settings**: **While armed** (default), **Always while connected** or **Off**. The same `.tlog` files open in Mission Planner, MAVExplorer and UAV Log Viewer.

The Flight Map's **Recordings** side tab lists the same telemetry logs with **Messages**, **Max Alt** and **Distance**, and lets you **Download .tlog**, **Delete** or **Play** a log. Playback streams the recorded telemetry to the map as if the drone were flying.

Source: https://docs.uavmatrix.com/uavcast-pro/flight-map/flight-analytics/
