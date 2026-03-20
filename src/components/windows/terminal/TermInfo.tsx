import { useContext } from "react";
import { User, WebsiteName, Wrapper } from "./TerminalInfo.styled";
import { themeContext } from "../../../hooks/useTheme";

const TermInfo = () => {
  const themeContextValue = useContext(themeContext);
  const termUser = themeContextValue?.currentTheme.id;
  return (
    <Wrapper>
      <User>{termUser}</User>@<WebsiteName>{termUser}</WebsiteName>:~$
    </Wrapper>
  );
};

export default TermInfo;
