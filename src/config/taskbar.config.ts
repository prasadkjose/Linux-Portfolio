import React from "react";
// import NewFeaturesBanner, {FeaturesButton} from '../layout/taskbar/announcements/Announcement';
import ClockComponent from "../layout/taskbar/clock/ClockComponent";
import CalendarPanel from "../components/CalendarPanel";
import {
  createOnClickHandler,
  createonCloseHandler,
} from "../layout/taskbar/clock/clockUtils";

/*
How to register and implement a taskbar widget. This file should be as general as possible
1. Add component to taskbar/widgetname/widgetComponent
2. Add callback handlers like onClick and onClose etc ina  seperate utils file in React.useCallback
3. Register the toolbar widget and an optional details panel component here. 

*/
interface WidgetState {
  calendar: boolean;
}
export interface TaskbarState {
  widgetState: WidgetState;
  setWidgetState: React.Dispatch<React.SetStateAction<WidgetState>>;
}

export interface WidgetComponentProps {
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
  // {
  //   id: 'features-button',
  //   component: FeaturesButton,
  //   position: 'right',
  //   order: 10,
  //   enabled: true,
  //   getProps: (state) => ({
  //     onClick: state.handleFeaturesClick,
  //     'aria-label': 'View new features',
  //     title: "What's New"
  //   })
  // },
  // {
  //   id: 'new-features-banner',
  //   component: NewFeaturesBanner,
  //   position: 'right',
  //   order: 11,
  //   enabled: true,
  //   getProps: (state) => ({
  //     isOpen: state.featuresOpen,
  //     onClose: () => state.setFeaturesOpen(false)
  //   })
  // },
  {
    id: "clock",
    component: ClockComponent,
    position: "right",
    order: 20,
    enabled: true,
    getProps: state => {
      return {
        onClick: createOnClickHandler(state),
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
      isOpen: state.widgetState.calendar,
      onClose: createonCloseHandler(state),
    }),
  },
];
