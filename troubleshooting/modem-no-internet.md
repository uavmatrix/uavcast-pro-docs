# 4G modem connected but no internet

> LTE modem shows signal and an operator but the drone has no internet? Check modem type, APN, SIM PIN and data, network priority and the default route.

The **Modem** page shows signal, an operator and maybe an IP address, yet the drone can't reach the internet: the VPN won't connect, the license can't be checked, and video and telemetry never reach the ground station over LTE.

| What you see | Likely cause | Start at |
| --- | --- | --- |
| No Modem Connected | Linux does not see the modem, or it lacks power | [Check 1](https://docs.uavmatrix.com/troubleshooting/modem-no-internet/#check-1) |
| Error that mentions a HiLink modem, or no Connect button for a USB stick | Wrong Modem type | [Check 2](https://docs.uavmatrix.com/troubleshooting/modem-no-internet/#check-2) |
| Registered on the network, but no IPv4 address | Wrong APN, PIN, or no data on the SIM | [Check 3](https://docs.uavmatrix.com/troubleshooting/modem-no-internet/#check-3) |
| Modem has an IP address, internet still goes through Wi-Fi | Network priority favours Wi-Fi | [Check 4](https://docs.uavmatrix.com/troubleshooting/modem-no-internet/#check-4) |
| Works at home, not in the field (or the reverse) | Roaming, coverage, or a home network on the modem subnet | [Check 5](https://docs.uavmatrix.com/troubleshooting/modem-no-internet/#check-5) |

![UAVcast-Pro Modem page with Traditional (PPP) selected and the No Modem Connected panel](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/modem.webp)

*Modem page with Traditional (PPP) selected and no modem plugged in. With a modem connected, the right-hand card shows signal quality, state, operator and IPv4 information.*

## Check 1: Is the modem detected?

If the page says **No Modem Connected**:

1. Check that the modem's power light is on and it sits firmly in a USB port.
2. A modem can draw more current than a Raspberry Pi USB port supplies. Watch the dashboard's **Power supply** row. If it says **Voltage too low - use a stronger power supply**, fix the power first: [Undervoltage and throttling](https://docs.uavmatrix.com/troubleshooting/undervoltage-and-throttling/).
3. On the Pi, run `lsusb` to see the modem, and `mmcli -L` to see whether ModemManager found it. A HiLink modem does not show in `mmcli`; it appears as a network interface in `ip addr` instead.

The modem appears on the page by itself once it is detected.

## Check 2: Pick the right modem type

There are two kinds of USB modems, and **Modem type** must match yours.

|  | **HiLink** | **Traditional (PPP)** |
| --- | --- | --- |
| How Linux sees it | A network adapter (the modem is a small router) | A modem managed by ModemManager |
| Who connects | The modem itself, automatically | UAVcast-Pro, with **Connect** and **Disconnect** buttons |
| Huawei example | E3372**h** | E3372**s** |

If you choose **Traditional (PPP)** for a HiLink modem, the log says *HiLink modem detected … Please change your modem type to 'HiLink' in settings.* Change **Modem type** and the error goes away.

## Check 3: APN, PIN and the SIM

For a **Traditional (PPP)** modem:

1. Leave **Access Point Name (Optional)** empty first. UAVcast-Pro then tries your network's default APN and known APNs for the SIM, and remembers the one that works (*Found a working … it will be used from now on* in the log).
2. If that fails, enter the APN your carrier gives for mobile data. Some carriers also need **Username (Optional)** and **Password (Optional)**.
3. If the SIM has a PIN, enter it in **PIN code (Optional)**, or disable the PIN by putting the SIM in a phone. **Unlock Required** under **Modem Information** shows whether the SIM is locked.
4. Put the SIM in a phone and check that mobile data works and the plan has data left.

For a **HiLink** modem, the APN is set in the modem's own web page, usually at `http://192.168.8.1`. Open it from the Pi, or plug the modem into a laptop.

> **UAVcast-Pro keeps trying**
>
> A Traditional modem connects at boot and reconnects after signal loss by itself. If a modem connects without getting an address, UAVcast-Pro switches it to raw-IP mode and tries again. Give it a minute after boot before you change settings.

## Check 4: Make the modem the default route

If the Pi is also on Wi-Fi or Ethernet, traffic goes out the interface with priority, not necessarily the modem.

1. Go to **Networks**.
2. Under **Network Priority**, choose **Modem Priority (Outdoor Mode)** before flight. **WiFi Priority (Indoor Mode)** saves cellular data at home but sends everything over Wi-Fi.
3. In **Network Interfaces**, check that the modem interface is marked **Default** and that **Default Gateway** shows *via* the modem interface.

![Networks page with Network Priority set to Auto and the interfaces table showing wlan0 as default](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/networks.webp)

*Networks page with Auto (System Default) active and Wi-Fi (wlan0) as the default route. Select Modem Priority (Outdoor Mode) here to route over the modem.*

Test from the Pi over the modem alone:

```bash
ping -c 3 -I wwan0 1.1.1.1   # Traditional modem (interface name may differ)
ip route                     # the first "default via" line is the route in use
```

## Check 5: Field-only problems

- **Roaming**: a SIM used abroad may need roaming enabled by the carrier. Check in a phone with the same SIM.
- **Coverage**: look at **Signal Quality** and **Technology**. Some IoT SIMs only work on certain bands or technologies.
- **Subnet clash**: HiLink modems hand out `192.168.8.x`. If your home or office network also uses `192.168.8.0/24`, routing breaks. Change the LAN or the modem's subnet.

## Still no internet?

[Download the logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/) with **Modem Manager** selected, add the output of `mmcli -m 0` and `ip route`, and send them to **[support@uavmatrix.com](mailto:support@uavmatrix.com)** with the modem model and carrier.

Related: [Cellular modem](https://docs.uavmatrix.com/uavcast-pro/connectivity/cellular-modem/) · [Networks](https://docs.uavmatrix.com/uavcast-pro/connectivity/networks/)

Source: https://docs.uavmatrix.com/troubleshooting/modem-no-internet/
