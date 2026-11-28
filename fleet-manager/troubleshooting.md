# Fleet Manager troubleshooting

> Fix common Fleet Manager problems: pairing errors, drones stuck on PAIRING or offline, re-pair required, missing streams and failed commands.

Start from what you see. Each row links to the fix, either below or on the shared [troubleshooting](https://docs.uavmatrix.com/troubleshooting/) pages.

| What you see | Likely cause | Go to |
| --- | --- | --- |
| **Invalid pairing code**, **This pairing code has expired**, **This pairing code has already been used** | Typo, code older than 5 minutes, or claimed already | [Pairing code invalid or expired](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/) |
| **License is not owned by any member of this organization** | License bought with an email that isn't a member | [Licenses bought with another email](https://docs.uavmatrix.com/fleet-manager/licenses/#licenses-bought-with-another-email) |
| **This UAV is already paired to an organization** | The drone still belongs to another organization | [Move a drone](https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/#move-a-drone-to-another-organization) |
| UAVcast-Pro shows **No valid license found** or **Invalid or inactive license** | License not activated on the drone, expired or refunded | [License won't activate](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/) |
| No **Pair Device** button | You are a Viewer | [Roles and permissions](https://docs.uavmatrix.com/fleet-manager/team/roles-and-permissions/) |
| Drone stuck on **PAIRING** | The drone hasn't connected to the broker yet | [Stuck on PAIRING](https://docs.uavmatrix.com/fleet-manager/troubleshooting/#stuck-on-pairing) |
| Drone **OFFLINE** | No internet, port 8883 blocked, or UAVcast-Pro not running | [Drone offline in Fleet Manager](https://docs.uavmatrix.com/troubleshooting/drone-offline-fleet-manager/) |
| **Re-pair required** | Old connection certificate | [Re-pair a drone](https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone) |
| **NO MAVLINK** on the map | UAVcast-Pro has no data from the flight controller | [No MAVLink heartbeat](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/) |
| Binding fails: **Failed to send configuration to drone - it may be offline** | Drone offline or didn't confirm within 15 s | [Binding won't save](https://docs.uavmatrix.com/fleet-manager/troubleshooting/#binding-wont-save) |
| Binding exists, no telemetry or video in the ground station | Firewall, wrong port, or stream switched off | [No stream at the ground station](https://docs.uavmatrix.com/fleet-manager/troubleshooting/#no-stream-at-the-ground-station) |
| Ground station joined the VPN but can't reach the drone | Device type, drone not on VPN, or UDP blocked | [VPN connected but can't reach the drone](https://docs.uavmatrix.com/troubleshooting/vpn-cant-reach-drone/) |
| Commands don't work, **UAVcast Upgrade Required** | Drone offline, Viewer role, or old UAVcast-Pro | [Commands fail](https://docs.uavmatrix.com/fleet-manager/troubleshooting/#commands-fail) |
| **Request timed out. UAVcast may be unreachable.** when opening UAVcast-Pro remotely | Slow link through the proxy | [Proxy is slow or incomplete](https://docs.uavmatrix.com/fleet-manager/troubleshooting/#proxy-is-slow-or-incomplete) |
| Invitation email never arrived | Spam filter, or wrong address | [Invitation not received](https://docs.uavmatrix.com/fleet-manager/troubleshooting/#invitation-not-received) |

## Stuck on PAIRING

**PAIRING** means Fleet Manager has accepted the code and is waiting for the drone's first heartbeat over MQTT.

1. Look at UAVcast-Pro's **Fleet Management** page. If it still says **Waiting for Manager to confirm pairing...**, the drone hasn't fetched its certificate. Check that it has internet.

2. Check outbound TCP 8883 from the drone:

   ```bash
   nc -vz fleet-manager.uavmatrix.com 8883
   ```

3. If you entered an **older** code from the same drone (for example after selecting **Connect to Fleet Manager** twice), UAVcast-Pro isn't waiting for it. Select **Disconnect from Fleet** if shown, get a new code and pair again into the same organization. The drone keeps its record.

The drone has 15 minutes after the code's expiry to fetch its certificate. After that, pair again.

## Binding won't save

Fleet Manager only saves a binding after the drone confirms it. Check that the drone shows **ONLINE**, then try again. If the drone is online but bindings still fail, the drone may not be on the VPN: check **Network → Connected Devices** for it with type **UAV**, or use **Push to Drone**.

## No stream at the ground station

1. On **Network → Stream Bindings**, check that **Video** and **Telemetry** are switched on and note the **Ports**.
2. Check that the ground station software listens on exactly those ports. Only the first drone on a laptop uses 5600 / 14550; every further drone has its own ports.
3. Allow inbound UDP on those ports in the laptop's firewall. On Windows, allow QGroundControl or Mission Planner on **Private** and **Public** networks.
4. Run `tailscale status` on the laptop and check that the drone is listed.

More detail: [No telemetry in the ground station](https://docs.uavmatrix.com/troubleshooting/no-telemetry-in-gcs/) and [No video in the ground station](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/).

## Commands fail

- The drone must be **ONLINE**.
- Only Owners and Admins can send commands. Viewers don't get the command buttons, and the server rejects commands from them.
- Arm, disarm and preflight calibration need UAVcast-Pro 6.3.0_rc13 or later. [Update UAVcast-Pro](https://docs.uavmatrix.com/get-started/updating/).
- The flight controller can refuse a command, for example arming with failed pre-arm checks. Read its message in the map popup or the **Logs** tab.

## Proxy is slow or incomplete

**Open via Proxy** passes each page request over the drone's link, with 30 seconds per request, and doesn't carry live (WebSocket) features. On a weak cellular link, wait for the page to finish loading, or join the VPN and use **Open via VPN**. See [Open UAVcast-Pro remotely](https://docs.uavmatrix.com/fleet-manager/fleet/remote-uavcast/).

## Invitation not received

Ask the person to check spam. On **Team**, check the email under **Pending Invitations**. If it's wrong, **Revoke** it and invite again. Invitations expire after 7 days.

## Still stuck

Open a ticket from the support button with a screenshot, or email [support@uavmatrix.com](mailto:support@uavmatrix.com). Include the drone's name and device ID (on its UAV page). Email the UAVcast-Pro log bundle (a ZIP) to [support@uavmatrix.com](mailto:support@uavmatrix.com) with your ticket number, since tickets only take an image. See [Support](https://docs.uavmatrix.com/fleet-manager/support/) and [Collect logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/).

Source: https://docs.uavmatrix.com/fleet-manager/troubleshooting/
