# Pairing code invalid or expired

> Fix Invalid pairing code, This pairing code has expired and License is not owned by any member of this organization when pairing a UAV with Fleet Manager.

You entered the code from UAVcast-Pro in Fleet Manager's **Pair Device** wizard, and it was refused.

Pairing works in this direction: **UAVcast-Pro shows the code, you type it into Fleet Manager**. The code has 8 digits and is valid for 5 minutes.

![Fleet Manager Pair UAV wizard with the error toast This pairing code has expired](https://docs.uavmatrix.com/img/screenshots/fleet-manager/pair-device--code-expired.webp)

*Fleet Manager refusing a code: the error appears as a toast on the Pairing Code step, here This pairing code has expired.*

| Error in Fleet Manager | Cause | Fix |
| --- | --- | --- |
| **Pairing code must be 8 digits** / **Please enter a valid 8-digit code** | Too few digits, or letters | [Check 1](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/#check-1) |
| **Invalid pairing code** | A typo, or a code that never existed | [Check 1](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/#check-1) |
| **This pairing code has expired** | More than 5 minutes passed | [Check 2](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/#check-2) |
| **This pairing code has already been used** | The code was used once | [Check 2](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/#check-2) |
| **License is not owned by any member of this organization** | The drone's license belongs to an account outside the org | [Check 3](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/#check-3) |
| **Invalid license key** / **License has expired** / **License has been refunded** | The drone's license is not valid in the store | [Check 4](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/#check-4) |
| **This UAV is already paired to an organization** | Paired to another organization | [Check 5](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/#check-5) |
| **Too many attempts. Please wait a minute and try again.** | Rate limit after repeated tries | Wait one minute |

## Check 1: Type the current code

1. In UAVcast-Pro, go to **Fleet Management** and press **Connect to Fleet Manager**.
2. Copy the 8 digits shown under **Pairing Code**.
3. In Fleet Manager, go to **Fleet → Pair Device**, choose the organization and enter the code under **Enter Pairing Code**.

## Check 2: Get a fresh code

A code is valid for 5 minutes and works once. When **Expires in** reaches zero, press **Connect to Fleet Manager** again in UAVcast-Pro for a new code. If UAVcast-Pro can't get a code at all, it shows *Unable to connect to Fleet Manager. Please check your internet connection.*: fix the drone's internet first.

## Check 3: License owned by someone outside the organization

Fleet Manager only accepts a drone whose UAVcast-Pro license was bought by a member of the organization you pair into. The match is made on the e-mail address of the store account that owns the license.

Fix it one of these ways:

- Invite the account that bought the license to the organization (**Team**), then pair again.
- Pair into an organization where the license owner is a member.
- If the license was bought with another e-mail address of yours, ask **[support@uavmatrix.com](mailto:support@uavmatrix.com)** to add that address as a license e-mail on your Fleet Manager user.

See [Licenses in Fleet Manager](https://docs.uavmatrix.com/fleet-manager/licenses/).

## Check 4: License not valid

Open **Application → License Manager** on the drone and check **License Status**. An expired or refunded license must be renewed on [uavmatrix.com](https://uavmatrix.com/). If UAVcast-Pro itself has no active license, it can't request a code (*No valid license found. Please activate your license first.*): see [License won't activate](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/).

## Check 5: Already paired elsewhere

A UAV belongs to one organization. To move it, remove it from the old organization first. Re-pairing into the same organization is allowed and keeps the UAV's history. See [Remove or transfer a UAV](https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/).

## Still refused?

Send the exact error text, the UAV hostname and the organization name to **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Related: [Fleet Manager pairing in UAVcast-Pro](https://docs.uavmatrix.com/uavcast-pro/fleet-pairing/) · [Pair your first UAV](https://docs.uavmatrix.com/fleet-manager/pair-uav/)

Source: https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/
