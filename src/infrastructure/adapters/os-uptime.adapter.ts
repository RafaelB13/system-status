import * as os from 'os';
import { UptimeMetricsProvider } from '@domain/ports/metrics-provider.port';

export class OsUptimeAdapter implements UptimeMetricsProvider {
  getUptime(): string {
    const uptimeSeconds = os.uptime();
    const days = Math.floor(uptimeSeconds / (24 * 3600));
    const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);

    let uptimeStr = '';
    if (days > 0) uptimeStr += `${days}d `;
    if (hours > 0 || days > 0) uptimeStr += `${hours}h `;
    uptimeStr += `${minutes}m`;

    return uptimeStr;
  }
}
