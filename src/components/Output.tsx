import About from "./windows/terminal/commands/About";
import Clear from "./windows/terminal/commands/Clear";
import Echo from "./windows/terminal/commands/Echo";
import Education from "./windows/terminal/commands/Education";
import Email from "./windows/terminal/commands/Email";
import GeneralOutput from "./windows/terminal/commands/GeneralOutput";
import Resume from "./windows/terminal/commands/Resume";
import Help from "./windows/terminal/commands/Help";
import Welcome from "./windows/terminal/commands/Welcome";
import History from "./windows/terminal/commands/History";
import Projects from "./windows/terminal/commands/Projects";
import Socials from "./windows/terminal/commands/Socials";
import { OutputContainer, UsageDiv } from "../styles/Output.styled";
import { termContext } from "./windows/terminal/Terminal";
import { useContext } from "react";

type Props = {
  index: number;
  cmd: string;
};

const Output: React.FC<Props> = ({ index, cmd }) => {
  const { arg } = useContext(termContext);

  const specialCmds = ["projects", "socials", "echo"];

  // return 'Usage: <cmd>' if command arg is not valid
  // eg: about tt
  if (!specialCmds.includes(cmd) && arg.length > 0)
    return <UsageDiv data-testid="usage-output">Usage: {cmd}</UsageDiv>;

  // hidden easter eggs
  if (cmd === "sudo") {
    const full = ["sudo", ...arg].join(" ");
    return (
      <OutputContainer>
        <GeneralOutput>{full}: command not found</GeneralOutput>
        <GeneralOutput>
          Hint: sudo: unable to resolve host linux: Name or service not known
        </GeneralOutput>
        <GeneralOutput>Hint: you are already root</GeneralOutput>
      </OutputContainer>
    );
  }
  if (cmd === "neofetch") {
    return (
      <OutputContainer>
        <GeneralOutput>{`Linux 2026.2 \n Kernel: 6.5.0-linux-amd64 \n Shell: bash 5.2.15 \n Resolution: 1920x1080 \n DE: XFCE \n WM: Xfwm4 \n CPU: Intel i7-9750H (12) @ 4.5GHz \n Memory: 2.1GiB / 16GiB`}</GeneralOutput>
      </OutputContainer>
    );
  }
  if (cmd === "uname") {
    return (
      <OutputContainer>
        <GeneralOutput>Linux</GeneralOutput>
      </OutputContainer>
    );
  }
  if (cmd === "ls") {
    return (
      <OutputContainer>
        <GeneralOutput>
          Desktop Documents Downloads Music Pictures Public Templates Videos
        </GeneralOutput>
      </OutputContainer>
    );
  }

  return (
    <OutputContainer data-testid={index === 0 ? "latest-output" : null}>
      {
        {
          about: <About />,
          clear: <Clear />,
          echo: <Echo />,
          education: <Education />,
          email: <Email />,
          resume: <Resume />,
          help: <Help />,
          history: <History />,
          projects: <Projects />,
          pwd: <GeneralOutput>/home/prasadkjose</GeneralOutput>,
          socials: <Socials />,
          welcome: <Welcome />,
          whoami: <GeneralOutput>linux</GeneralOutput>,
        }[cmd]
      }
    </OutputContainer>
  );
};

export default Output;
