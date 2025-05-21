import { useDashboardStore } from "@/store/dashboardStore";
import { Button } from "@/components/ui/button";
import { WidgetType } from "@/types";
import { 
  BarChart, 
  Table, 
  Activity, 
  FileText, 
  Plus, 
  Save,
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ThemeToggle } from "../theme-toggle";

export function WidgetToolbar() {
  const { 
    addWidget, 
    saveCurrentLayout, 
    createNewLayout, 
    currentLayout 
  } = useDashboardStore();
  const [layoutName, setLayoutName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddWidget = (type: WidgetType) => {
    const widgetConfig = {
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    };
    
    addWidget(widgetConfig);
  };

  const handleSaveLayout = () => {
    saveCurrentLayout(layoutName || `Layout ${new Date().toLocaleString()}`);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-between w-full p-2 bg-card border-b">
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleAddWidget('chart')}
              >
                <BarChart className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Chart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleAddWidget('table')}
              >
                <Table className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Table</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleAddWidget('stats')}
              >
                <Activity className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Stats</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleAddWidget('text')}
              >
                <FileText className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Text</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <h2 className="text-lg font-semibold">{currentLayout?.name || "Dashboard"}</h2>

      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={createNewLayout}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>New Layout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Save className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Save Layout</DialogTitle>
              <DialogDescription>
                Give your layout a name to save it for future use.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter layout name"
                value={layoutName}
                onChange={(e) => setLayoutName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSaveLayout}>Save Layout</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ThemeToggle />
      </div>
    </div>
  );
}
