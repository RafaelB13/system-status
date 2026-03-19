cask "system-status" do
  version "1.0.2"
  sha256 "3965957bdba685ee0aec8277fe8bd9330aa3936195ceb13d1cb6e2b3e6cd1e81"

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
