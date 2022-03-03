import { createStore } from "vuex";
import type { LeaderboardModel } from "@/services/stats/Leaderboard.model";

interface state {
  authToken?: string | null;
  proxyToken?: string | null;
  leaderboardRequestData?: LeaderboardModel;
  query?: string | null;
}

export default createStore<state>({
  state: {
    authToken:
      localStorage.getItem("dialpad__auth-token") ||
      "M4e2LpgKhwfGUtW9ruXRcUS9abbetK7TAFsFFhEtvEzDSLacZwz96d9zJYUyBJbUtLZLZEZ2hZCQJe2JZQUa5uvSUbjTEwbUgkdD",
    proxyToken: new URLSearchParams(window.location.search).get("token") || "",
    query: new URLSearchParams(window.location.search).get("query"),
    leaderboardRequestData: { users: [] },
  },
  mutations: {
    setLeaderboardRequestData: (state, payload) => {
      state.leaderboardRequestData = payload;
    },
    setProxyToken: (state, proxyToken) => {
      state.proxyToken = proxyToken;
    },
  },
  getters: {
    authToken: (state) => {
      return state.authToken;
    },
    proxyToken: (state) => {
      return state.proxyToken;
    },
    leaderboardRequestData: (state) => {
      return state.leaderboardRequestData;
    },
    query: (state) => {
      return state.query;
    },

    parsedQuery: (state) => {
      const regex = new RegExp("\\d+(?: day| days)$").exec(state.query || "");
      const regexXDays = regex ? regex[0] : "";
      const xDays = +((regexXDays || "").split(" day")[0] || -1);
      switch (true) {
        case state.query?.includes("today"):
        case xDays === 0: {
          return { label: "today", value: "0-0" };
        }
        case state.query?.includes("yesterday"):
        case state.query?.includes("last day"):
        case xDays === 1: {
          return { label: "yesterday", value: "1-1" };
        }
        case state.query?.includes("last month"):
        case state.query?.includes("past month"):
        case state.query?.includes("this month"): {
          return { label: "last month", value: "1-30" };
        }
        case xDays % 30 === 0: {
          const xMonths: number = xDays / 30;
          if (xMonths === 1) return { label: "last month", value: "1-30" };
          else return { label: `last ${xMonths} months`, value: `1-${xDays}` };
        }
        case state.query?.includes("last week"):
        case state.query?.includes("past week"):
        case state.query?.includes("this week"): {
          return { label: "last week", value: "1-7" };
        }
        case xDays % 7 === 0: {
          const xWeeks = xDays / 7;
          if (xWeeks === 1) return { label: "last week", value: "1-7" };
          else return { label: `last ${xWeeks} weeks`, value: `1-${xDays}` };
        }
        case state.query?.includes("last year"):
        case state.query?.includes("past year"):
        case state.query?.includes("this year"): {
          return { label: "last year", value: "1-365" };
        }
        case !!~xDays: {
          return {
            label: `last ${xDays} days`,
            value: `1-${xDays}`,
          };
        }
        default: {
          return { label: "last week", value: "1-7" };
        }
      }
    },
  },
});
