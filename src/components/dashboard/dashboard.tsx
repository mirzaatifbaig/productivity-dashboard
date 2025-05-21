import { WidgetToolbar } from "./widget-toolbar";
import { DashboardGrid } from "./dashboard-grid";
import { SavedLayouts } from "./saved-layouts";

export function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-2 bg-card border-b">
        <h1 className="text-xl font-bold">Dashboard Builder</h1>
        <SavedLayouts />
      </div>
      <WidgetToolbar />
      <div className="flex-1 overflow-hidden">
        <DashboardGrid />
      </div>
    </div>
  );
}
