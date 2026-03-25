import React from "react";
import styled from "styled-components";
import HighlightCard from "../../HighlightCard";
import { PERSONAL_DATA } from "../../../config/personalData.config";

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
  const { experience, achievements } = PERSONAL_DATA;
  return (
    <div>
      <SectionTitle>{experience.value}</SectionTitle>
      <ExperienceDescription>{experience.description}</ExperienceDescription>
      <ExperienceSection>
        {/* Highlight cards */}
        {experience.data?.map(data => (
          <HighlightCard
            key={data.value}
            style={{
              background:
                "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
              border: "1px solid rgba(136, 192, 208, 0.25)",
            }}
            {...data}
          ></HighlightCard>
        ))}
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
          {achievements.value}
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "12px",
          }}
        >
          {achievements.data?.map(data => (
            <div
              key={data.value}
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
                {data.value}
              </h4>
              <p style={{ margin: 0, color: "#D8DEE9", fontSize: "0.85rem" }}>
                {data.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExperienceTab;
