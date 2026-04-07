import { useState, useEffect } from "react";

export const useTaskMenu = () => {
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    windowKey: string | null;
  }>({
    visible: false,
    windowKey: null,
  });

  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.visible) {
        closeContextMenu();
      }
    };

    if (contextMenu.visible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu.visible]);

  const handleContextMenu = (e: React.MouseEvent, windowKey: string) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      windowKey,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, windowKey: null });
  };

  return { handleContextMenu, setContextMenu, contextMenu, closeContextMenu };
};
