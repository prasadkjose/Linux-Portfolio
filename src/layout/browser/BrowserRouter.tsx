import { WindowState } from "../../types/window";
import BrowserWindow from "../window-container/BrowserWindow";
import BROWSER_ROUTER_CONFIG from "./browserRouter.config";

const DEFAULT_ROUTE: string = "/home";

const BrowserRouter: React.FC<WindowState> = props => {
  const { href = DEFAULT_ROUTE } = props;

  if (href && href in BROWSER_ROUTER_CONFIG) {
    const routeConfig =
      BROWSER_ROUTER_CONFIG[href as keyof typeof BROWSER_ROUTER_CONFIG];
    const Component = routeConfig.component;

    return (
      <BrowserWindow {...{ ...props, href }}>
        {"tabs" in routeConfig ? (
          <Component
            {...props}
            tabs={routeConfig.tabs.welcome}
            activeTabId="home"
          />
        ) : (
          <Component tabs={[]} {...props} />
        )}
      </BrowserWindow>
    );
  }
  return null;
};

export default BrowserRouter;
