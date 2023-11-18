import mixpanel from "mixpanel-browser";

const initializeMixPanel = () => {
  mixpanel.init(process.env.REACT_APP_MIX_PANEL_TOKEN ?? "", {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });
  mixpanel.identify("USER_ID");
};

export { initializeMixPanel, mixpanel };
