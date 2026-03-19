import * as osUtils from 'os-utils';
import { CpuMetricsProvider } from '@domain/ports/metrics-provider.port';

/**
 * Adapter that retrieves CPU usage via the `os-utils` library.
 */
export class CpuUsageAdapter implements CpuMetricsProvider {
  getCpuUsage(): Promise<string> {
    return new Promise((resolve) => {
      osUtils.cpuUsage((v) => {
        const cpuPercent = (v * 100).toFixed(1);
        resolve(`${cpuPercent}%`);
      });
    });
  }
}
