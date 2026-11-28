---
slug: /configuration-users
title: "User Accounts and Roles"
sidebar_label: "Users Management"
description: "Create and manage UAVcast-Pro user accounts with admin and read-only roles to control who can change settings."
authors: Bernt Christian Egeland
tags: []
---

# Users Management
The Users Management page allows you to create, manage, and delete user accounts for UAVcast-Pro. Support for multiple users with different permission levels enables secure access control.

## Overview

UAVcast-Pro v6 features a multi-user authentication system with role-based access control:

**User Roles:**
- **Admin** - Full access to all features, can manage users
- **Read-only** - View-only access, cannot change settings

## User Roles

### Admin Role
Full system access including:
- Configure all UAVcast-Pro settings
- Start/stop services
- Manage flight controller, camera, modem, VPN
- Create and delete user accounts
- Backup and restore database
- Update application
- Change network settings

### Read-only Role
Limited access for monitoring:
- View Dashboard
- View Flight Map
- View HUD
- View service status
- Cannot change any settings
- Cannot manage users
- Cannot start/stop services

:::tip First User
The first user created must be an admin. You cannot create read-only users until at least one admin exists.
:::


## Related Pages

- [Application Settings](/docs/6.x/configuration-settings) - Change server port, manage database
- [Dashboard](/docs/6.x/configuration-dashboard) - Monitor system (available to all users)
- [Installation](/docs/6.x/installation) - Initial setup and first user creation

## Next Steps

After setting up users:

1. Create admin account during first login
2. Add additional users as needed
3. Set strong passwords for all accounts
4. Test read-only user permissions
5. Change default passwords periodically
