---
slug: /configuration-dynamic-dns
title: "Dynamic DNS Setup"
sidebar_label: "Dynamic DNS"
description: "Bind the changing public IP address of your modem connection to a fixed hostname with a dynamic DNS provider, for setups that do not use a VPN."
authors: Bernt Christian Egeland
tags: []
---

!['DNS'](img/dns_page.png)

:::info
    If you are connected using VPN, then DNS is not needed. VPN connections uses static IP address that wont change.
:::

Dynamic DNS allow you to bind an external IP address to a convenient name so we humans can easily remember. 
The name (Alias) will always be pointing towards the external IP address even though if the IP changes.

As an example, www.google.com is pointing towards 172.217.21.142, if you type that IP address in your browser you will still access the google.com, but those numbers would be hard to remember, hence the name is more convenient.

Here is a list for UAVcast supported services.
Use any of the bellow services and add the name to the DNS System input.

* For dyndns.org:         default@dyndns.org
* For freedns.afraid.org: default@freedns.afraid.org
* For zoneedit.com:       default@zoneedit.com
* For no-ip.com:          default@no-ip.com
* For easydns.com:        default@easydns.com
* For tzo.com:            default@tzo.com
* For 3322.org:           dyndns@3322.org
* For dnsomatic.com:      default@dnsomatic.com
* For tunnelbroker.net:   ipv6tb@he.net
* For dns.he.net:         dyndns@he.net
* For dynsip.org:         default@dynsip.org
* For sitelutions.com:    default@sitelutions.com
* For dnsexit.com:        default@dnsexit.com
* For generic:            custom@http_svr_basic_auth

## Username
Your service username. This is normally the credentials for logging in to your account at (example no-ip.com)

## Password
Your service password. This is normally the credentials for logging in to your account at (example no-ip.com)

## Alias
This is your newly created address or name. example: uavcast.no-ip.info

## DNS System
This is the system or service you are using from the list above. If you have signed up for no-ip.com, then use `default@no-ip.com`.
