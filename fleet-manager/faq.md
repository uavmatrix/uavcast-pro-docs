# Fleet Manager FAQ

> Answers to common Fleet Manager questions: drone limits, licenses, VPN, ground stations, ArduPilot and PX4, data retention and moving drones.

### What do I need to use Fleet Manager?

A UAVmatrix account, and drones running UAVcast-Pro with an activated license. Each drone's license must be owned by a member of your organization. See [Licenses and seats](https://docs.uavmatrix.com/fleet-manager/licenses/).

### Does Fleet Manager cost extra?

No. Fleet Manager is included with your UAVcast-Pro license. There is no separate subscription, and team members are free.

### How many drones can I manage?

Fleet Manager itself sets no limit. Each drone needs its own UAVcast-Pro license activation, so the number of drones follows the licenses and device slots you own.

### Do team members need a license?

No. Invite as many Admins and Viewers as you need. See [Invite your team](https://docs.uavmatrix.com/fleet-manager/team/).

### Which roles are there?

**Owner**, **Admin** and **Viewer**. There is no "Member" role. See [Roles and permissions](https://docs.uavmatrix.com/fleet-manager/team/roles-and-permissions/).

### Where does the pairing code come from?

From the drone. In UAVcast-Pro, open **Fleet Management → Connect to Fleet Manager**. It shows an 8-digit code that is valid for 5 minutes. You type it into Fleet Manager under **Fleet → Pair Device**. See [Add your first drone](https://docs.uavmatrix.com/fleet-manager/pair-uav/).

### Does Fleet Manager work over 4G/LTE?

Yes. The drone connects outward to Fleet Manager on TCP 8883, so it works behind carrier NAT without a public IP. The carrier must not block port 8883.

### Do I need the VPN?

Only to send video and telemetry from drones to ground stations through Fleet Manager. The map, telemetry, commands, missions, terminal and remote access to UAVcast-Pro all work without it. See [Network and VPN](https://docs.uavmatrix.com/fleet-manager/network/).

### Can one ground station receive several drones?

Yes. Each [stream binding](https://docs.uavmatrix.com/fleet-manager/network/stream-bindings/) gets its own block of ports on that ground station, with room for a second camera and audio. The first drone uses 5600 / 14550.

### Can I keep using my own ZeroTier or Tailscale network?

Yes, if you don't need Fleet Manager's stream bindings. You can decline VPN when pairing. If you accept, a drone already on a Tailscale network is moved to your organization's network. A drone on ZeroTier keeps its ZeroTier network and joins the organization's network alongside it; ZeroTier is only left when you unpair the drone.

### Does it work with ArduPilot and PX4?

Fleet Manager works with any MAVLink flight controller that UAVcast-Pro talks to, ArduPilot or PX4: live map, telemetry, status, the terminal and stream bindings are the same. The flight-mode controls use ArduPilot's modes for Copter, Plane, Rover and Sub, and the mission command list follows ArduPilot naming, so on PX4 change modes and plan missions from your ground station.

### Can I fly a drone from Fleet Manager alone?

Fleet Manager can change modes, arm, and start, pause and stop missions. It is not built for manual stick control. Always keep a pilot with a ground station or RC transmitter in control, and follow your local regulations.

### How long is flight history kept?

Up to 1 year by default. Owners and Admins can shorten it to 7, 14, 30, 60 or 90 days or 6 months. See [Flight history](https://docs.uavmatrix.com/fleet-manager/map/flight-history/#how-long-history-is-kept).

### Can I export flight logs?

Not today. Fleet Manager replays flights on the map but doesn't export files or store `.tlog`, DataFlash or video.

### Does Fleet Manager send alerts by email?

Not yet. Status is shown live on the map, fleet list and UAV pages. See [Status indicators and notifications](https://docs.uavmatrix.com/fleet-manager/alerts-and-status/).

### What happens when a drone loses its connection?

After 20 seconds without data it is shown as **OFFLINE**, and it reconnects by itself when its link comes back. The flight controller's own failsafes decide what the aircraft does; Fleet Manager doesn't command anything on connection loss.

### How do I move a drone to another organization?

Remove it from the current organization (this deletes its history there), then pair it into the new one. See [Remove or transfer a drone](https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/).

### I bought licenses with a different email. What now?

Invite that email to the organization, or ask support to add it as an extra license email on your account. See [Licenses bought with another email](https://docs.uavmatrix.com/fleet-manager/licenses/#licenses-bought-with-another-email).

### Is there a mobile app?

There is a phone-friendly [Lite view](https://docs.uavmatrix.com/fleet-manager/lite-view/) in the browser.

### Is my data safe?

Each drone has its own TLS client certificate, every organization has its own encrypted VPN, and roles are enforced on the server. See [Security and privacy](https://docs.uavmatrix.com/fleet-manager/security/).

Source: https://docs.uavmatrix.com/fleet-manager/faq/
