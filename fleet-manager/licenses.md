# Licenses and seats

> How UAVcast-Pro licenses and device slots decide which drones you can pair in Fleet Manager, and how to use licenses bought with another email.

Fleet Manager is included with your UAVcast-Pro license. It doesn't have its own subscription, seats or plans. What you can pair is decided by your UAVcast-Pro licenses from the [UAVmatrix store](https://uavmatrix.com/):

- **Drones:** every paired drone runs UAVcast-Pro with an activated license. Each activation uses one of the license's **Device Slots** in the store ("2 of 5 device slots used"). Need more drones? Buy more licenses or slots. **Fleet → Need more devices? → View Plans** takes you to the store.
- **Team members:** free. Fleet Manager doesn't limit how many people you invite, and members don't need a license of their own.

> Fleet Manager is included with a UAVcast-Pro license. Each drone you pair needs one.
>
> [Buy UAVcast-Pro](https://uavmatrix.com/checkout) · [See plans and pricing](https://uavmatrix.com/products)

## What Fleet Manager checks when you pair

When you enter a pairing code, Fleet Manager looks up the license that is activated on that drone and checks that:

1. the license exists and is active, not expired and not refunded, and
2. its **owner's email** (the store account that bought it) belongs to a **member of the organization** you are pairing into, in any role.

If both are true, the drone is paired. Fleet Manager checks again whenever the drone is re-paired.

| Message in the pairing wizard | Meaning |
| --- | --- |
| **License is not owned by any member of this organization** | The license belongs to a store account whose email isn't a member here. |
| **License has expired** | The license's expiry date has passed. |
| **License has been refunded** | The license was returned. |
| **Invalid license key** | The store doesn't know the license on the drone. Check the activation in UAVcast-Pro. |

The license is also checked one step earlier, when UAVcast-Pro asks for a pairing code. If UAVcast-Pro shows **Invalid or inactive license** instead of a code, the license is expired, refunded or not linked to a store account.

For activation problems on the drone itself, see [Activate your license](https://docs.uavmatrix.com/get-started/license-activation/) and [License won't activate](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/).

## Who should own the licenses

Fleet Manager matches by email, so plan who buys:

- **Simplest:** the organization's Owner buys all licenses with the email they sign in to Fleet Manager with.
- **Several buyers:** any member's licenses count, Viewers included. A purchasing colleague can be a Viewer.
- **Customer-owned drones:** if a customer bought the licenses, invite the customer's store email to your organization (Viewer is enough).

## Licenses bought with another email

A common case: licenses were bought with `purchasing@company.com`, but the pilot signs in to Fleet Manager as `anna@company.com`. Pairing fails with **License is not owned by any member of this organization**.

You have two ways to fix it:

1. **Invite the buying email** to the organization. That account must sign in once to accept the invitation.
2. **Ask UAVmatrix support to add a license email** to your account. Support can add one or more extra emails to a Fleet Manager user. Licenses owned by any of those emails then count as that user's when pairing, in every organization the user belongs to.

To request it, open a ticket from the support bubble (category **General Inquiry**) or email [support@uavmatrix.com](mailto:support@uavmatrix.com) from the address you sign in with, and list the other email(s) the licenses were bought with. See [Support](https://docs.uavmatrix.com/fleet-manager/support/).

Good to know:

- Emails are matched without regard to upper or lower case.
- Each extra email can belong to one Fleet Manager user only.
- Only UAVmatrix support can add or remove these emails. They don't appear in your own settings.
- The licenses stay in the original store account. This only changes who Fleet Manager counts as the owner when you pair.

## Moving licenses between drones

A license is activated per device in UAVcast-Pro, not in Fleet Manager. To move one, free the device slot in UAVcast-Pro or the store, activate it on the new drone, then [pair the new drone](https://docs.uavmatrix.com/fleet-manager/pair-uav/). See [Replace the companion computer](https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/#replace-the-companion-computer).

Source: https://docs.uavmatrix.com/fleet-manager/licenses/
