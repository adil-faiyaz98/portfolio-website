/**
 * Stats and trust indicators for SDA Intelligence.
 * Focus on capability and expertise for a new product company.
 */

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export const stats: Stat[] = [
  {
    id: "stat-agents",
    label: "AI Agents Ready",
    value: 6,
    suffix: "",
  },
  {
    id: "stat-experience",
    label: "Years SAP Experience",
    value: 30,
    suffix: "+",
  },
  {
    id: "stat-industries",
    label: "Industries Served",
    value: 5,
    suffix: "",
  },
  {
    id: "stat-faster",
    label: "Faster Than Big4",
    value: 10,
    suffix: "x",
  },
];
