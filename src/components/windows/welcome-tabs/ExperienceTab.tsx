import React from "react";
import styled from "styled-components";
import HighlightCard from "../../HighlightCard";

const ExperienceSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 1.5rem;
  color: #88c0d0;
  font-weight: 600;
  border-bottom: 2px solid rgba(136, 192, 208, 0.3);
  padding-bottom: 8px;
`;

const ExperienceDescription = styled.p`
  margin: 0 0 20px 0;
  color: #d8dee9;
  line-height: 1.6;
  font-size: 1rem;
`;

const ExperienceTab: React.FC = () => {
  return (
    <div>
      <SectionTitle>Professional Experience</SectionTitle>
      <ExperienceDescription>
        I've had the opportunity to work with amazing companies across different
        industries, gaining diverse experience in software development,
        security, and system architecture.
      </ExperienceDescription>

      <ExperienceSection>
        {/* Highlight cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "6px",
          }}
        >
          <HighlightCard
            style={{
              background:
                "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
              border: "1px solid rgba(136, 192, 208, 0.25)",
            }}
            href="https://www.linkedin.com/in/prasadkjose"
            icon="/icons/oracle_logo_icon.png"
            value="Oracle Corp."
            description="
            Built enterprise features using JavaScript/TypeScript, REST APIs & OCI services.
            Implemented secure data models using Oracle BOSS metadata.
            Integrated third-party services and cloud APIs in Visual Builder platform"
          ></HighlightCard>

          <HighlightCard
            style={{
              background:
                "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
              border: "1px solid rgba(136, 192, 208, 0.25)",
            }}
            href="https://www.linkedin.com/in/prasadkjose"
            icon="/icons/emplifi_icon.jpg"
            value="Emplifi Sro."
            description="Built social media integrations using JavaScript, ElasticSearch, REST APIs
            Developed frontend features for multimedia support and platform engagement.
            Collaborated across teams to deliver scalable customer-facing web features"
          ></HighlightCard>

          <HighlightCard
            style={{
              background:
                "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
              border: "1px solid rgba(136, 192, 208, 0.25)",
            }}
            href="https://www.linkedin.com/in/prasadkjose"
            icon="/icons/olympe_icon.jpeg"
            value="Olympe SA"
            description="
            Developed hybrid apps using JavaScript and blockchain frameworks
            Built modular backend services and REST API integrations
            Prototyped logistics solutions with distributed ledger technologies"
          ></HighlightCard>

          <HighlightCard
            style={{
              background:
                "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
              border: "1px solid rgba(136, 192, 208, 0.25)",
            }}
            href="https://www.linkedin.com/in/prasadkjose"
            icon="/icons/nokia_icon.jpeg"
            value="Nokia Networks and Solutions"
            description="
            Developed SMT fault monitoring tools using Python and Linux
            Automated factory diagnostics and production issue detection
            Collaborated with hardware teams on industrial reliability systems"
          ></HighlightCard>
        </div>
      </ExperienceSection>

      {/* Additional Experience Info */}
      <section style={{ marginTop: "32px" }}>
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: "1.2rem",
            color: "#A3BE8C",
            fontWeight: 600,
          }}
        >
          Key Achievements
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "12px",
          }}
        >
          <div
            style={{
              background: "rgba(163, 190, 140, 0.1)",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(163, 190, 140, 0.25)",
            }}
          >
            <h4
              style={{
                margin: "0 0 6px 0",
                fontSize: "0.9rem",
                color: "#A3BE8C",
              }}
            >
              Enterprise Solutions
            </h4>
            <p style={{ margin: 0, color: "#D8DEE9", fontSize: "0.85rem" }}>
              Delivered scalable enterprise applications serving thousands of
              users across multiple industries.
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
            <h4
              style={{
                margin: "0 0 6px 0",
                fontSize: "0.9rem",
                color: "#81A1C1",
              }}
            >
              Security Focus
            </h4>
            <p style={{ margin: 0, color: "#D8DEE9", fontSize: "0.85rem" }}>
              Implemented security best practices and data protection measures
              in all applications.
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
            <h4
              style={{
                margin: "0 0 6px 0",
                fontSize: "0.9rem",
                color: "#B48EAD",
              }}
            >
              Cross-Platform
            </h4>
            <p style={{ margin: 0, color: "#D8DEE9", fontSize: "0.85rem" }}>
              Developed applications for web, mobile, and enterprise
              environments.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperienceTab;
