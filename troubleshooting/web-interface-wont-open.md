# Web interface won't open

> Can't open UAVcast-Pro at http://device-ip after installing? Find the right address, check the uavcast-web service, the server port and port 80.

The installer finished, but `http://<device-ip>/` times out, refuses the connection or shows another program's page.

| What you see | Likely cause | Start at |
| --- | --- | --- |
| Timeout, or the page never loads | Wrong address, or your computer is on another network | [Check 1](https://docs.uavmatrix.com/troubleshooting/web-interface-wont-open/#check-1) |
| Connection refused | The web service is not running | [Check 2](https://docs.uavmatrix.com/troubleshooting/web-interface-wont-open/#check-2) |
| Another web page, for example nginx or Apache | Something else uses port 80 | [Check 3](https://docs.uavmatrix.com/troubleshooting/web-interface-wont-open/#check-3) |
| Worked before, stopped after a settings change | The server port was changed | [Check 4](https://docs.uavmatrix.com/troubleshooting/web-interface-wont-open/#check-4) |
| Loads, but every page jumps to Application | No active license yet | [Check 5](https://docs.uavmatrix.com/troubleshooting/web-interface-wont-open/#check-5) |

## Check 1: Use the right address

The web interface runs on **port 80** by default, so the address is just `http://<device-ip>/`.

1. Find the device IP. The installer prints it at the end. On the device you can also run `hostname -I`.
2. On a Raspberry Pi with the default hostname, try `http://raspberrypi.local/`.
3. Use `http://`, not `https://`. The web interface does not serve HTTPS.
4. Make sure your computer is on the same network as the device, or on the same VPN. Over 4G you must use the drone's VPN address.

## Check 2: Is the web service running?

On the device, run:

```bash
sudo systemctl status uavcast-web
```

It should say **active (running)**. If not, start it and read why it stopped:

```bash
sudo systemctl restart uavcast-web
journalctl -u uavcast-web --since "1 hour ago"
```

The web interface needs the background services too. Check them the same way: `uavcast-factory`, `mavlink-manager`, `uavcast-camera` and `redis-server`. The full list is in [Services and files](https://docs.uavmatrix.com/reference/services-and-files/).

## Check 3: Port 80 already in use

If another web server is installed on the device, it may hold port 80. Find out who listens:

```bash
sudo ss -ltnp | grep ':80 '
```

Stop and disable the other server (`sudo systemctl disable --now nginx`, for example), then restart `uavcast-web`.

## Check 4: The server port was changed

**Application → Settings → Server Port** moves the web interface to another port, and the address becomes `http://<device-ip>:<port>/`. If you don't remember the port, read it on the device:

```bash
grep SERVER_PORT /etc/systemd/system/uavcast-web.service
```

## Check 5: Every page goes to Application

That is expected until a license is active on the device. Activate it under **Application → License Manager**. If that fails, see [License won't activate](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/).

## Check 6: The installer did not finish

If `uavcast-web` doesn't exist (`Unit uavcast-web.service could not be found`), the installation stopped early. See [Installation fails](https://docs.uavmatrix.com/troubleshooting/installation-fails/).

## Still no luck?

Send the output of `systemctl status uavcast-web` and `journalctl -u uavcast-web --since yesterday`, plus `/opt/uavcast-pro/installer.log`, to **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Related: [Install UAVcast-Pro](https://docs.uavmatrix.com/get-started/installation/) · [Application settings](https://docs.uavmatrix.com/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/troubleshooting/web-interface-wont-open/
