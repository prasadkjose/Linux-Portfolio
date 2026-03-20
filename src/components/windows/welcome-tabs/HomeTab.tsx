import React from "react";
import styled from "styled-components";
import Pill from "../../Pill";
import { PreImg } from "../../../styles/Welcome.styled";
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

const HeroSection = styled.section`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 24px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NameHeading = styled.h1`
  margin: 0;
  font-size: 2.2rem;
  background: linear-gradient(135deg, #88c0d0 0%, #5e81ac 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const TitleText = styled.p`
  margin: 6px 0 0 0;
  font-size: 1.05rem;
  color: #d8dee9;
  opacity: 0.95;
`;

const QuickLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
`;

const HomeTab: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <PreImg>
          <ProfileImage src="/photo1.jpg" alt="Prasad Koshy Jose" />
        </PreImg>
        <HeroContent>
          <NameHeading>Prasad Koshy Jose</NameHeading>
          <TitleText>Software Engineer | Security | AI | Open Source</TitleText>
          <QuickLinks role="group" aria-label="Quick links">
            <Pill
              href="https://github.com/prasadkjose"
              value="GitHub"
              style={{
                color: "#88C0D0",
                background: "rgba(136, 192, 208, 0.15)",
                border: "1px solid rgba(136,192,208,0.35)",
              }}
            />
            <Pill
              href="https://www.linkedin.com/in/prasadkjose"
              value="LinkedIn"
              style={{
                color: "#A3BE8C",
                background: "rgba(163, 190, 140, 0.15)",
                border: "1px solid rgba(163,190,140,0.35)",
              }}
            />
            <Pill
              href="https://facebook.com/prasadkjose"
              value="Facebook"
              style={{
                color: "#81A1C1",
                background: "rgba(129, 161, 193, 0.15)",
                border: "1px solid rgba(129,161,193,0.35)",
              }}
            />
            <Pill
              href="https://dev.to/prasadkjose"
              value="Blog"
              style={{
                color: "#B48EAD",
                background: "rgba(180, 142, 173, 0.15)",
                border: "1px solid rgba(180,142,173,0.35)",
              }}
            />
            <Pill
              href="/Prasad Resume - SDE.pdf"
              value="Resume"
              style={{
                color: "#EBCB8B",
                background: "rgba(235, 203, 139, 0.15)",
                border: "1px solid rgba(235,203,139,0.35)",
              }}
            />
          </QuickLinks>
        </HeroContent>
      </HeroSection>

      {/* Introduction */}
      <section style={{ marginBottom: "24px" }}>
        <h2
          style={{
            margin: "0 0 12px 0",
            fontSize: "1.5rem",
            color: "#88C0D0",
            fontWeight: 600,
          }}
        >
          About Me
        </h2>
        <p
          style={{
            margin: 0,
            lineHeight: "1.6",
            color: "#D8DEE9",
            fontSize: "1rem",
          }}
        >
          Software Engineer offering five years of experience designing,
          implementing, and optimizing secure software and web applications in
          languages like JavaScript, Python, and C++. This is supported by a
          Master’s degree in Computer Science from the University of Geneva,
          Switzerland and a Bachelor's of Engineering degree in Computer
          Science. Experience in working with globally distributed teams, across
          startups and Fortune 500 companies, programming with latest
          technological stack and cloud services, delivering with agile
          methodology on schedule.
        </p>
      </section>

      {/* Skills Overview */}
      <section>
        <h2
          style={{
            margin: "0 0 12px 0",
            fontSize: "1.5rem",
            color: "#88C0D0",
            fontWeight: 600,
          }}
        >
          Technical Skills
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(136, 192, 208, 0.1)",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(136, 192, 208, 0.25)",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "1rem",
                color: "#88C0D0",
              }}
            >
              Languages
            </h3>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                margin: 0,
                color: "#D8DEE9",
                fontSize: "1.5rem",
              }}
            >
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <IoLogoJavascript />
              </a>
              <a
                href="https://www.typescriptlang.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <BiLogoTypescript />
              </a>
              <a
                href="https://www.python.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <FaPython />
              </a>
              <a
                href="https://isocpp.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <TbBrandCpp />
              </a>
            </p>
          </div>
          <div
            style={{
              background: "rgba(163, 190, 140, 0.1)",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(163, 190, 140, 0.25)",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "1rem",
                color: "#A3BE8C",
              }}
            >
              Frameworks
            </h3>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                margin: 0,
                color: "#D8DEE9",
                fontSize: "1.5rem",
              }}
            >
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <GrReactjs />
              </a>
              <a
                href="https://nodejs.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <FaNodeJs />
              </a>
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <TbBrandNextjs />
              </a>
              <a
                href="https://styled-components.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <SiStyledcomponents />
              </a>
            </p>
          </div>
          <div
            style={{
              background: "rgba(129, 161, 193, 0.1)",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(129, 161, 193, 0.25)",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "1rem",
                color: "#81A1C1",
              }}
            >
              Security
            </h3>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                margin: 0,
                color: "#D8DEE9",
                fontSize: "1.5rem",
              }}
            >
              <a
                href="https://owasp.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <SiOwasp />
              </a>
              <a
                href="https://oauth.net/2/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <TbBrandOauth />
              </a>
              <a
                href="https://www.ssl.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <FaExpeditedssl />
              </a>
              <a
                href="https://www.kali.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <SiKalilinux />
              </a>
            </p>
          </div>
          <div
            style={{
              background: "rgba(180, 142, 173, 0.1)",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(180, 142, 173, 0.25)",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "1rem",
                color: "#B48EAD",
              }}
            >
              Cloud & DevOps
            </h3>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                margin: 0,
                color: "#D8DEE9",
                fontSize: "1.5rem",
              }}
            >
              <a
                href="https://www.oracle.com/cloud/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <GrOracle />
              </a>
              <a
                href="https://aws.amazon.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <FaAws />
              </a>
              <a
                href="https://www.docker.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <FaDocker />
              </a>
              <a
                href="https://git-scm.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <FaGitAlt />
              </a>
              <a
                href="https://www.jenkins.io/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <FaJenkins />
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeTab;
