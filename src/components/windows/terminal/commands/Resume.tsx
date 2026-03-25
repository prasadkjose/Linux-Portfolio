import { useContext } from "react";
import { termContext } from "../TerminalContext";
import { themeContext } from "../../../../hooks/useTheme";
import { RESUME_OS_MAP } from "../../../../config/personalData.config";

const Resume: React.FC = () => {
  const { history, rerender, setRerender } = useContext(termContext);
  /* ===== get current command ===== */
  const currentCommand = history.at(-1);

  /* ===== check current command makes redirect ===== */
  if (rerender && setRerender && currentCommand === "resume") {
    const themeContextValue = useContext(themeContext);
    let pdfUrl;
    if (themeContextValue) {
      const theme = themeContextValue.currentTheme;
      pdfUrl = RESUME_OS_MAP[theme.id];
    }

    window.open(pdfUrl, "_blank");

    setRerender(false);
  }

  return <span></span>;
};

export default Resume;
