export interface NewFeature {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: "star" | "new" | "improvement" | "fix";
}

export const newFeatures: NewFeature[] = [
  {
    id: "1",
    title: "Mobile Responsiveness",
    description: "Full mobile support with optimized layout for touch devices",
    date: "March 2026",
    icon: "new",
  },
  {
    id: "2",
    title: "Performance Optimizations",
    description: "Reduced bundle size by 40% and improved load times",
    date: "March 2026",
    icon: "improvement",
  },
  {
    id: "3",
    title: "Accessibility Fixes",
    description:
      "Full keyboard navigation support and improved screen reader compatibility",
    date: "March 2026",
    icon: "fix",
  },
];
