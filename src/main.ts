import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import timeformatPlugin from "./plugins/timeformat";
import { firebasePlugin } from "./plugins/firebase";

const app = createApp(App);

app.use(timeformatPlugin);

app.use(firebasePlugin);

app.mount("#app");
