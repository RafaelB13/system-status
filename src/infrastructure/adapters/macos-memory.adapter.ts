import * as os from 'os';
import * as childProcess from 'child_process';
import { MemoryMetricsProvider } from '@domain/ports/metrics-provider.port';

/**
 * Adapter that retrieves memory usage on macOS via `vm_stat`.
 * Falls back to Node.js `os` module if vm_stat fails.
 */
export class MacOsMemoryAdapter implements MemoryMetricsProvider {
  getMemoryUsage(): Promise<string> {
    return new Promise((resolve) => {
      childProcess.exec('vm_stat', (err, stdout) => {
        if (err) {
          resolve(this.getFallbackMemoryUsage());
          return;
        }

        resolve(this.parseVmStat(stdout));
      });
    });
  }

  private getFallbackMemoryUsage(): string {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryPercent = (usedMemory / totalMemory) * 100;
    return `${memoryPercent.toFixed(1)}%`;
  }

  private parseVmStat(stdout: string): string {
    const lines = stdout.split('\n');
    const stats: Record<string, number> = {};

    const pageSizeMatch = lines[0]?.match(/page size of (\d+) bytes/);
    const pageSize = pageSizeMatch ? parseInt(pageSizeMatch[1] || '4096') : 4096;

    lines.forEach((line) => {
      const parts = line.split(':');
      if (parts.length === 2) {
        const key = parts[0]?.trim();
        const value = parseInt(parts[1]?.trim().replace('.', '') || '0');
        if (key) stats[key] = value;
      }
    });

    const wired = (stats['Pages wired down'] || 0) * pageSize;
    const active = (stats['Pages active'] || 0) * pageSize;
    const compressed = (stats['Pages occupied by compressor'] || 0) * pageSize;

    const usedMemory = wired + active + compressed;
    const totalMemory = os.totalmem();
    const memoryPercent = (usedMemory / totalMemory) * 100;

    return `${memoryPercent.toFixed(1)}%`;
  }
}
