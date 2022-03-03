import { DIALPAD_API } from "./Constants";

export function dialpadStatsApiUrl(): string {
  return `${DIALPAD_API}/stats/v2`;
}
