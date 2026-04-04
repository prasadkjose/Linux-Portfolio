import React from "react";
// import Announcement, {AnnouncementTaskbarBtn} from '../layout/taskbar/announcements/Announcement';
import ClockComponent from "../layout/taskbar/clock/ClockComponent";
import CalendarPanel from "../components/CalendarPanel";
import {
  createOnClickHandler as createOnClockClickHandler,
  createOnCloseHandler as createOnClockCloseHandler,
} from "../layout/taskbar/clock/clockUtils";
import {
  createOnClickHandler as createOnAnnouncementClockClickHandler,
  createOnCloseHandler as createOnAnnouncementClockCloseHandler,
} from "../layout/taskbar/announcements/announcementUtils";
import Announcement, {
  AnnouncementTaskbarBtn,
} from "../layout/taskbar/announcements/Announcement";

/*
How to register and implement a taskbar widget. This file should be as general as possible
1. Add component to taskbar/widgetname/widgetComponent
2. Add callback handlers like onClick and onClose etc ina  seperate utils file in React.useCallback
3. Register the toolbar widget and an optional details panel component here. 

*/
export interface WidgetState {
  calendar: boolean;
  announcement: boolean;
}
export interface TaskbarState {
  widgetState: WidgetState;
  setWidgetState: React.Dispatch<React.SetStateAction<WidgetState>>;
}

export interface WidgetComponentProps {
  "aria-label"?: string;
  title?: string;
  onClick?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export interface TaskbarWidget {
  id: string;
  component: React.FC<WidgetComponentProps>;
  position: "left" | "center" | "right";
  order: number;
  enabled: boolean;
  getProps?: (state: TaskbarState) => WidgetComponentProps;
}

export const taskbarWidgets: TaskbarWidget[] = [
  {
    id: "announcement-taskbar-button",
    component: AnnouncementTaskbarBtn,
    position: "right",
    order: 10,
    enabled: true,
    getProps: state => ({
      onClick: createOnAnnouncementClockClickHandler(state),
      "aria-label": "View new features",
      title: "What's New",
    }),
  },
  {
    id: "announcement-banner",
    component: Announcement,
    position: "right",
    order: 11,
    enabled: true,
    getProps: state => ({
      "aria-label": "Announcement Button",
      title: "What's New",
      isOpen: state.widgetState.announcement,
      onClose: createOnAnnouncementClockCloseHandler(state),
    }),
  },
  {
    id: "clock",
    component: ClockComponent,
    position: "right",
    order: 20,
    enabled: true,
    getProps: state => {
      return {
        "aria-label": "clock",
        title: "Clock",
        onClick: createOnClockClickHandler(state),
      };
    },
  },
  {
    id: "calendar-panel",
    component: CalendarPanel,
    position: "right",
    order: 21,
    enabled: true,
    getProps: state => ({
      "aria-label": "Calendar Panel",
      title: "Calendar Panel",
      isOpen: state.widgetState.calendar,
      onClose: createOnClockCloseHandler(state),
    }),
  },
];
