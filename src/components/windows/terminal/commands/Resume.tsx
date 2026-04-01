import { useContext } from "react";
import { termContext } from "../TerminalContext";
import { themeContext } from "../../../../hooks/useTheme";

const Resume: React.FC = () => {
  const { history, rerender, setRerender } = useContext(termContext);
  /* ===== get current command ===== */
  const currentCommand = history.at(-1);

  /* ===== check current command makes redirect ===== */
  if (rerender && setRerender && currentCommand === "resume") {
    const themeContextValue = useContext(themeContext);
    const pdfUrl = themeContextValue?.resumePath;

    window.open(pdfUrl, "_blank");

    setRerender(false);
  }

  return <span></span>;
};

export default Resume;
