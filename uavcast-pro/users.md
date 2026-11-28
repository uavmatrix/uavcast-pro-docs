# Users & access

> Secure the UAVcast-Pro web interface with an admin login, add read-only users who can watch telemetry and video but not control the drone, and change or reset passwords.

A fresh UAVcast-Pro install has no users and no login: anyone who can open the web interface has full admin rights. Add an admin user to turn on the login. After that, you can add **Read Only** users for observers, customers or payload operators who should see everything but change nothing. Open **Management → Users**.

![Users page with the Add New User dialog open, with username, password, confirm password and role fields](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/users.webp)

*Management → Users with the Add New User dialog open.*

## Turn on the login

1. Go to **Users** and select **Add User**.
2. Enter a **Username** (at least 3 characters), a **Password** (at least 6 characters) and **Confirm Password**.
3. Select **Create User**. The first user is always an **Admin** (*First user must be an admin*).

From now on every visitor gets a login page. A login lasts 7 days on that browser, or until you select **Logout** in the user menu at the bottom of the sidebar.

> **The web interface uses plain HTTP**
>
> Logins and settings travel unencrypted. That's fine on your own LAN or inside a [VPN](https://docs.uavmatrix.com/uavcast-pro/connectivity/vpn/), but never forward the web interface's port to the internet.

## Roles

| Can… | **Admin** | **Read Only** |
| --- | --- | --- |
| See the Dashboard, Data Streams, Flight Controller, Flight Map, Ground Control Stations and Camera pages | Yes | Yes |
| Watch live video and telemetry, view dashboards and recordings | Yes | Yes |
| Change any setting | Yes | No |
| Arm, disarm, change mode, start or clear missions | Yes | No |
| Start or stop recordings | Yes | No |
| Open Modem, Virtual Private Network, Dynamic DNS, Networks, Fleet Management, Users and Application | Yes | No (hidden) |

You can't create a **Read Only** user before an admin exists (*Create an admin user first before adding read-only users*).

Read-only web users are different from the **Read Only** switch on a ground station destination, which blocks commands from a ground station program. See [Ground control stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/).

## Change a password

Select **Change Password**, enter the **Current Password** and the **New Password** twice, and select **Update Password**. Passwords are stored as bcrypt hashes.

## Delete a user

Select **Delete** on the user's row and confirm.

- You can't delete your own account while other users exist.
- Deleting the **last** user turns the login off again: *After deletion, the application will be open without authentication until a new user is created.*

## Forgot the admin password

There's no reset link, because the drone has no email, and password recovery isn't self-service.

- If another admin can still log in, they can delete your user under **Users** and create it again.
- If nobody with the admin role can log in, contact support at **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. Include your license key (or the email you bought it with), the device's hostname or name as shown under **Application → License Manager → Activated Devices**, the UAVcast-Pro version, and whether you can reach the device over SSH.

Source: https://docs.uavmatrix.com/uavcast-pro/users/
