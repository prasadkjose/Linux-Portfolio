import React from "react";
import { TaskbarState } from "../config/taskbar.config";

export const createOnClickHandler = (params: TaskbarState) => {
  return React.useCallback(() => {
    params.setWidgetState(prev => ({
      ...prev,
      ...{ calendar: !prev.calendar },
    }));
  }, [params.setWidgetState]);
};

export const createOnCloseHandler = (params: TaskbarState) => {
  return React.useCallback(() => {
    params.setWidgetState(prev => ({ ...prev, ...{ calendar: false } }));
  }, [params.setWidgetState]);
};
