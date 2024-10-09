import { App } from "vue";
import dayjs from "dayjs";

export default {
  install(app: App) {
    app.directive("timeformat", {
      mounted(el, binding) {
        try {
          const time = dayjs(binding.value).format("MM/DD HH:mm");
          el.innerText = time;
        } catch (error) {
          el.innerText = "";
        }
      },
    });
  },
};
