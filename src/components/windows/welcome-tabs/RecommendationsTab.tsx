import React, { Fragment } from "react";
import styled from "styled-components";
import HighlightCard from "../../HighlightCard";
import { PERSONAL_DATA } from "../../../config/personalData.config";

const RecommendationsSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: "32px 0" @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
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

const RecommendationsTab: React.FC = () => {
  const { recommendations } = PERSONAL_DATA;

  return (
    <Fragment>
      <SectionTitle>
        {recommendations.value}
        <img
          src={PERSONAL_DATA.personalInfo.logo}
          alt={PERSONAL_DATA.personalInfo.name}
          height="35"
        />
      </SectionTitle>

      {/* Static Recommendations from config - shown when API fails or no GitHub Recommendations */}
      {recommendations.data && (
        <RecommendationsSection>
          {recommendations.data.map(data => (
            <HighlightCard
              key={data.value}
              {...{ ...data, ...{ iconSize: "80" } }}
            />
          ))}
        </RecommendationsSection>
      )}
    </Fragment>
  );
};

export default RecommendationsTab;
