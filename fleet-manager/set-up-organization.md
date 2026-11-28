# Set up your organization

> Sign in to Fleet Manager with your UAVmatrix account, create the organization your drones and team belong to, and switch, rename or delete it.

Everything in Fleet Manager belongs to an organization: drones, missions, the VPN network, stream bindings and team members. Create one before you pair your first drone.

## Sign in

Fleet Manager has no separate password. It signs you in with your UAVmatrix account, the same account you use at [uavmatrix.com](https://uavmatrix.com/) to buy and manage UAVcast-Pro licenses.

1. Go to [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) and select **Sign In** (or **Get Started**).
2. Sign in on the UAVmatrix page you are sent to. If you don't have an account yet, create one there.
3. You come back to the Fleet Manager **Dashboard**.

> **Sign in with the email that owns your licenses**
>
> Fleet Manager only accepts a drone when its UAVcast-Pro license is owned by a member of the organization, matched by email. Signing in with the account you bought the licenses with saves you a support request later. See [Licenses](https://docs.uavmatrix.com/fleet-manager/licenses/).

Profile details (name, email, password) are managed in your UAVmatrix account, not in Fleet Manager. **Settings → Profile** links there.

## Create the organization

1. Open the organization switcher at the top of the sidebar and select **Create organization**. If you have no organization yet, pages such as **Fleet** and **Network** also show **No Organization Yet** with a **Create Organization** button.
2. Enter an **Organization Name** (2 to 50 characters), for example your company name or "Survey Operations North". Add a **Description (optional)** if you like.
3. Select **Create**.

![Create Organization dialog with Organization Name and Description fields](https://docs.uavmatrix.com/img/screenshots/fleet-manager/onboarding--create-organization.webp)

*Create Organization dialog, filled in with a company name such as Nordic Aerial Survey AS.*

You become the organization's **Owner**. Fleet Manager also creates a private VPN network for the organization in the background. It stays off until you [enable VPN](https://docs.uavmatrix.com/fleet-manager/network/).

> **One organization per owner**
>
> Each user can create (own) one organization. If you try to create a second one, Fleet Manager answers **You already own an organization**. You can still be an Admin or Viewer in any number of other organizations, for example a customer's or a partner's.

## Switch between organizations

If you belong to more than one organization, the switcher at the top of the sidebar lists them under **Organizations**. The organization you pick decides what **Fleet**, **Fleet Map**, **Missions**, **Network** and the dashboard show. Fleet Manager remembers your choice in this browser.

![Sidebar organization switcher open, listing two organizations](https://docs.uavmatrix.com/img/screenshots/fleet-manager/dashboard--organization-switcher.webp)

*Organization switcher open, listing Nordwind Aerial Services and Nordwind R&D Sandbox.*

## Rename or delete the organization

Go to **Settings → Organizations**. The tab lists the organizations where you are Owner or Admin.

- **Rename or change the description:** Owner or Admin. Edit **Name** or **Description** and select **Save Changes**.
- **Delete:** Owner only. Select **Delete Organization** and confirm. This removes all drones, their telemetry history, missions, stream bindings and team memberships, and it can't be undone.

![Settings Organizations tab with name, description and Delete Organization button](https://docs.uavmatrix.com/img/screenshots/fleet-manager/settings--organizations.webp)

*Settings → Organizations for the Owner, with Save Changes and Delete Organization.*

> **Unpair drones before you delete an organization**
>
> Deleting the organization doesn't tell the drones. They keep trying to reconnect until you select **Disconnect from Fleet** in UAVcast-Pro on each one. Remove the drones first from their UAV page (see [Remove or transfer a drone](https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/)) so Fleet Manager unpairs them for you.

To hand the organization to someone else instead, [transfer ownership](https://docs.uavmatrix.com/fleet-manager/team/#transfer-ownership).

## Next steps

- [Add your first drone](https://docs.uavmatrix.com/fleet-manager/pair-uav/)
- [Invite your team](https://docs.uavmatrix.com/fleet-manager/team/)

Source: https://docs.uavmatrix.com/fleet-manager/set-up-organization/
