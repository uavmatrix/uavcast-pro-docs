---
slug: /changelog
title: Changelog
authors: Bernt Christian Egeland
tags: []
sidebar_position: 40
---
## v6.4.1 ( 09.07.2026 )
- New **dual camera streaming**: stream two cameras to the ground station at the same time, each with independent resolution, FPS, and bitrate.
- New **CPU load indicator** on the Camera page, warns when software H.264 encoding nears the limit.
- **Flight map** now shows a video window per active stream, with hide/restore as tabs docked at the bottom of the map.

## v6.4.0 ( 20.05.2026 )
- New **Data Streams** page: build custom telemetry dashboards with charts, gauges, sparklines, and numeric tiles bound to any MAVLink scalar or `NAMED_VALUE_FLOAT` signal. Multiple named boards, drag/resize layout, history persists across page refresh.
- New **Telemetry Injectors** (Flight Controller → Injectors): ingest external sensor data into the MAVLink stream over HTTP, UDP, or Serial — emitted as `NAMED_VALUE_FLOAT` / `NAMED_VALUE_INT`. Listeners run inside the Rust factory and auto-start on boot, so injected signals keep flowing without any UI interaction.
- New **RTK caster** integration on the NTRIP / RTK tab: connect to an NTRIP caster, browse its sourcetable to pick the nearest mountpoint, and stream RTCM corrections to the flight controller — TLS-secured casters supported.
- Thanks to Bobby Russell for the original feature request and feedback from his high-altitude balloon flights, the inspiration behind both Data Streams and the Injector system.

## v6.3.2 ( 13.04.2026 )
- Bumped Vite to latest major version.
- Bumped Axios to latest version.
- Bumped multiple backend and frontend dependencies for improved security and performance.
- Updated Rust dependencies: `sqlx` 0.7 → 0.8, `bytes` 1.10 → 1.11, `time` 0.3.44 → 0.3.47.

## v6.3.1 ( 20.03.2026 )
- Fix issue in installer for Raspberry Pi Compute Module
- Added more Baude Rate option for Serial telemetry connection.
- Improved error handling and user feedback.
- Bumped several dependencies to latest versions for improved security and performance.

## v6.3.0 ( 19.02.2026 )
- New feature: Fleet Management - Manage multiple Uavcast devices from a single interface, monitor status, and configure settings across your entire fleet.
- Improved UX to be same across all services, fleet management, store, and main application.
- Added support for video preview for custom pipeline with rtsp streams in the Camera page.

## v6.2.3 ( 12.01.2026 )
- Multi-CSI camera support: When multiple CSI cameras are connected, each camera now appears as a separate selectable device (e.g., "Raspberry Pi Camera 0 - imx219" and "Raspberry Pi Camera 1 - imx708")
- Dynamic resolution detection: CSI camera resolutions and maximum FPS are now automatically detected from the connected sensor rather than using hardcoded values
- Per-camera capabilities: Each CSI camera displays its actual supported modes, allowing different camera models (imx219, imx708, etc.) to show their specific resolutions and frame rates


## v6.2.2 ( 05.01.2026 )
- Added sidebar categories.
- Fixed an issue with restoring application from sqlite database backup.
- Improved flightmap icons. 
- Added link to changelog in application updater card.
- Fixed an issue where recordings were saved in wrong folder.
- Added rpicam-apps package to installer for Ubuntu/Debian on Raspberry Pi for CSI camera support
- Added automatic CMA memory update (128MB → 512MB) in config.txt for multi-camera setups
- Fixed camera slot manual switching not working after disabling RC channel toggle
- Fixed MAVLink data not loading on Radio and Inspector tabs without page refresh

## v6.2.1 ( 29.12.2025 )
- Added Chinese (Traditional) language support.
- Improved license validation, some users experienced issues not being able to unregister old devices.

## v6.2.0 ( 20.12.2025 )
- Added multi-architecture support for arm64 and amd64 platforms. UAVcast is no longer limited to Raspberry Pi boards and now runs on a wider range of hardware including NVIDIA Jetson Nano, x86/x64 systems, and other arm64/amd64 compatible devices.

## v6.1.0 ( 07.12.2025 )
- Added dual camera support with instant switching via UI badges or RC channel control (channels 1-18)

## v6.0.5
- Fixed telemetry port configuration not being saved correctly when using diffrent port than default 14550.
- Fixed endpoint naming conflicts when using multiple destinations with the same IP address but different ports -
  endpoint names now include port number (e.g., `[UdpEndpoint 10.0.0.10:14550]`)

## v6.0.4
- Added support for all variants of ardupilot models, VTOL and some others models were missing.
- Improved mavlink connection stability and handling.

## v6.0.3
- New Flight analytics page for viewing mavlink data in graphs.
- New mavlink recording feature to record mavlink data to a file for analysis.
- Improved read_only user permissions to restrict access to certain pages.

## v6.0.2
- Enhanced MAVLink system ID auto-detection from flight controller for improved connectivity.
- Autodetect Mavlink version from flight controller to ensure compatibility.

## v6.0.1
- Improved uavcast installer, it sometimes failed on low resource devices like Raspberry Pi Zero 2 W.
- Improved UART config for pi zero 2 W.

## v6.0.0
- This is a major release with many changes for performance and stability.
  Backend has been rewritten in Rust for better performance and lower resource usage. This will improve the user experience on low end devices like Raspberry Pi Zero. The total package size has been reduced by 70%.
- New Flight Map page.
- New Mission Planner page for creating / editing missions directly from the web interface.
- New Mavlink Inspector page for viewing raw mavlink messages.
- New Radio page for viewing configured RC channels.
- New network priority settings to prioritize between WiFi and Modem connections. This will make it easier to test Uavcast over LTE while having a WiFi
connection.
- New User Management page for adding/removing users and setting permissions.
- Better camera support with improved stability and performance. Uavcast now uses the mediamtx library for internal camera handling and streaming.
- New overhauled live preview, uavcast using MediaMtx for local preview in camera and FlightMap page.


