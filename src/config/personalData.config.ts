import { PersonalData } from "../types/personalData";

const LOGOS = {
  oracle: "/icons/oracle_logo_icon.png",
  unige: "/icons/unige_icon.png",
  kcg: "/icons/kcg_icon.png",
  cc: "/icons/cc_icon.png",
  cisco: "/icons/cisco_logo.jpeg",
  google: "/icons/google_logo.jpeg",
};

export const RESUME_OS_MAP: Record<string, string> = {
  fedora: "/resumeCons.pdf",
  ubuntu: "/resume.pdf",
  kali: "/resumeSec.pdf",
};

export const PERSONAL_DATA: PersonalData = {
  personalInfo: {
    name: "Prasad Koshy Jose",
    title: "Software Engineer | Security | AI | Open Source",
    profileImage: "/photo1.jpg",
    url: "prasadkjose.com",
    uname: "prasadkjose",
    aboutMe:
      "I'm a Software Engineer based in Colorado. \n I like writing code that simplifies what comes next.",
    aboutDescription: `Software Engineer offering five years of experience designing,
        implementing, and optimizing secure software and web applications in
        languages like JavaScript, Python, and C++. This is supported by a
        Master's degree in Computer Science from the University of Geneva,
        Switzerland and a Bachelor's of Engineering degree in Computer
        Science. Experience in working with globally distributed teams, across
        startups and Fortune 500 companies, programming with latest
        technological stack and cloud services, delivering with agile
        methodology on schedule.`,
    socials: [
      {
        value: "LinkedIn",
        href: "https://github.com/prasadkjose",
      },
      {
        value: "GitHub",
        href: "https://www.linkedin.com/in/prasadkjose",
      },
      {
        value: "Blog",
        href: "https://dev.to/prasadkjose",
      },
    ],
  },
  quickLinks: [
    {
      href: "https://github.com/prasadkjose",
      value: "GitHub",
      style: {
        color: "#88C0D0",
        background: "rgba(136, 192, 208, 0.15)",
        border: "1px solid rgba(136,192,208,0.35)",
      },
    },
    {
      href: "https://www.linkedin.com/in/prasadkjose",
      value: "LinkedIn",
      style: {
        color: "#A3BE8C",
        background: "rgba(163, 190, 140, 0.15)",
        border: "1px solid rgba(163,190,140,0.35)",
      },
    },
    {
      href: "https://facebook.com/prasadkjose",
      value: "Facebook",
      style: {
        color: "#81A1C1",
        background: "rgba(129, 161, 193, 0.15)",
        border: "1px solid rgba(129,161,193,0.35)",
      },
    },
    {
      href: "https://dev.to/prasadkjose",
      value: "Blog",
      style: {
        color: "#B48EAD",
        background: "rgba(180, 142, 173, 0.15)",
        border: "1px solid rgba(180,142,173,0.35)",
      },
    },
    {
      href: "", // Will be set dynamically based on theme
      value: "Resume",
      style: {
        color: "#EBCB8B",
        background: "rgba(235, 203, 139, 0.15)",
        border: "1px solid rgba(235,203,139,0.35)",
      },
    },
  ],
  skillsOverview: {
    value: "Technical Skills",
  },
  experience: {
    value: "Professional Experience",
    description: `I've had the opportunity to work with amazing companies across different
        industries, gaining diverse experience in software development,
        security, and system architecture.`,
    data: [
      {
        href: "https://www.linkedin.com/in/prasadkjose",
        icon: "/icons/oracle_logo_icon.png",
        value: "Oracle Corp.",
        description: `Built enterprise features using JavaScript/TypeScript, REST APIs & OCI services.
            Implemented secure data models using Oracle BOSS metadata.
            Integrated third-party services and cloud APIs in Visual Builder platform.`,
      },
      {
        href: "https://www.linkedin.com/in/prasadkjose",
        icon: "/icons/emplifi_icon.jpg",
        value: "Emplifi Sro.",
        description: `Built social media integrations using JavaScript, ElasticSearch, REST APIs.
            Developed frontend features for multimedia support and platform engagement.
            Collaborated across teams to deliver scalable customer-facing web features.`,
      },
      {
        href: "https://www.linkedin.com/in/prasadkjose",
        icon: "/icons/olympe_icon.jpeg",
        value: "Olympe SA",
        description: `Developed hybrid apps using JavaScript and blockchain frameworks.
            Built modular backend services and REST API integrations.
            Prototyped logistics solutions with distributed ledger technologies.`,
      },
      {
        href: "https://www.linkedin.com/in/prasadkjose",
        icon: "/icons/nokia_icon.jpeg",
        value: "Nokia Networks and Solutions",
        description: `Developed SMT fault monitoring tools using Python and Linux.
            Automated factory diagnostics and production issue detection.
            Collaborated with hardware teams on industrial reliability systems.`,
      },
    ],
  },
  achievements: {
    value: "Key Achievements",
    data: [
      {
        value: "Enterprise Solutions",
        description:
          "Delivered scalable enterprise applications serving thousands of users across multiple industries.",
      },
      {
        value: "Security Focus",
        description:
          "Implemented security best practices and data protection measures in all applications.",
      },
      {
        value: "Cross-Platform",
        description:
          "Developed applications for web, mobile, and enterprise environments.",
      },
    ],
  },
  education: {
    value: "Education",
    data: [
      {
        href: "https://www.unige.ch/en/",
        icon: LOGOS.unige,
        value: "University of Geneva",
        description: "Master of Science in Computer Science",
      },
      {
        href: "https://kcgcollege.ac.in/",
        icon: LOGOS.kcg,
        value: "KCG College of Technology",
        description: "Bachelor of Engineering in Computer Science",
      },
    ],
  },
  certifications: {
    value: "Certifications",
    data: [
      {
        href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=F7205E65616E645F16A6220755EA13B7195912847F8B983177DEB197B23DE1A2#",
        icon: "/icons/oracle_logo_icon.png",
        value:
          "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      },
      {
        href: "https://www.credly.com/badges/59e7baf1-9bd9-4828-94d3-b5be723ca045/linked_in_profile",
        icon: "/icons/cc_icon.png",
        value: "Certified in Cybersecurity (CC)",
      },
      {
        href: "https://www.linkedin.com/in/prasadkjose/details/certifications/1760434720846/single-media-viewer/?profileId=ACoAAB-WSg8BFhA9ocldwPHzOUcHLBc8KlU816w",
        icon: "/icons/cisco_logo.jpeg",
        value: "Cisco Certified Network Associate Routing and Switching (CCNA)",
      },
      {
        href: "https://www.credly.com/badges/d3300737-0695-4f3b-8a47-f1a02c173559/linked_in_profile",
        icon: "/icons/google_logo.jpeg",
        value: "Cybersecurity Professional Certificate V2",
      },
      {
        href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=E597B433A2CDB78DAD322EC617742269C6519523F78C58387CD74C3C0D91F458",
        icon: "/icons/oracle_logo_icon.png",
        value:
          "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
      },
    ],
  },
};
