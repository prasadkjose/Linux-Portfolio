import { PERSONAL_DATA } from "../../../../config/personalData.config";
import { AboutWrapper, HighlightSpan } from "../../../../styles/About.styled";

const About: React.FC = () => {
  return (
    <AboutWrapper data-testid="about">
      <p>
        Hi, my name is{" "}
        <HighlightSpan>{PERSONAL_DATA.personalInfo.name}</HighlightSpan>.
      </p>
      {PERSONAL_DATA.personalInfo.aboutMe}
    </AboutWrapper>
  );
};

export default About;
