import React, { Fragment } from "react";
import styled from "styled-components";
import HighlightCard from "../../HighlightCard";
import { PERSONAL_DATA } from "../../../config/personalData.config";

const ProjectsSection = styled.section`
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

const ProjectsTab: React.FC = () => {
  const { projects } = PERSONAL_DATA;
  return (
    <Fragment>
      <SectionTitle>{projects.value}</SectionTitle>
      <ProjectsSection>
        {projects.data?.map(data => (
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
      </ProjectsSection>
    </Fragment>
  );
};

export default ProjectsTab;
