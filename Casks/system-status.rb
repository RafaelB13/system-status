cask "system-status" do
  version "1.0.1"
  sha256 "772247f0b924ab7ced5c05110c6581339a8336f8c889e9f7384164ac667b5c9d"

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
