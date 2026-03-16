import React, { Fragment } from "react";
import styled from "styled-components";
import HighlightCard from "../HighlightCard";

const LOGOS = {
  oracle: "/icons/oracle_logo_icon.png",
  unige: "/icons/unige_icon.png",
  kcg: "/icons/kcg_icon.png",
  cc: "/icons/cc_icon.png",
  cisco: "/icons/cisco_logo.jpeg",
  google: "/icons/google_logo.jpeg",
};

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
          icon={LOGOS.unige}
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
          icon={LOGOS.kcg}
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
          icon={LOGOS.oracle}
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
          icon={LOGOS.cc}
          value="Certified in Cybersecurity (CC)"
          description=""
        ></HighlightCard>

        <HighlightCard
          style={{
            background:
              "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
            border: "1px solid rgba(136, 192, 208, 0.25)",
          }}
          href="https://www.linkedin.com/in/prasadkjose/details/certifications/1760434720846/single-media-viewer/?profileId=ACoAAB-WSg8BFhA9ocldwPHzOUcHLBc8KlU816w"
          icon={LOGOS.cisco}
          value="Cisco Certified Network Associate Routing and Switching (CCNA)"
          description=""
        ></HighlightCard>

        <HighlightCard
          style={{
            background:
              "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
            border: "1px solid rgba(136, 192, 208, 0.25)",
          }}
          href="https://www.credly.com/badges/d3300737-0695-4f3b-8a47-f1a02c173559/linked_in_profile"
          icon={LOGOS.google}
          value="Cybersecurity Professional Certificate V2"
          description=""
        ></HighlightCard>

        <HighlightCard
          style={{
            background:
              "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)",
            border: "1px solid rgba(136, 192, 208, 0.25)",
          }}
          href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=E597B433A2CDB78DAD322EC617742269C6519523F78C58387CD74C3C0D91F458"
          icon={LOGOS.oracle}
          value="Oracle Cloud Infrastructure 2025 Certified Foundations Associate"
          description=""
        ></HighlightCard>
      </EducationSection>
    </Fragment>
  );
};

export default EducationTab;
