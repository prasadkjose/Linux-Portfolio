import React, { Fragment } from "react";
import styled from "styled-components";
import HighlightCard from "../HighlightCard";

const EducationSection = styled.section`
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

const EducationTab: React.FC = () => {
  return (
    <Fragment>
      <SectionTitle>Education</SectionTitle>
      <EducationSection>
        {/* Highlight cards */}
        <HighlightCard
          style={{
            background:
              "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
            border: "1px solid rgba(136, 192, 208, 0.25)",
          }}
          href="https://www.unige.ch/en/"
          icon="/icons/unige_icon.png"
          value="University of Geneva"
          description="Master of Science in Computer Science"
        ></HighlightCard>

        <HighlightCard
          style={{
            background:
              "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
            border: "1px solid rgba(136, 192, 208, 0.25)",
          }}
          href="https://kcgcollege.ac.in/"
          icon="/icons/kcg_icon.png"
          value="KCG College of Technology."
          description="Bachelor of Engineering in Computer Science"
        ></HighlightCard>
      </EducationSection>
      <SectionTitle>Certifications</SectionTitle>
      <EducationSection>
        {/* Highlight cards */}
        <HighlightCard
          style={{
            background:
              "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
            border: "1px solid rgba(136, 192, 208, 0.25)",
          }}
          href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=F7205E65616E645F16A6220755EA13B7195912847F8B983177DEB197B23DE1A2#"
          icon="/icons/oracle_logo_icon.png"
          value="Oracle Cloud Infrastructure 2025 Certified Generative AI Professional"
          description=""
        ></HighlightCard>

        <HighlightCard
          style={{
            background:
              "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
            border: "1px solid rgba(136, 192, 208, 0.25)",
          }}
          href="https://www.credly.com/badges/59e7baf1-9bd9-4828-94d3-b5be723ca045/linked_in_profile"
          icon="/icons/cc_icon.png"
          value="Certified in Cybersecurity (CC)"
          description=""
        ></HighlightCard>
      </EducationSection>
    </Fragment>
  );
};

export default EducationTab;
