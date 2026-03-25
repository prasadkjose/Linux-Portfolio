import { useContext, useEffect } from "react";
import { ProjectsIntro } from "../../../../styles/Projects.styled";
import {
  Cmd,
  CmdDesc,
  CmdList,
  HelpWrapper,
} from "../../../../styles/Help.styled";
import {
  checkRedirect,
  generateTabs,
  getCurrentCmdArry,
  isArgInvalid,
} from "../../../../utils/funcs";
import { termContext } from "../TerminalContext";
import Usage from "../../../Usage";
import { PERSONAL_DATA } from "../../../../config/personalData.config";

const Socials: React.FC = () => {
  const { arg, history, rerender } = useContext(termContext);

  /* ===== get current command ===== */
  const currentCommand = getCurrentCmdArry(history);

  /* ===== check current command makes redirect ===== */
  useEffect(() => {
    if (checkRedirect(rerender, currentCommand, "socials")) {
      PERSONAL_DATA.personalInfo.socials.forEach(({ href = "" }, id) => {
        return id === parseInt(arg[1]) && window.open(href, "_blank");
      });
    }
  }, [arg, rerender, currentCommand]);

  /* ===== handle social link click ===== */
  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  /* ===== check arg is valid ===== */
  const checkArg = () =>
    isArgInvalid(arg, "go", ["1", "2", "3", "4"]) ? (
      <Usage cmd="socials" />
    ) : null;

  return arg.length > 0 || arg.length > 2 ? (
    checkArg()
  ) : (
    <HelpWrapper data-testid="socials">
      <ProjectsIntro>Here are my social links</ProjectsIntro>
      {PERSONAL_DATA.personalInfo.socials.map(({ value, href = "" }, id) => (
        <CmdList key={id}>
          <Cmd
            onClick={() => handleSocialClick(href)}
            style={{ cursor: "pointer" }}
          >
            {`${id + 1}. ${value}`}
          </Cmd>
          {generateTabs(id + 1)}
          <CmdDesc>- {href}</CmdDesc>
        </CmdList>
      ))}
      <Usage cmd="socials" marginY />
    </HelpWrapper>
  );
};

export default Socials;
