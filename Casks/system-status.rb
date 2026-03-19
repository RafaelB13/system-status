cask "system-status" do
  version "1.0.2"
  sha256 :no_check

  url "https://github.com/RafaelB13/system-status/releases/download/v#{version}/System-Status-#{version}.dmg"
  name "System Status"
  desc "Lightweight macOS system tray application to monitor real-time system performance."
  homepage "https://github.com/RafaelB13/system-status"

  app "System Status.app"

  zap trash: [
    "~/Library/Application Support/system-status",
    "~/Library/Preferences/com.rafael.systemstatus.plist",
    "~/Library/Saved Application State/com.rafael.systemstatus.savedState",
  ]
end
