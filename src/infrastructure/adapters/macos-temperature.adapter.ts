import * as childProcess from 'child_process';
import { TemperatureMetricsProvider } from '@domain/ports/metrics-provider.port';

/**
 * Adapter that retrieves battery temperature on macOS via `ioreg`.
 */
export class MacOsTemperatureAdapter implements TemperatureMetricsProvider {
  getTemperature(): Promise<string> {
    return new Promise((resolve) => {
      childProcess.exec(
        'ioreg -rn AppleSmartBattery | grep \'"Temperature" =\'',
        (err, stdout) => {
          if (err) {
            resolve('--');
            return;
          }

          const match = stdout.match(/"Temperature"\s*=\s*(\d+)/);
          if (match && match[1]) {
            const val = parseInt(match[1]);
            const temp = (val / 100).toFixed(1);
            resolve(temp);
            return;
          }

          resolve('--');
        },
      );
    });
  }
}
