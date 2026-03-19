import React, { useContext } from "react";
import styled from "styled-components";
import WindowContainer from "../../layout/window-container/WindowContainer";
import { WindowState } from "../../types/window";
import { themeContext } from "../../hooks/useTheme";

// Resume window with integrated PDF viewer
const Toolbar = styled.div`
  ${({ theme }) =>
    theme.backgroundImage &&
    `
    height: 36px; display:flex; align-items:center; padding: 0 12px 0 16px;
    background: rgba(24, 24, 24, 0.85);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    font-family: system-ui, -apple-system, sans-serif;
    justify-content: space-between;
    gap: 12px;
  `}
`;

const LocationBar = styled.div`
  flex: 1;
  height: 24px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: #eceff4;
  font-size: 13px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  border-radius: 6px;
  color: #eceff4;
  text-decoration: none;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.15s ease, border-color 0.15s ease,
    transform 0.1s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  &:active {
    transform: translateY(1px);
  }
`;

const Content = styled.div<{ maximized?: boolean }>`
  height: ${({ maximized }) =>
    maximized ? "calc(100vh - 32px - 36px)" : "calc(100% - 32px - 36px)"};
  overflow: hidden;
`;

const PDFContainer = styled.div`
  width: 100%;
  height: 100%;
  & iframe,
  & embed {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const resumeOSMap: Record<string, string> = {
  fedora: "/resumeCons.pdf",
  ubuntu: "/resume.pdf",
  kali: "/resumeSec.pdf",
};

const ResumeWindow: React.FC<WindowState> = props => {
  const themeContextValue = useContext(themeContext);
  let pdfUrl;
  if (themeContextValue) {
    const theme = themeContextValue.currentTheme;
    pdfUrl = resumeOSMap[theme.id];
  }

  return (
    <WindowContainer {...props} title="Resume">
      <Toolbar>
        <LocationBar>{pdfUrl}</LocationBar>
        <Actions>
          <DownloadLink href={pdfUrl} download>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M12 3v12m0 0l-4-4m4 4l4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 21h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Download
          </DownloadLink>
        </Actions>
      </Toolbar>

      <Content maximized={props.maximized}>
        <PDFContainer>
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            title="Resume PDF"
          />
        </PDFContainer>
      </Content>
    </WindowContainer>
  );
};

export default ResumeWindow;
