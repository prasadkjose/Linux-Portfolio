import { useState, useEffect } from "react";
import { getDatabaseStatus } from "../services/databaseService";
import logger from "../utils/logger";

type LoadingState = {
  label: string;
  onStateLoad?: () => void;
};

const LOADING_STATES: LoadingState[] = [
  {
    label: "Initializing Resources",
  },
  {
    label: "Configuring Database Connection",
    onStateLoad: async () => {
      logger.log("Establishing database connection...");
      try {
        const status = await getDatabaseStatus();
        // Log connection info WITHOUT exposing user credentials
        logger.log(`Database connection status:, {
          configured: ${status.configured},
          host: ${status.host},
          port: ${status.port},
          database: ${status.database},
          poolerType: ${status.poolerType},
          region: ${status.region},
          timestamp: ${status.timestamp}
        }`);
      } catch (error) {
        logger.error(`Failed to get database status: ${error}`);
      }
    },
  },
  {
    label: "Loading Application Assets",
  },
  {
    label: "Establishing Secure Session",
  },
  {
    label: "Preparing User Interface",
  },
];

const LoadingStatusBar = () => {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  useEffect(() => {
    // Run onStateLoad method for initial state
    LOADING_STATES[0].onStateLoad?.();

    const interval = setInterval(() => {
      setCurrentStateIndex(prev => {
        const nextIndex = prev < LOADING_STATES.length - 1 ? prev + 1 : prev;

        // Execute optional method when state changes
        if (nextIndex !== prev) {
          LOADING_STATES[nextIndex].onStateLoad?.();
        }

        return nextIndex;
      });
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
          {LOADING_STATES[currentStateIndex].label}
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
