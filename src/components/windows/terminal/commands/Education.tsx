import { EduIntro, EduList } from "../../../../styles/Education.styled";
import { Wrapper } from "../../../../styles/Output.styled";

const Education: React.FC = () => {
  return (
    <Wrapper data-testid="education">
      <EduIntro>Education:</EduIntro>
      {eduBg.map(({ title, desc }) => (
        <EduList key={title}>
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
        </EduList>
      ))}
    </Wrapper>
  );
};

const eduBg = [
  {
    title: "Master of Science in Computer Science",
    desc: "University of Geneva | 2018 - 2020",
  },
  {
    title: "Bachelor of Engineering in Computer Science",
    desc: "KCG College of Technology | 2014 - 2018",
  },
];

export default Education;
