# No telemetry in QGroundControl or Mission Planner

> Flight controller connected in UAVcast-Pro but QGroundControl or Mission Planner keeps waiting? Check Enable Telemetry, the IP, UDP 14550 and VPN.

UAVcast-Pro shows the flight controller as **Connected**, but QGroundControl says *Waiting for vehicle connection* or Mission Planner times out with *No heartbeat packets received*. The drone hears the flight controller; the telemetry just doesn't reach your ground station.

If UAVcast-Pro itself shows **No heartbeat**, fix that first: [No MAVLink heartbeat](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/).

| What you see | Likely cause | Start at |
| --- | --- | --- |
| Dashboard: Ground station None set up, or Not sending | No destination, or Enable Telemetry is off | [Check 1](https://docs.uavmatrix.com/troubleshooting/no-telemetry-in-gcs/#check-1) |
| Dashboard says Sending, the GCS sees nothing | Wrong IP, firewall, or the GCS listens on another port | [Check 2](https://docs.uavmatrix.com/troubleshooting/no-telemetry-in-gcs/#check-2) |
| Worked on Wi-Fi, nothing over 4G | Destination is a local IP instead of the VPN IP | [Check 3](https://docs.uavmatrix.com/troubleshooting/no-telemetry-in-gcs/#check-3) |
| Used to connect over TCP 5760, stopped after an update | TCP 5760 was closed in v6.5.0 | [Check 4](https://docs.uavmatrix.com/troubleshooting/no-telemetry-in-gcs/#check-4) |
| Telemetry shows, but commands and mode changes do nothing | Read Only is on for this destination | [Check 5](https://docs.uavmatrix.com/troubleshooting/no-telemetry-in-gcs/#check-5) |

## Check 1: Is telemetry being sent?

1. Open **Dashboard** and read the **Ground station** row in the status card.

   - **None set up**: there is no destination. Add one in step 2.
   - **Not sending**: a destination exists but nothing goes out.
   - **Sending to … · n packets/s**: telemetry leaves the drone. Go to check 2.

2. Go to **Ground Control Stations**. Press **Add Destination** if the list is empty.

3. On the card for your computer, switch on **Enable Endpoint** and **Enable Telemetry**. Both video and telemetry are off on a new destination.

4. Enter the computer's IPv4 address in **Destination IP or Host** and keep **Telemetry Port** at `14550`.

![Telemetry section of a destination with Enable Telemetry on and Read Only off](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/ground-control--telemetry-enabled.webp)

*Ground Control Stations: a destination with Enable Telemetry on.*

> **Invalid addresses are skipped**
>
> UAVcast-Pro only accepts IPv4 addresses such as `192.168.1.10`. If you try to save a hostname, you get *Enter a valid IPv4 address, for example 192.168.1.10.* An address that is missing or invalid is left out of the telemetry router, and the **Connection check** on the Flight Controller page lists it.

## Check 2: Make sure the ground station listens

UAVcast-Pro sends MAVLink over UDP to the address and port you set. The ground station must listen on that port.

- **QGroundControl** listens on UDP 14550 by default. If you changed **Telemetry Port**, add a UDP comm link on the same port in **Application Settings → Comm Links**.
- **Mission Planner**: choose **UDP** in the connection drop-down at the top right, press **Connect** and accept port `14550`.
- Only one program can listen on a port. Close MAVProxy, a second QGroundControl or another tool that may hold 14550.
- Allow incoming UDP 14550 in the firewall. The commands are in [No video, check 3](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/#check-3).

## Check 3: Use the VPN address over cellular

Over 4G the drone can't reach a local address like `192.168.1.20`. Put your computer's VPN address (Fleet Manager VPN, Tailscale or ZeroTier) in **Destination IP or Host**.

From the computer, ping the drone's VPN address. If the ping fails, the VPN is the problem: see [VPN connected but can't reach the drone](https://docs.uavmatrix.com/troubleshooting/vpn-cant-reach-drone/).

## Check 4: TCP 5760 no longer works

Since v6.5.0 the telemetry router does not accept TCP connections on port 5760, so only the ground stations you add, and switch on, get data. If you used to connect Mission Planner over TCP 5760, add your computer as a destination and connect over UDP instead.

## Check 5: Commands are ignored

If telemetry shows but arming, mode changes or mission uploads do nothing, check **Read Only** on that destination. Read Only blocks everything that would change the vehicle (commands, mode changes, parameter and mission writes), so the ground station can only watch. This applies from UAVcast-Pro 6.5.3; on earlier versions, Read Only does not block parameter writes. Some ground stations show warnings in this mode because some of their requests go unanswered.

## Still nothing?

[Download the logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/) with **Mavlink Manager** selected and send them to **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. Mention which ground station you use and its IP address.

Related: [Ground Control Stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/) · [Ports and protocols](https://docs.uavmatrix.com/reference/ports-and-protocols/)

Source: https://docs.uavmatrix.com/troubleshooting/no-telemetry-in-gcs/
