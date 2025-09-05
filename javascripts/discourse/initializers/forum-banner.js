import { apiInitializer } from "discourse/lib/api";
import ForumBanner from "../components/forum-banner";

export default apiInitializer("1.15.0", (api) => {
  api.renderInOutlet(settings.plugin_outlet, ForumBanner);
});