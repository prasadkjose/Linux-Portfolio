# Taskbar System Documentation

This directory contains the taskbar implementation for the Linux desktop environment. The taskbar is a modular, configurable system that supports dynamic widgets, application launchers, and window management.

## Overview

The taskbar is organized into 3 sections:

- **Left Section**: App launchers and system controls
- **Center Section**: Open window / task items
- **Right Section**: Widgets, status indicators, and system controls

Widgets are registered through a central configuration system, making it extremely easy to add new elements without modifying the main Taskbar component.

---

## How to add new Taskbar Widget Elements

Follow this step-by-step guide to add new taskbar elements. This follows the exact patterns used by existing elements (Clock, Calendar, Announcements).

### Step 1: Create your widget component

1.  Create a new directory for your widget under `/src/layout/taskbar/`

    ```
    src/layout/taskbar/
    └── your-widget-name/
        ├── YourWidgetComponent.tsx
        └── widgetUtils.ts
    ```

2.  Your widget component must accept the `WidgetComponentProps` interface:

    ```typescript
    import { WidgetComponentProps } from '../config/taskbar.config';

    export const YourWidget: React.FC<WidgetComponentProps> = ({
      id,
      onClick,
      isOpen,
      onClose,
      title,
      $parentID
    }) => {
      // Your implementation here
      return (
        <button onClick={onClick} title={title}>
          {/* Widget UI */}
        </button>
      );
    };
    ```

### Step 2: Create utility handlers.

TODO: This factory will and can be automated in the future

In your widget's `widgetUtils.ts` file, create callback handlers using `React.useCallback`:

```typescript
import { useCallback } from "react";
import { TaskbarState } from "../config/taskbar.config";

export const createOnClickHandler = (state: TaskbarState) => {
  return useCallback(() => {
    state.setWidgetState(prev => ({
      ...prev,
      yourWidgetKey: !prev.yourWidgetKey,
    }));
  }, [state]);
};

export const createOnCloseHandler = (state: TaskbarState) => {
  return useCallback(() => {
    state.setWidgetState(prev => ({
      ...prev,
      yourWidgetKey: false,
    }));
  }, [state]);
};
```

### Step 3: Extend WidgetState interface

In `/src/layout/taskbar/config/taskbar.config.ts`:

1.  Add your widget state key to the `WidgetState` interface:

    ```typescript
    export interface WidgetState {
      calendar: boolean;
      announcement: boolean;
      yourWidgetKey: boolean; // <-- Add your widget state
    }
    ```

2.  Import your widget component and handlers:
    ```typescript
    import YourWidget from "../your-widget-name/YourWidgetComponent";
    import {
      createOnClickHandler,
      createOnCloseHandler,
    } from "../your-widget-name/widgetUtils";
    ```

### Step 4: Register your widget in config

Add your widget to the `taskbarWidgets` array:

```typescript
{
  id: "your-widget-id",
  component: YourWidget,
  position: "right", // "left" | "center" | "right"
  order: 30, // Lower numbers render first
  enabled: true, // Set to false to disable without removing
  getProps: state => ({
    onClick: createOnClickHandler(state),
    title: "Your Widget Title",
    isOpen: state.widgetState.yourWidgetKey,
    onClose: createOnCloseHandler(state),
    // Any additional props your widget requires
  }),
},
```

---

## Widget Configuration Properties

| Property    | Type                              | Description                                                               |
| ----------- | --------------------------------- | ------------------------------------------------------------------------- |
| `id`        | `string`                          | Unique identifier for your widget (required)                              |
| `component` | `React.FC<WidgetComponentProps>`  | Your widget React component                                               |
| `position`  | `"left" \| "center" \| "right"`   | Which taskbar section the widget renders in                               |
| `order`     | `number`                          | Sort order within the section (lower numbers appear first)                |
| `enabled`   | `boolean`                         | Toggle widget visibility without removing from config                     |
| `getProps`  | `(state: TaskbarState) => Object` | Function that receives taskbar state and returns props for your component |

---

## Important Conventions

1.  **Always use useCallback for handlers**: All click/close handlers must be wrapped in `useCallback` to prevent unnecessary re-renders
2.  **Keep components pure**: Widget components should only receive props through the `getProps` function
3.  **Separate business logic**: Keep complex logic in separate utils files, not directly in component files
4.  **Order values**: Use increments of 10 for order values (10, 20, 30) to allow inserting new widgets between existing ones
5.  **State management**: Always use the provided `setWidgetState` dispatcher - never create local state for panel visibility

---

## Existing Widget References

For working examples, look at:

- 🕒 **Clock & Calendar**: `/src/layout/taskbar/clock/`
- 📢 **Announcements**: `/src/layout/taskbar/announcements/`

---

## Architecture Notes

- The main `Taskbar.tsx` component automatically renders all registered widgets
- Widgets are filtered by `position` and `enabled` status at runtime
- Widgets are sorted by `order` value before rendering
- All widgets receive consistent props through the configuration system
- No changes to `Taskbar.tsx` are required when adding new widgets

---

## Troubleshooting

- If your widget doesn't appear: Verify `enabled` is true and `position` is correctly set
- If widget doesn't toggle state: Make sure you added your key to the `WidgetState` interface
- If widget re-renders excessively: Ensure your handlers are properly wrapped in `useCallback`
- If order is incorrect: Check the `order` property value (lower = renders first)
