import templateOnly from "@ember/component/template-only";

export default Object.assign(templateOnly(), {
  shouldRender(outletArgs, helper) {
    // Get current path
    const path = window.location.pathname;
    
    // Simple URL filtering - show on homepage, categories, and topics
    const isHomepage = path === "/" || path === "";
    const hasCategories = path.includes("/c/");
    const hasTopics = path.includes("/t/");
    
    return isHomepage || hasCategories || hasTopics;
  }
});