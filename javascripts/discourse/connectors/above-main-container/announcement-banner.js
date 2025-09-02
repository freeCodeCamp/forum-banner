import { getOwner } from "@ember/application";

export default {
  shouldRender(args, component) {
    const showForMembers = settings.show_for_members;
    const showForAnon = settings.show_for_anon;
    const displayOnMobile = settings.display_on_mobile;
    const displayOnDesktop = settings.display_on_desktop;
    const displayOnHomepage = settings.display_on_homepage;
    const urlMustContain = settings.url_must_contain || "";

    const isLoggedIn = !!this.currentUser;
    const isMobileDevice = this.site.isMobileDevice;

    // Check user authentication
    if (isLoggedIn && !showForMembers) return false;
    if (!isLoggedIn && !showForAnon) return false;

    // Check device type
    if (isMobileDevice && !displayOnMobile) return false;
    if (!isMobileDevice && !displayOnDesktop) return false;

    // Get current path
    const router = getOwner(this).lookup("service:router");
    const currentURL = router.get("currentURL") || "";
    const path = currentURL;

    // Check homepage display
    let showOnHomepage = false;
    if (displayOnHomepage) {
      // Homepage logic: show if URL is just "/" or has no additional path segments
      const hasSingleForwardSlash = new RegExp('[^\/]\/[^\/]');
      showOnHomepage = !hasSingleForwardSlash.test(path);
    }

    // Check URL contains patterns
    let urlMatch = false;
    if (urlMustContain && urlMustContain.length) {
      const escapedList = urlMustContain.replace(/\//g, '\\/');
      const regex = new RegExp(escapedList);
      urlMatch = regex.test(path);
    }

    return showOnHomepage || urlMatch;
  },

  setupComponent(args, component) {
    component.set("shouldShowBanner", true);
  }
};