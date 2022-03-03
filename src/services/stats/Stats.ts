import type { Subject } from "rxjs";
import { get } from "@/services/Request";
import { dialpadStatsApiUrl } from "@/utils/Common";
import type { LeaderboardModel } from "@/services/stats/Leaderboard.model";
import store from "@/store";

export function getLeaderBoard(
  stat_type = "onduty",
  sort_value = "on_duty_time",
  days = "1-30",
  sort_order = "desc"
): Subject<LeaderboardModel> {
  const url = new URL(`${dialpadStatsApiUrl()}/leaderboard`);
  url.searchParams.set("sort_order", sort_order);
  url.searchParams.set("sort_value", sort_value);
  url.searchParams.set("stat_type", stat_type);
  url.searchParams.set("days", store.getters.parsedQuery.value);
  url.searchParams.set(
    "target_list",
    JSON.stringify([
      {
        id: "aglzfnV2LWJldGFyFwsSCkNhbGxDZW50ZXIYgICg3a-UugoM",
        key: "aglzfnV2LWJldGFyFwsSCkNhbGxDZW50ZXIYgICg3a-UugoM",
        name: "+navTestCallCenter",
        type: "call_center",
        is_entire_office: false,
      },
    ])
  );
  return get<LeaderboardModel>(url.href, true);
}
