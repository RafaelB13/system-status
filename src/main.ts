import { app } from 'electron';

// Adapters (infrastructure)
import { CpuUsageAdapter } from '@infrastructure/adapters/cpu-usage.adapter';
import { MacOsMemoryAdapter } from '@infrastructure/adapters/macos-memory.adapter';
import { MacOsTemperatureAdapter } from '@infrastructure/adapters/macos-temperature.adapter';
import { ElectronTrayAdapter } from '@infrastructure/adapters/electron-tray.adapter';

// Use Case (application)
import { MonitorSystemUseCase } from '@application/usecases/monitor-system.usecase';

/**
 * Composition Root — wires adapters into ports and starts the application.
 * This is the ONLY place that knows about concrete implementations.
 */

const REFRESH_INTERVAL_MS = 2000;

// Instantiate adapters
const cpuProvider = new CpuUsageAdapter();
const memoryProvider = new MacOsMemoryAdapter();
const temperatureProvider = new MacOsTemperatureAdapter();
const display = new ElectronTrayAdapter();

// Inject adapters into the use case
const monitor = new MonitorSystemUseCase(
  cpuProvider,
  memoryProvider,
  temperatureProvider,
  display,
);

app.whenReady().then(() => {
  // Hide dock icon on macOS
  if (process.platform === 'darwin' && app.dock) {
    app.dock.hide();
  }

  monitor.start(REFRESH_INTERVAL_MS);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  monitor.stop();
});
