import { useContext, useEffect } from "react";
import {
  checkRedirect,
  getCurrentCmdArry,
  isArgInvalid,
} from "../../../utils/funcs";
import {
  ProjectContainer,
  ProjectDesc,
  ProjectTitle,
} from "../../../styles/Projects.styled";
import { termContext } from "../Terminal";
import Usage from "../../Usage";

const Projects: React.FC = () => {
  const { arg, history, rerender } = useContext(termContext);

  /* ===== get current command ===== */
  const currentCommand = getCurrentCmdArry(history);

  /* ===== check current command is redirect ===== */
  useEffect(() => {
    if (checkRedirect(rerender, currentCommand, "projects")) {
      projects.forEach(({ id, url }) => {
        id === parseInt(arg[1]) && window.open(url, "_blank");
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
      {projects.map(({ id, title, desc, url }) => (
        <ProjectContainer key={id}>
          <ProjectTitle
            onClick={() => handleProjectClick(id, url)}
            style={{ cursor: "pointer" }}
          >
            {`${id}. ${title}`}
          </ProjectTitle>
          <ProjectDesc>{desc}</ProjectDesc>
        </ProjectContainer>
      ))}
      <Usage cmd="projects" marginY />
    </div>
  );
};

const projects = [
  {
    id: 1,
    title: "Confidential Computing of Machine Learning using Intel SGX",
    desc: "A TEE-based application to securely upload and train multiparty data-sets with confidential computing.",
    url: "https://github.com/prasadkjose/confidential-ml-sgx",
  },
  {
    id: 2,
    title: "OrganizeIt",
    desc: "A Python-based utility to help users automate the organization of their file system.",
    url: "https://github.com/prasadkjose/OrganizeIt",
  },
  {
    id: 3,
    title: "Practice Coding",
    desc: "A lightweight local setup for practicing coding problems in Python, TypeScript, and C++ without logging into LeetCode or any online judge.",
    url: "https://github.com/prasadkjose/coding",
  },
];

export default Projects;
