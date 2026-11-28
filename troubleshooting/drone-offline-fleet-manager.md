# Drone shows Offline in Fleet Manager

> Paired UAV shows Offline or Re-pair required in Fleet Manager? Check the drone's internet, outbound port 8883, UAVcast-Pro Fleet Management and the license.

The UAV is paired, but Fleet Manager shows it as **Offline** (grey on the fleet map), its telemetry is frozen, or it carries a **Re-pair required** badge.

Fleet Manager marks a UAV offline when it has heard nothing from it for 20 seconds. The drone talks to Fleet Manager over an encrypted MQTT connection, on its own internet connection.

| What you see | Likely cause | Start at |
| --- | --- | --- |
| Offline, and UAVcast-Pro Fleet Management says Disconnected | The drone has no internet, or port 8883 is blocked | [Check 1](https://docs.uavmatrix.com/troubleshooting/drone-offline-fleet-manager/#check-1) |
| Re-pair required badge, or This UAV must be re-paired | The drone has an old certificate | [Check 2](https://docs.uavmatrix.com/troubleshooting/drone-offline-fleet-manager/#check-2) |
| Offline right after you reinstalled or reset UAVcast-Pro | The pairing was removed on the drone | [Check 3](https://docs.uavmatrix.com/troubleshooting/drone-offline-fleet-manager/#check-3) |
| Online, but no position or battery | Flight controller not connected to UAVcast-Pro | [Check 4](https://docs.uavmatrix.com/troubleshooting/drone-offline-fleet-manager/#check-4) |

## Check 1: The drone's connection to Fleet Manager

1. Open UAVcast-Pro on the drone and go to **Fleet Management**. **Fleet Connection** shows **Connected** or **Disconnected**, and **Last Connected**.
2. If it is **Disconnected**, check that the drone has internet: the dashboard's **Cellular** row, or `curl -I https://fleet-manager.uavmatrix.com` on the device. Fix the link first with [Modem connected, no internet](https://docs.uavmatrix.com/troubleshooting/modem-no-internet/).
3. The drone must be able to open an **outbound TCP connection on port 8883** (MQTT over TLS). Some company networks, public Wi-Fi and a few IoT SIM plans only allow web ports. Try another network or ask the provider to open 8883.
4. Check the date and time on the device with `date`. The connection uses certificates, which fail on a device with a wrong clock.
5. Make sure the license on the drone is still active (**Application → License Manager**).

## Check 2: Re-pair required

Fleet Manager changed how drones connect, and UAVs paired before that change must be paired once more. Nothing is lost: the UAV keeps its name and history, and you don't need to remove it in Fleet Manager.

1. In UAVcast-Pro on the drone, open **Fleet Management** and press **Disconnect from Fleet**, then confirm.
2. Press **Connect to Fleet Manager**. An 8-digit **Pairing Code** appears with a countdown.
3. In Fleet Manager, go to **Fleet → Pair Device**, choose the organization and enter the code.

## Check 3: The drone lost its pairing

A reinstall with a database reset, **Reset Database** or **Disconnect from Fleet** removes the pairing on the drone, so it stops reporting. Pair it again as in check 2. Pairing into the same organization reuses the existing UAV entry.

## Check 4: Online, but no telemetry

Position, battery and flight mode come from the flight controller. If the UAV is online but those fields are empty, UAVcast-Pro can't hear the flight controller: see [No MAVLink heartbeat](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/).

## Still offline?

[Download the logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/) from the drone with **All Logs** selected and send them to **[support@uavmatrix.com](mailto:support@uavmatrix.com)** with the UAV name and organization. More Fleet Manager problems are covered in [Fleet Manager troubleshooting](https://docs.uavmatrix.com/fleet-manager/troubleshooting/).

Related: [Fleet Manager pairing in UAVcast-Pro](https://docs.uavmatrix.com/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/troubleshooting/drone-offline-fleet-manager/
