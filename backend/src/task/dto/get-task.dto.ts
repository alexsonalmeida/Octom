export class GetTaskStatsDto {
  from: string;
  to: string;
  resolution: 'daily' | 'weekly' | 'monthly';
}
