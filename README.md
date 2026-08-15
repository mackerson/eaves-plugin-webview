# WebView Plugin

**Version**: 2.0.0
**ID**: `com.eaves.webview`

## Description

Embedded web browser for Eaves. Provides a custom view with full web browsing capabilities within the app.

## Features

- Full web browser view using WebView component
- URL navigation and history
- Persistent last visited URL
- Custom navigation commands

## Usage

This plugin is bundled with Eaves and activated automatically. Access the browser by clicking the 🌐 Browser icon in the sidebar.

## API Usage

This plugin demonstrates:
- `context.ui.registerView()` - Register custom views
- `context.events.on()` - Listen to events
- `context.utils.storage.set()` - Persistent storage
- `context.ui.registerCommand()` - Register commands
- `context.utils.log.info()` - Logging

## Files

- `plugin.json` - Plugin manifest
- `index.js` - Plugin entry point
- `README.md` - This file

## Component

Uses `WebViewComponent` from `src/renderer/components/plugins/WebViewComponent.tsx`
