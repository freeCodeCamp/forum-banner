import Component from "@glimmer/component";
import { service } from "@ember/service";
import htmlSafe from "discourse/helpers/html-safe";
import { defaultHomepage } from "discourse/lib/utilities";

export default class ForumBanner extends Component {
  @service router;
  @service currentUser;

  get displayForUser() {
    return (
      (settings.show_for_members && this.currentUser) ||
      (settings.show_for_anon && !this.currentUser)
    );
  }

  get showOnRoute() {
    const path = this.router.currentURL;

    if (
      settings.display_on_homepage &&
      this.router.currentRouteName === `discovery.${defaultHomepage()}`
    ) {
      return true;
    }

    if (settings.url_must_contain.length) {
      const allowedPaths = settings.url_must_contain.split("|");
      return allowedPaths.some((allowedPath) => {
        if (allowedPath.slice(-1) === "*") {
          return path.indexOf(allowedPath.slice(0, -1)) === 0;
        }
        return path.includes(allowedPath);
      });
    }

    return false;
  }

  get shouldShow() {
    return this.displayForUser && this.showOnRoute;
  }

  <template>
    {{#if this.shouldShow}}
      <div class="banner-box">
        <div class="container">
          <div id="banner-content_wrap">
            <div class="row">
              {{htmlSafe settings.banner_content}}
            </div>
          </div>
        </div>
      </div>
    {{/if}}
  </template>
}