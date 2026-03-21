import { useContext, useEffect } from "react";
import { UsageDiv } from "../../../../styles/Output.styled";
import { termContext } from "../TerminalContext";

const Clear: React.FC = () => {
  const { arg, clearHistory } = useContext(termContext);
  useEffect(() => {
    if (arg.length < 1) clearHistory?.();
  }, []);
  return arg.length > 0 ? <UsageDiv>Usage: clear</UsageDiv> : <></>;
};

export default Clear;
