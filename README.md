# System Status (macOS Menu Bar)

A lightweight and professional macOS system tray application built with Electron and TypeScript to monitor real-time system performance directly from your menu bar.

![App Icon](icon.icns)

## 🚀 Features

- **Real-time Menu Bar Stats:**
  - 💻 **CPU Usage:** Monitor processor load percentage.
  - 📊 **RAM Monitoring:** Accurate usage excluding macOS system cache (Wired + Active + Compressed).
- **Advanced Context Menu (Right-click):**
  - 💾 **Disk Free:** Quick view of available space on your root partition.
  - ⏱️ **System Uptime:** See how long your Mac has been running (e.g., `2d 5h 30m`).
  - 🌡️ **Battery Temperature:** Reliable proxy for system heat without requiring root access.
- **Native Experience:** Runs exclusively in the menu bar with a hidden dock icon.
- **Modern UI:** Clean icons (emojis) and professional spacing for quick readability.
- **Zero Root Privileges:** Uses standard system APIs only—no `sudo` required.

## 🏗️ Architecture

The project follows **Clean Architecture** principles to ensure maintainability and testability:
- **Domain:** Pure business logic and interfaces (Ports).
- **Application:** Use Cases that orchestrate the flow of data.
- **Infrastructure:** Concrete implementations (Adapters) for macOS sensors, Electron UI, and system commands.
- **Import Aliases:** Uses `@domain/*`, `@application/*`, and `@infrastructure/*` for clean imports.

## 🛠️ Installation & Development

1. **Clone the repository:**
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

## 📦 Installation

### Standard (Manual)

To generate a standalone macOS application (`.app`) and a disk image (`.dmg`) with the custom icon:

```bash
npm run dist
```

The final installer will be located in the `release/` directory.

### Homebrew (Recommended)

You can install System Status directly via Homebrew:

```bash
# Add the tap
brew tap RafaelB13/system-status https://github.com/RafaelB13/system-status

# Install the application
brew install --cask system-status
```

## 📝 License

ISC
