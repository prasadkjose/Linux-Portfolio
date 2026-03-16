import { User, WebsiteName, Wrapper } from "./TerminalInfo.styled";

const TermInfo = () => {
  return (
    <Wrapper>
      <User>linux</User>@<WebsiteName>linux</WebsiteName>:~$
    </Wrapper>
  );
};

export default TermInfo;
