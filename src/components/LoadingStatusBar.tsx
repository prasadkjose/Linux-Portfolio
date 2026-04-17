import { useState, useEffect } from "react";

const LOADING_STATES = [
  "Initializing Resources",
  "Configuring Database Connection",
  "Loading Application Assets",
  "Establishing Secure Session",
  "Preparing User Interface",
];

const LoadingStatusBar = () => {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStateIndex(prev => (prev + 1) % LOADING_STATES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Status Bar - Loading Indicator */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "32px",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "13px",
          color: "#555",
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Green Success Pulse Indicator */}
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "#22c55e",
              borderRadius: "50%",
              animation: "pulse 1.5s ease-in-out infinite",
              boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.7)",
            }}
          />
          <span>Active</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginLeft: "auto",
            color: "#888",
            fontSize: "11px",
          }}
        >
          {LOADING_STATES[currentStateIndex]}
          <div
            style={{
              width: "12px",
              height: "12px",
              border: "2px solid #ccc",
              borderTopColor: "#2563eb",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
          }
          
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }
      `}</style>
    </>
  );
};

export default LoadingStatusBar;
