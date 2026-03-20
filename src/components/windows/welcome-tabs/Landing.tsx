import { TAB_CONFIGS } from "./welcomeTabs.config";
import { WindowState } from "../../../types/window";
import Tabs from "../../../layout/tabs/Tabs";
import BrowserWindow from "../../../layout/window-container/BrowserWindow";

const Landing: React.FC<WindowState> = props => {
  return (
    <BrowserWindow {...props}>
      <Tabs tabs={TAB_CONFIGS.welcome} activeTabId="home" />
    </BrowserWindow>
  );
};

export default Landing;
