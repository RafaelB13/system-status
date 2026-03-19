import * as childProcess from 'child_process';
import { DiskMetricsProvider } from '@domain/ports/metrics-provider.port';

export class MacOsDiskAdapter implements DiskMetricsProvider {
  getDiskFree(): Promise<string> {
    return new Promise((resolve) => {
      childProcess.exec("df -h / | tail -1 | awk '{print $4}'", (err, stdout) => {
        if (err) return resolve('--');
        resolve(stdout.trim());
      });
    });
  }
}
