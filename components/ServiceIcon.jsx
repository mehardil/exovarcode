import { BarChart3, Cloud, Code2, Search, Target, Workflow } from "lucide-react";

const ICONS = { Code2, Search, Workflow, Cloud, BarChart3, Target };

export function ServiceIcon({ name, size = 20, ...rest }) {
  const Icon = ICONS[name] || Code2;
  return <Icon size={size} aria-hidden="true" {...rest} />;
}
