import { GrReactjs, GrOracle } from "react-icons/gr";
import { IoLogoJavascript } from "react-icons/io5";
import {
  FaPython,
  FaNodeJs,
  FaExpeditedssl,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaJenkins,
} from "react-icons/fa";
import { TbBrandCpp, TbBrandNextjs, TbBrandOauth } from "react-icons/tb";
import { SiStyledcomponents, SiOwasp, SiKalilinux } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { IconType } from "react-icons";

interface Skill {
  icon: IconType;
  href: string;
  label: string;
}
interface Skills {
  [type: string]: Skill[];
}
export const SKILL_DETAILS_MAP: Skills = {
  Languages: [
    {
      icon: IoLogoJavascript,
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      label: "JavaScript",
    },
    {
      icon: BiLogoTypescript,
      href: "https://www.typescriptlang.org/",
      label: "TypeScript",
    },
    {
      icon: FaPython,
      href: "https://www.python.org/",
      label: "Python",
    },
    {
      icon: TbBrandCpp,
      href: "https://isocpp.org/",
      label: "C++",
    },
  ],
  Frameworks: [
    {
      icon: GrReactjs,
      href: "https://react.dev/",
      label: "React",
    },
    {
      icon: FaNodeJs,
      href: "https://nodejs.org/",
      label: "Node.js",
    },
    {
      icon: TbBrandNextjs,
      href: "https://nextjs.org/",
      label: "Next.js",
    },
    {
      icon: SiStyledcomponents,
      href: "https://styled-components.com/",
      label: "Styled Components",
    },
  ],
  Security: [
    {
      icon: SiOwasp,
      href: "https://owasp.org/",
      label: "OWASP",
    },
    {
      icon: TbBrandOauth,
      href: "https://oauth.net/2/",
      label: "OAuth",
    },
    {
      icon: FaExpeditedssl,
      href: "https://www.ssl.com/",
      label: "SSL/TLS",
    },
    {
      icon: SiKalilinux,
      href: "https://www.kali.org/",
      label: "Kali Linux",
    },
  ],
  "Cloud & DevOps": [
    {
      icon: GrOracle,
      href: "https://www.oracle.com/cloud/",
      label: "Oracle Cloud",
    },
    {
      icon: FaAws,
      href: "https://aws.amazon.com/",
      label: "AWS",
    },
    {
      icon: FaDocker,
      href: "https://www.docker.com/",
      label: "Docker",
    },
    {
      icon: FaGitAlt,
      href: "https://git-scm.com/",
      label: "Git",
    },
    {
      icon: FaJenkins,
      href: "https://www.jenkins.io/",
      label: "Jenkins",
    },
  ],
};
