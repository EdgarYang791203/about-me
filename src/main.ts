import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { fetchPlugin } from "./plugins/fetchPlugin";
import timeformatPlugin from "./plugins/timeformat";
// TODO: Firebase noSQL
import { firebasePlugin } from "./plugins/firebase";

const app = createApp(App);

app.use(fetchPlugin);

app.use(timeformatPlugin);

app.use(firebasePlugin);

app.mount("#app");
