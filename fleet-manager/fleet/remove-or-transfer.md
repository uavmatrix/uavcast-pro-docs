# Re-pair, remove or transfer a drone

> Re-pair a drone when Fleet Manager asks, remove it from your organization, move it to another one or replace its companion computer.

A drone belongs to one organization at a time. This page covers the three things you do to an existing drone: pair it again, remove it, and move it somewhere else.

## Re-pair a drone

Re-pairing renews the drone's connection certificate. The drone keeps its record in Fleet Manager: name, telemetry history, saved flights and stream bindings stay as they are.

You need it when:

- Fleet Manager shows **Re-pair required** on the drone, or the banner **This UAV must be re-paired** on its page. Fleet Manager has moved to a newer, stricter certificate and this drone still has an old one.
- Someone selected **Disconnect from Fleet** in UAVcast-Pro.

![UAV page with the banner This UAV must be re-paired](https://docs.uavmatrix.com/img/screenshots/fleet-manager/drone-detail--repair-required.webp)

*UAV page with the This UAV must be re-paired banner explaining the Disconnect and Connect to Fleet Manager steps.*

1. In the drone's UAVcast-Pro interface, open **Fleet Management** and select **Disconnect from Fleet**. Confirm **Disconnect from Fleet?** If the page already shows **Connect to Fleet Manager**, skip this.
2. Select **Connect to Fleet Manager** to get a new 8-digit code.
3. In Fleet Manager, go to **Fleet → Pair Device**, choose the **same organization** and enter the code. Follow the wizard as in [Add your first drone](https://docs.uavmatrix.com/fleet-manager/pair-uav/).

Don't remove the drone in Fleet Manager first. Removing it deletes its history; re-pairing keeps it.

## Remove a drone

Use this when a drone is retired, sold or moving to another organization. Owners and Admins only.

1. Open the drone's [UAV page](https://docs.uavmatrix.com/fleet-manager/fleet/uav-details/) and select **Remove**.
2. Confirm **Delete UAV**.

If the drone is online, Fleet Manager first tells UAVcast-Pro to unpair and waits up to 5 seconds for an answer. UAVcast-Pro then shows **Connect to Fleet Manager** again and leaves the organization's VPN.

If the drone is offline or doesn't answer, **UAVcast Not Responding** asks whether to continue. **Delete Anyway** removes it from Fleet Manager only. Then, next time you can reach the drone, select **Disconnect from Fleet** in UAVcast-Pro yourself. Until then it still thinks it is paired.

![Delete UAV confirmation dialog warning that telemetry and command history will be removed](https://docs.uavmatrix.com/img/screenshots/fleet-manager/drone-detail--delete.webp)

*Delete UAV dialog for a retired airframe, warning that all telemetry data and command history will be permanently removed.*

### What removing deletes

| Deleted | Kept |
| --- | --- |
| The drone record and its name | Entries in **Recent Activity** |
| All stored telemetry and flight history, including saved flights | Saved missions (they belong to the organization) |
| Command history and stream bindings | The UAVcast-Pro license, which stays activated on the drone |
| The drone's VPN device |  |

> **This can't be undone**
>
> There is no export of flight history before you remove a drone. If you need the data, replay or record what you need from [Flight history](https://docs.uavmatrix.com/fleet-manager/map/flight-history/) first.

## Move a drone to another organization

Fleet Manager has no "transfer" button for a single drone, because history stays with the organization that recorded it. To move a drone:

1. In the current organization, [remove the drone](https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/#remove-a-drone). Its history there is deleted.
2. Make sure the drone's UAVcast-Pro license is owned by a member of the new organization. See [Licenses](https://docs.uavmatrix.com/fleet-manager/licenses/).
3. In the new organization, [pair the drone](https://docs.uavmatrix.com/fleet-manager/pair-uav/).

If you try to pair a drone that still belongs to another organization, Fleet Manager stops with **This UAV is already paired to an organization**. Only an Owner or Admin of that organization can release it.

To hand over a **whole fleet** with its history (for example when a company is sold), keep the organization and [transfer ownership](https://docs.uavmatrix.com/fleet-manager/team/#transfer-ownership) to the new owner instead.

## Replace the companion computer

Fleet Manager identifies a drone by a device ID that UAVcast-Pro computes from the companion computer's CPU serial number and its boot disk (SD card or SSD). A new companion computer, or a new SD card or SSD in the same one, shows up as a **new** drone. Reinstalling UAVcast-Pro on the same board and disk keeps the same device ID.

1. Remove the old drone in Fleet Manager (or keep it until you no longer need its history).
2. Install UAVcast-Pro on the new computer and activate the license. See [Activate your license](https://docs.uavmatrix.com/get-started/license-activation/).
3. Pair it as a new drone and recreate its stream bindings.

Source: https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/
