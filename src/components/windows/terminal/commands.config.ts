import { PERSONAL_DATA } from "../../../config/personalData.config";

type Command = {
  cmd: string;
  desc: string;
  tab: number;
}[];

export const commands: Command = [
  { cmd: "about", desc: `about ${PERSONAL_DATA.personalInfo.name}`, tab: 8 },
  { cmd: "clear", desc: "clear the terminal", tab: 8 },
  { cmd: "echo", desc: "print out anything", tab: 9 },
  { cmd: "education", desc: "my education background", tab: 4 },
  { cmd: "email", desc: "send me an email", tab: 8 },
  { cmd: "resume", desc: "go to my resume", tab: 7 },
  { cmd: "help", desc: "check available commands", tab: 9 },
  { cmd: "history", desc: "view command history", tab: 6 },
  { cmd: "projects", desc: "view projects that I've coded", tab: 5 },
  { cmd: "pwd", desc: "print current working directory", tab: 10 },
  { cmd: "socials", desc: "check out my social accounts", tab: 6 },

  { cmd: "welcome", desc: "display hero section", tab: 6 },
  { cmd: "whoami", desc: "about current user", tab: 7 },
];

// Hidden easter-egg commands (not listed in help)
export const hiddenCommands = ["sudo", "neofetch", "uname", "ls"];
