import { useContext } from "react";
import { isArgInvalid } from "../../../../utils/funcs";
import {
  ProjectContainer,
  ProjectDesc,
  ProjectTitle,
} from "../../../../styles/Projects.styled";
import { termContext } from "../TerminalContext";
import Usage from "../../../Usage";
import { PERSONAL_DATA } from "../../../../config/personalData.config";

const Projects: React.FC = () => {
  const { arg, setRerender, history, rerender } = useContext(termContext);

  /* ===== get current command ===== */
  const currentCommand = history.at(-1);

  /* ===== handle project click ===== */
  const handleProjectClick = (url?: string) => {
    window.open(url, "_blank");
    setRerender?.(false);
    return null;
  };

  /* ===== check arg is valid ===== */
  const checkArg = () =>
    isArgInvalid(arg, "go", ["1", "2", "3", "4"]) ? (
      <Usage cmd="projects" />
    ) : (
      rerender &&
      setRerender &&
      currentCommand === `projects ${arg.join(" ")}` &&
      handleProjectClick(
        PERSONAL_DATA.projects.data?.[parseInt(arg[1]) - 1].href
      )
    );

  return arg.length > 0 || arg.length > 2 ? (
    checkArg()
  ) : (
    <div data-testid="projects">
      {PERSONAL_DATA.projects.data?.map(
        ({ value, description, href = "" }, id) => (
          <ProjectContainer key={id}>
            <ProjectTitle
              onClick={() => handleProjectClick(href)}
              style={{ cursor: "pointer" }}
            >
              {`${id + 1}. ${value}`}
            </ProjectTitle>
            <ProjectDesc>{description}</ProjectDesc>
          </ProjectContainer>
        )
      )}
      <Usage cmd="projects" $marginY={true} />
    </div>
  );
};

export default Projects;
