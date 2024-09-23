import { App } from "vue";
import dayjs from "dayjs";

export default {
  install(app: App) {
    app.directive("timeformat", {
      mounted(el, binding) {
        const time = dayjs(binding.value).format("MM/DD HH:MM");
        el.innerText = time;
      },
    });
  },
};
