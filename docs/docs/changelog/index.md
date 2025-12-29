---
slug: /changelog
title: Changelog
authors: Bernt Christian Egeland
tags: []
sidebar_position: 40
---
## v6.2.1
- Added Chinese (Traditional) language support.
- Improved license validation, some users experienced issues not being able to unregister old devices.

## v6.2.0
- Added multi-architecture support for arm64 and amd64 platforms. UAVcast is no longer limited to Raspberry Pi boards and now runs on a wider range of hardware including NVIDIA Jetson Nano, x86/x64 systems, and other arm64/amd64 compatible devices.

## v6.1.0
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


