# Roles and permissions

> The exact permission matrix for Fleet Manager's Owner, Admin and Viewer roles: pairing, flight commands, terminal, missions, VPN and team.

Fleet Manager has three roles, set per organization. A person can be an Admin in one organization and a Viewer in another.

| Role | In short |
| --- | --- |
| **Owner** | Everything an Admin can do, plus deleting the organization and transferring ownership. Exactly one per organization: the person who created it, or whoever ownership was transferred to. |
| **Admin** | Runs the fleet: pairs and removes drones, sends commands, opens the terminal, plans and uploads missions, manages the VPN and stream bindings, and manages the team. |
| **Viewer** | Read-only. Sees the dashboard, fleet, live map, flight history, missions, network and team, but can't change or command anything. |

New members are invited as Admin or Viewer. The Owner role only changes hands through [Transfer Ownership](https://docs.uavmatrix.com/fleet-manager/team/#transfer-ownership).

## Permission matrix

The matrix comes from the permission rules Fleet Manager enforces on the server, so a hidden button is never the only thing standing in the way.

| Action | Owner | Admin | Viewer |
| --- | --- | --- | --- |
| **Fleet and drones** |  |  |  |
| See dashboard, fleet list, UAV pages and live map | ✓ | ✓ | ✓ |
| Watch flight history playback | ✓ | ✓ | ✓ |
| Save, rename and delete named flights | ✓ | ✓ | – |
| Pair a drone (**Pair Device**) | ✓ | ✓ | – |
| Rename a drone, change its map color | ✓ | ✓ | – |
| Remove a drone | ✓ | ✓ | – |
| **Commands** |  |  |  |
| Change flight mode, RTL, Loiter, Circle | ✓ | ✓ | – |
| Arm, disarm, force arm | ✓ | ✓ | – |
| Preflight calibration | ✓ | ✓ | – |
| Start, stop and read missions on a drone | ✓ | ✓ | – |
| Reboot or shut down the companion computer | ✓ | ✓ | – |
| SSH **Terminal** on the UAV page | ✓ | ✓ | – |
| **Open via Proxy** (UAVcast-Pro web interface through Fleet Manager) | ✓ | ✓ | – |
| **Missions** |  |  |  |
| View saved missions | ✓ | ✓ | ✓ |
| Create, edit and delete missions | ✓ | ✓ | – |
| **Upload to Drone** | ✓ | ✓ | – |
| **Network and VPN** |  |  |  |
| See the Network page, devices and stream bindings | ✓ | ✓ | ✓ |
| See the VPN auth key and the **GCS Connection Command** | ✓ | ✓ | – |
| Enable VPN, generate auth keys, **Push to Drone** | ✓ | ✓ | – |
| Rename, change type of, or remove VPN devices | ✓ | ✓ | – |
| Add, pause or remove stream bindings | ✓ | ✓ | – |
| Delete the VPN network | ✓ | ✓ | – |
| **Team** |  |  |  |
| See members and roles | ✓ | ✓ | ✓ |
| Invite members (as Admin or Viewer) | ✓ | ✓ | – |
| Change a member's role (except the Owner's) | ✓ | ✓ | – |
| Remove members (except the Owner), revoke invitations | ✓ | ✓ | – |
| Transfer ownership | ✓ | – | – |
| **Organization and settings** |  |  |  |
| Rename the organization, edit its description | ✓ | ✓ | – |
| Change telemetry retention, prune or delete history | ✓ | ✓ | – |
| Delete the organization | ✓ | – | – |
| **Everyone** |  |  |  |
| Use FleetBot, create and close own support tickets | ✓ | ✓ | ✓ |
| Edit own profile (in the UAVmatrix account) | ✓ | ✓ | ✓ |

> **Admins can manage other Admins**
>
> An Admin can invite new Admins, demote another Admin to Viewer and remove other Admins. Give the Admin role only to people you'd trust with the whole fleet. The Owner is the only member an Admin can't change.

> **What Viewers see**
>
> Viewers get the same pages, without the controls. The UAV control panel shows a Viewer the live status and logs, but no flight mode, mission or arm buttons and no Terminal tab. On **Network**, Viewers don't see the VPN auth key: *Only Owners and Admins can see the VPN auth key.* Fleet Manager also checks every command on the server, so a Viewer can't send one by other means.

## Choosing roles for a business fleet

| Person | Suggested role |
| --- | --- |
| Fleet or operations manager | Owner (one person) |
| Pilots, technicians, the person who pairs new airframes | Admin |
| Customers following their job live, management, auditors | Viewer |
| Contractors who need to fly your drones | Admin, removed when the job ends |

## Not a role: super admin

UAVmatrix staff have a separate support role across all organizations. It is used for support tasks such as [adding extra license emails](https://docs.uavmatrix.com/fleet-manager/licenses/#licenses-bought-with-another-email) to an account. It isn't part of your organization and can't be assigned.

Source: https://docs.uavmatrix.com/fleet-manager/team/roles-and-permissions/
