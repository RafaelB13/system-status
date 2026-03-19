import { SystemMetrics } from '@domain/entities/system-metrics';

/**
 * Port (interface) that defines how system metrics are displayed to the user.
 * The domain doesn't know if it's an Electron tray, a CLI, or a web UI.
 */
export interface MetricsDisplay {
  initialize(): void;
  update(metrics: SystemMetrics): void;
  destroy(): void;
}
