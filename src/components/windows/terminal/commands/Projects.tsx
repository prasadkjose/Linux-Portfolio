import { useContext, useEffect } from "react";
import {
  checkRedirect,
  getCurrentCmdArry,
  isArgInvalid,
} from "../../../../utils/funcs";
import {
  ProjectContainer,
  ProjectDesc,
  ProjectTitle,
} from "../../../../styles/Projects.styled";
import { termContext } from "../TerminalContext";
import Usage from "../../../Usage";
import { PERSONAL_DATA } from "../../../../config/personalData.config";

const Projects: React.FC = () => {
  const { arg, history, rerender } = useContext(termContext);

  /* ===== get current command ===== */
  const currentCommand = getCurrentCmdArry(history);

  /* ===== check current command is redirect ===== */
  useEffect(() => {
    if (checkRedirect(rerender, currentCommand, "projects")) {
      PERSONAL_DATA.projects.data?.forEach(({ href }, id) => {
        return id === parseInt(arg[1]) && window.open(href, "_blank");
      });
    }
  }, [arg, rerender, currentCommand]);

  /* ===== handle project click ===== */
  const handleProjectClick = (id: number, url: string) => {
    window.open(url, "_blank");
  };

  /* ===== check arg is valid ===== */
  const checkArg = () =>
    isArgInvalid(arg, "go", ["1", "2", "3", "4"]) ? (
      <Usage cmd="projects" />
    ) : null;

  return arg.length > 0 || arg.length > 2 ? (
    checkArg()
  ) : (
    <div data-testid="projects">
      {PERSONAL_DATA.projects.data?.map(
        ({ value, description, href = "" }, id) => (
          <ProjectContainer key={id}>
            <ProjectTitle
              onClick={() => handleProjectClick(id, href)}
              style={{ cursor: "pointer" }}
            >
              {`${id + 1}. ${value}`}
            </ProjectTitle>
            <ProjectDesc>{description}</ProjectDesc>
          </ProjectContainer>
        )
      )}
      <Usage cmd="projects" marginY />
    </div>
  );
};

export default Projects;
