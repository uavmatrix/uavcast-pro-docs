---
slug: /configuration-data-streams
title: Data Streams
authors: Bernt Christian Egeland
tags: []
---

# Data Streams

Data Streams is a Grafana-style, fully customizable telemetry dashboard inside UAVcast-Pro. Build multiple named boards, drag and resize widgets, configure each one to bind any MAVLink scalar or injected `NAMED_VALUE_FLOAT` signal, and watch the values stream live. History persists across page refresh.

Find the page in the sidebar under **Data Streams**.

## What you can visualize

Anything that flows through MAVLink is a candidate:

- **Standard flight controller telemetry** &mdash; altitude, battery voltage, airspeed, GPS fix, attitude, link quality, anything published by ArduPilot / PX4.
- **Injected named values** &mdash; signals you push into the stream with the [Injectors](/docs/6.x/configuration-injectors) feature (radiation, LTE signal, custom sensors).
- **Anything else a connected component emits as `NAMED_VALUE_FLOAT` / `NAMED_VALUE_INT`** &mdash; a Lua script on the autopilot, a payload computer, a third-party radio that publishes its own diagnostics.

## Concepts

### Dashboards

A dashboard is a named board with its own widget layout. You can have as many as you want; the page remembers which one you had open last.

Admins can:

- **Create** a new dashboard from the tab switcher
- **Rename**, **duplicate**, **delete**, **import**, and **export** existing dashboards from the kebab menu
- Toggle **Edit mode** to drag, resize, configure, and remove widgets
- Toggle **Fullscreen** for clean operator view

Non-admin users see dashboards read-only. They can still switch between boards and toggle fullscreen.

### Widgets

Each widget binds to one or more signals and renders them in a particular way. Widget types:

| Type | Best for |
| --- | --- |
| **Numeric** | Big single-value readouts (battery voltage, altitude). |
| **Sparkline** | Numeric + tiny inline trend, no axes. |
| **Line chart** | Full chart with axes, legend, grid, multiple series. |
| **Gauge** | Radial dial with threshold arcs (signal strength, fuel level). |
| **Bar** | Horizontal indicator bar with threshold zones. |
| **Status** | Text widget showing last value + "X seconds ago". Good for slow signals. |
| **Named-value table** | Lists every active `NAMED_VALUE_*` signal currently in the stream. Used as a discovery view. |

### Signal keys

A signal is identified by a key like `mavlink:battery.voltage` or `RAD1@1:194`. The format is `name@sysid:compid` for injected named values, or `mavlink:<path>` for standard MAVLink scalars. The widget config dialog provides a searchable list of active keys, but you can also type a key by hand to pre-create a widget for a signal that has not arrived yet.

## Creating a dashboard

1. Open **Data Streams**.
2. If you are an admin and there are no dashboards yet, click **Create your first dashboard** and give it a name.
3. To create additional dashboards later, use the **+** button next to the dashboard tabs, or open the kebab menu and choose **New dashboard**.

## Adding widgets

1. Toggle **Edit mode** on (admin only).
2. Click **Add widget** and pick a type.
3. The new widget is placed in the next free grid slot and opens its config dialog.

### Configuring a widget

The widget config dialog has four tabs:

- **Source** &mdash; pick one signal (or multiple for line charts). The selector lists every active key from the live stream. Type a key by hand to pre-create a widget for a signal not yet seen.
- **Display** &mdash; title, color, units, prefix / suffix, decimal places.
- **Range** &mdash; min, max, auto-fit toggle, plus a list of thresholds (each with a value, color, optional label). Thresholds drive numeric tile colors, gauge arcs, and bar zones.
- **Chart** (sparkline / line only) &mdash; window seconds (60 / 300 / 900 / 3600 / custom), legend, grid, line width, area fill.

Changes apply immediately. The layout is auto-saved (debounced 800 ms) so you can keep dragging without thinking about a Save button.

## Layout

In **Edit mode**, every widget can be:

- **Dragged** by its title bar.
- **Resized** from the bottom-right corner.
- **Configured** or **Removed** from the kebab on the widget header.

Out of edit mode, widgets stay frozen in place. This is the operator-facing layout.

## Empty-state hints

If a widget shows "No samples yet for `RAD1@1:194`" it means the signal name and sysid:compid combo has not been seen on the stream since the page loaded. Either:

- The sensor or injector is not running.
- The name on the injector has a prefix that you have not accounted for.
- The sysid / compid does not match the source.

The named-value table widget is the easiest way to discover what is actually flowing.

## Import / Export

Each dashboard can be exported as JSON (kebab menu → **Export**) and imported on another instance (kebab menu → **Import**). The JSON round-trips through a schema validator, so a malformed import is rejected with a clear error.

This is how you share a known-good operator layout across multiple aircraft, or version-control your dashboards.

## Persistence

Dashboards and their widgets are stored in the local SQLite database (`telemetry_dashboard` table). They survive UAVcast restarts. Sample history is in-memory only and resets when the page reloads, but the values keep flowing live as long as the source is publishing.

## Performance notes

- The page keeps ~3600 samples per signal in memory. At 10 Hz that is 6 minutes; at 1 Hz it is an hour.
- Line charts use a windowed slice of that buffer, so longer windows are not free, but the default 5-minute window is cheap.
- Many widgets on one dashboard is fine. Many high-rate signals on one widget is what slows things down. If a chart drops frames, lower the publish rate at the source or raise the **Rate limit** on the injector.

## Related pages

- [Injectors](/docs/6.x/configuration-injectors) &mdash; publish custom signals into the stream
- [Flight Controller](/docs/6.x/configuration-flight-controller) &mdash; configure the MAVLink source
- [Ground Control Stations](/docs/6.x/configuration-ground-controller) &mdash; forward the same telemetry to QGC / Mission Planner
