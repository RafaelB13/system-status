/**
 * Port (interface) that defines how system metrics are retrieved.
 * Each metric type has its own provider, following Interface Segregation.
 */
export interface CpuMetricsProvider {
  getCpuUsage(): Promise<string>;
}

export interface MemoryMetricsProvider {
  getMemoryUsage(): Promise<string>;
}

export interface TemperatureMetricsProvider {
  getTemperature(): Promise<string>;
}
