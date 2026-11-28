# Fleet

> The Fleet page lists every UAV in your organization with live status, battery and last check-in, and is where you pair drones and open controls.

**Fleet** (sidebar **Fleet Management → Fleet**) lists every UAV in the selected organization. It updates live, so you can leave it open on a wall screen next to the [map](https://docs.uavmatrix.com/fleet-manager/map/).

![Fleet page with a grid of UAV cards showing online and offline status, battery and last seen](https://docs.uavmatrix.com/img/screenshots/fleet-manager/fleet.webp)

*Fleet page with UAVs (46): ONLINE cards with battery levels, and dimmed OFFLINE cards with Last seen times.*

## UAV cards

The header shows **UAVs (n)**. Each card shows:

- **Name** and a status badge: **ONLINE**, **OFFLINE** or **PAIRING**.
- **Battery** in percent. It turns yellow below 50 % and red below 20 %.
- **Last seen**, as relative time. Offline cards are dimmed.
- **Re-pair required**, when the drone must be paired once more (see [Re-pair a drone](https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)).

A drone counts as offline after **20 seconds** without a message from UAVcast-Pro, which sends a heartbeat every 5 seconds.

Two buttons on each card:

- **Operations** opens the [control panel](https://docs.uavmatrix.com/fleet-manager/fleet/remote-control/): flight modes, arm and disarm, missions.
- **Details** opens the [UAV page](https://docs.uavmatrix.com/fleet-manager/fleet/uav-details/): live telemetry, terminal, logs, system actions, rename and remove.

## Buttons on the page

- **Pair Device** starts the [pairing wizard](https://docs.uavmatrix.com/fleet-manager/pair-uav/). Owners and Admins only.
- **Refresh** reloads the list.
- **Need more devices?** → **View Plans** opens the UAVmatrix store, where you buy more UAVcast-Pro licenses. See [Licenses](https://docs.uavmatrix.com/fleet-manager/licenses/).

## Re-pair banner

When one or more drones use an older connection certificate, a banner at the top says **n UAV(s) must be re-paired**. Re-pair each listed drone once; it keeps its name and history. See [Re-pair a drone](https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone).

![Fleet page with a re-pair banner and Re-pair required badges on two cards](https://docs.uavmatrix.com/img/screenshots/fleet-manager/fleet--repair-required.webp)

*Fleet page with the banner 2 UAVs must be re-paired and the Re-pair required badge on the two affected cards.*

## Tips for large fleets

- **Name drones for the map.** Names appear on map labels and in binding lists. A tail number or role ("Inspection-07") beats the default hostname. Rename from the UAV page.
- **Give each drone its own color.** Fleet Manager assigns colors from a 24-color palette automatically. Set a fixed color in the control panel (**Change map color**) for drones your team should recognize at a glance.
- **Use organizations to separate customers.** Drones belong to exactly one organization. If you operate for several customers who should each see only their drones, give each one an organization.

Source: https://docs.uavmatrix.com/fleet-manager/fleet/
