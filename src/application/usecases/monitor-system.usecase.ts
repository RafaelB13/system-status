import {
  CpuMetricsProvider,
  MemoryMetricsProvider,
  TemperatureMetricsProvider,
  DiskMetricsProvider,
  UptimeMetricsProvider,
} from '@domain/ports/metrics-provider.port';
import { MetricsDisplay } from '@domain/ports/metrics-display.port';
import { SystemMetrics } from '@domain/entities/system-metrics';

/**
 * Application Use Case: orchestrates the monitoring flow.
 * Collects metrics from providers (ports) and updates the display (port).
 * Has NO knowledge of Electron, vm_stat, ioreg, etc.
 */
export class MonitorSystemUseCase {
  private intervalId: NodeJS.Timeout | null = null;

  constructor(
    private readonly cpuProvider: CpuMetricsProvider,
    private readonly memoryProvider: MemoryMetricsProvider,
    private readonly temperatureProvider: TemperatureMetricsProvider,
    private readonly diskProvider: DiskMetricsProvider,
    private readonly uptimeProvider: UptimeMetricsProvider,
    private readonly display: MetricsDisplay,
  ) {}

  async start(intervalMs: number = 2000): Promise<void> {
    this.display.initialize();
    await this.refresh();
    this.intervalId = setInterval(() => this.refresh(), intervalMs);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.display.destroy();
  }

  private async refresh(): Promise<void> {
    const [cpuUsagePercent, memoryUsagePercent, batteryTemperature, diskFree] =
      await Promise.all([
        this.cpuProvider.getCpuUsage(),
        this.memoryProvider.getMemoryUsage(),
        this.temperatureProvider.getTemperature(),
        this.diskProvider.getDiskFree(),
      ]);

    const uptime = this.uptimeProvider.getUptime();

    const metrics: SystemMetrics = {
      cpuUsagePercent,
      memoryUsagePercent,
      batteryTemperature,
      diskFree,
      uptime,
    };

    this.display.update(metrics);
  }
}
