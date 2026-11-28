# Invite your team

> Invite pilots, operators and customers to your Fleet Manager organization by email, change roles, revoke invitations and transfer ownership.

Each person signs in with their own UAVmatrix account and gets a role in your organization: **Admin** or **Viewer** (there is exactly one **Owner**). Fleet Manager doesn't limit the number of members, and members don't use up licenses. See [Roles and permissions](https://docs.uavmatrix.com/fleet-manager/team/roles-and-permissions/) for exactly what each role can do.

All of this happens on **Team** (page title **Team Management**). Owners and Admins can manage members. Viewers see the member list only.

![Team Management page listing an organization's members with roles and pending invitations](https://docs.uavmatrix.com/img/screenshots/fleet-manager/team.webp)

*Team Management for an operator with 13 members: one Owner, four Admins and eight Viewers.*

## Invite a member

1. On **Team**, select **Invite Member**.
2. In **Invite Team Member**, enter the person's **Email Address**, choose the **Organization** (if you manage more than one) and the **Role**: **Admin** or **Viewer**.
3. Select **Send Invitation**.

![Invite Team Member dialog with email, organization and role fields](https://docs.uavmatrix.com/img/screenshots/fleet-manager/team--invite.webp)

*Invite Team Member dialog with Role set to Viewer for a customer contact.*

Fleet Manager emails an invitation link. The invitation is listed under **Pending Invitations** until it is accepted, and it expires after **7 days**. You can't send a second invitation to an email that already has a pending one: revoke the old one first.

> **Invite with the email they bought licenses with**
>
> If this person owns UAVcast-Pro licenses for drones you want to pair, invite the same email they used in the UAVmatrix store. Fleet Manager matches license owners to members by email. See [Licenses](https://docs.uavmatrix.com/fleet-manager/licenses/).

## Accept an invitation

The invited person opens the link from the email. The invitation page shows the organization, **Invitation sent to**, and **Your role** with a short description of it.

- Signed in already: select **Accept Invitation**.
- Not signed in: select **Sign In** under **Sign in to accept this invitation**. New users select **Create Account**, which opens the UAVmatrix sign-up with the email filled in, and come back to the invitation afterwards.

![Invitation page with organization name, invited email, role description and Accept Invitation button](https://docs.uavmatrix.com/img/screenshots/fleet-manager/invite.webp)

*Invitation page as the invitee sees it: Your role Viewer, View-only access to drones and fleet data, and Accept Invitation.*

If the page says **Invitation Expired**, **Invitation Already Used** or **Already a Member**, ask an Owner or Admin for a new invitation, or just sign in.

## Change a member's role

Open the menu next to a member and select **Change Role → Admin** or **Viewer**. The change takes effect right away; they may need to reload the page to see it. Admins can change the role of other Admins. Nobody can change the Owner's role: [transfer ownership](https://docs.uavmatrix.com/fleet-manager/team/#transfer-ownership) instead.

![Member actions menu with Change Role, Transfer Ownership and Remove Member](https://docs.uavmatrix.com/img/screenshots/fleet-manager/team--member-menu.webp)

*Member menu opened by the Owner, showing Change Role, Transfer Ownership and Remove Member.*

## Remove a member or revoke an invitation

- **Remove a member:** open the member's menu and select **Remove Member**. They lose access right away. The Owner can't be removed.
- **Revoke an invitation:** under **Pending Invitations**, select **Revoke**. The link stops working.

> **No confirmation step**
>
> **Remove Member** and **Transfer Ownership** act as soon as you select them. Check the name before you click.

Removing a member doesn't touch the drones. But if that person owns the licenses of drones you want to pair later, pairing those drones will fail until they are a member again.

## Transfer ownership

Only the Owner can do this. Open the menu of the member who should take over and select **Transfer Ownership**. That member becomes the **Owner**, and you become an **Admin**.

Use this when the person who set up the organization leaves, or before you delete your UAVmatrix account: Fleet Manager won't delete an account that still owns an organization.

## Working with customers and partners

A user can be a member of any number of organizations, with a different role in each. Typical setups:

- **Service provider:** your staff are Admins in your organization. Each customer gets a Viewer role so they can follow their flights live on the map.
- **Subcontractor:** a partner invites your pilot as Admin in their organization. Your pilot switches between both with the organization switcher.

Source: https://docs.uavmatrix.com/fleet-manager/team/
