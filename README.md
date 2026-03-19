# System Status (macOS Menu Bar)

A lightweight macOS system tray application built with Electron and TypeScript to monitor real-time CPU, RAM, and Battery Temperature directly from your menu bar.

![App Icon](icon.icns)

## Features

- **Real-time CPU Usage:** Monitor processor load percentage.
- **Accurate RAM Monitoring:** Displays used memory excluding macOS system cache (Wired + Active + Compressed) for a realistic view of available resources.
- **Hidden Battery Temperature:** View the machine's temperature (via battery sensor) by clicking the menu bar icon.
- **Native Experience:** Runs exclusively in the menu bar; dock icon is hidden.
- **Security:** No root/sudo permissions required.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)

## Installation & Development

1. **Clone or navigate to the project folder:**
   ```bash
   cd system-status
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run in development mode:**
   ```bash
   npm start
   ```

## Building the Executable

To generate a standalone macOS application (`.app`) and a disk image (`.dmg`) with the custom icon:

```bash
npm run dist
```

The output will be located in the `release/` directory.

## How it Works

- **CPU:** Uses `os-utils` to calculate load over a 2-second interval.
- **RAM:** Executes the native `vm_stat` command to parse memory pages accurately, ensuring cached data is treated as freeable space.
- **Temperature:** Utilizes `ioreg` to fetch battery temperature as a reliable proxy for system heat without requiring administrative privileges.

## License

ISC
