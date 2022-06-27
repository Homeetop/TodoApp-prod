import { save, lookUP, erase } from "./crud";

export const TaskController = {
  add: function (task) {
    if (task) {
      save(task);
    }
  },
  get: function () {
    lookUP();
  },
  delete: function (condition) {
    erase(condition);
  }
};
