import React, { Fragment } from "react";
import styled from "styled-components";
import HighlightCard from "../../HighlightCard";
import { PERSONAL_DATA } from "../../../config/personalData.config";

const EducationSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 32px 0;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 16px 0;
  font-size: 1.5rem;
  color: #99ddcc;
  font-weight: 600;
  border-bottom: 2px solid rgba(136, 192, 208, 0.3);
  padding-bottom: 8px;
`;

const EducationTab: React.FC = () => {
  const { education, certifications } = PERSONAL_DATA;
  return (
    <Fragment>
      <SectionTitle>
        {education.value}
        <img
          src={PERSONAL_DATA.personalInfo.logo}
          alt={PERSONAL_DATA.personalInfo.name}
          height="35"
        />
      </SectionTitle>
      <EducationSection>
        {education.data?.map(data => (
          <HighlightCard key={data.value} {...data}></HighlightCard>
        ))}
      </EducationSection>
      <SectionTitle>Certifications</SectionTitle>
      <EducationSection>
        {certifications.data?.map(data => (
          <HighlightCard key={data.value} {...data}></HighlightCard>
        ))}
      </EducationSection>
    </Fragment>
  );
};

export default EducationTab;
