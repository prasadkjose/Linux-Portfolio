import React from "react";
import styled from "styled-components";
import Pill from "../../Pill";

const HeroSection = styled.section`
  display: grid;
  grid-template-columns: 120px 1fr;
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
        <ProfileImage src="/photo1.jpg" alt="Prasad Koshy Jose" />
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
          I'm a passionate Software Engineer with expertise in security, AI, and
          open source technologies. With experience across multiple industries
          including enterprise software, telecommunications, and social media
          platforms, I specialize in building robust, scalable applications that
          solve real-world problems.
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
            <p style={{ margin: 0, color: "#D8DEE9", fontSize: "0.9rem" }}>
              JavaScript, TypeScript, Python, C++
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
            <p style={{ margin: 0, color: "#D8DEE9", fontSize: "0.9rem" }}>
              ReactJS, Node.js, ViteJS, Styled Components,
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
            <p style={{ margin: 0, color: "#D8DEE9", fontSize: "0.9rem" }}>
              OWASP, Authentication, Authorization, Cryptography
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
            <p style={{ margin: 0, color: "#D8DEE9", fontSize: "0.9rem" }}>
              OCI, AWS, Docker, CI/CD, Git
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeTab;
