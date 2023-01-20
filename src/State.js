import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";

export const State = observable({
  users: {
    loading: false,
    error: null,
    users: null,
  },
});
