import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
} from "../../../../styles/About.styled";

const About: React.FC = () => {
  return (
    <AboutWrapper data-testid="about">
      <p>
        Hi, my name is <HighlightSpan>Prasad Koshy Jose</HighlightSpan>.
      </p>
      <p>
        I'm a <HighlightAlt>Software Engineer</HighlightAlt> based in Colorado.
      </p>
      <p>I like writing code that simplifies what comes next.</p>
    </AboutWrapper>
  );
};

export default About;
