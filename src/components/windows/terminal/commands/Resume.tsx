import { useContext } from "react";
import { termContext } from "../Terminal";

const Resume: React.FC = () => {
  const { history, rerender } = useContext(termContext);
  /* ===== get current command ===== */
  const currentCommand = history.at(-1);

  /* ===== check current command makes redirect ===== */
  if (rerender && currentCommand === "resume") {
    const pdfUrl = "/Prasad Resume - SDE.pdf"; // Ensure this file exists in public root

    window.open(pdfUrl, "_blank");
  }

  return <span></span>;
};

export default Resume;
