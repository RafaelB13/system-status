import { Tray, Menu, nativeImage, app } from 'electron';
import { MetricsDisplay } from '@domain/ports/metrics-display.port';
import { SystemMetrics } from '@domain/entities/system-metrics';

/**
 * Adapter that displays system metrics in the macOS menu bar using Electron Tray.
 */
export class ElectronTrayAdapter implements MetricsDisplay {
  private tray: Tray | null = null;

  initialize(): void {
    const icon = nativeImage.createFromDataURL(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    );
    this.tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
      { label: 'System Status', enabled: false },
      { type: 'separator' },
      { label: 'Quit', click: () => app.quit() },
    ]);

    this.tray.setToolTip('System CPU and Memory Status');
    this.tray.setContextMenu(contextMenu);
  }

  update(metrics: SystemMetrics): void {
    if (!this.tray) return;

    this.tray.setTitle(
      `CPU: ${metrics.cpuUsagePercent} | RAM: ${metrics.memoryUsagePercent}`,
    );

    const contextMenu = Menu.buildFromTemplate([
      { label: 'System Status', enabled: false },
      { type: 'separator' },
      {
        label: `Battery Temperature: ${metrics.batteryTemperature}°C`,
        enabled: false,
      },
      { type: 'separator' },
      { label: 'Quit', click: () => app.quit() },
    ]);

    this.tray.setContextMenu(contextMenu);
  }

  destroy(): void {
    if (this.tray) {
      this.tray.destroy();
      this.tray = null;
    }
  }
}
