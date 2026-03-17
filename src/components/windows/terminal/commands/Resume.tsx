import { useContext } from "react";
import { termContext } from "../Terminal";

const Resume: React.FC = () => {
  const { history, rerender, setRerender } = useContext(termContext);
  /* ===== get current command ===== */
  const currentCommand = history.at(-1);

  /* ===== check current command makes redirect ===== */
  if (rerender && setRerender && currentCommand === "resume") {
    const pdfUrl = "/Prasad Resume - SDE.pdf"; // Ensure this file exists in public root
    window.open(pdfUrl, "_blank");
    setRerender(false);
  }

  return <span></span>;
};

export default Resume;
