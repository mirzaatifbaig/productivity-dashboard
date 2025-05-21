import { useDashboardStore } from "@/store/dashboardStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Trash2 } from "lucide-react";

export function SavedLayouts() {
  const { layouts, loadLayout, deleteLayout, currentLayout } = useDashboardStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Saved Layouts</SheetTitle>
          <SheetDescription>
            Load a previously saved dashboard layout
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          {layouts.map((layout) => (
            <Card
              key={layout.id}
              className={`${currentLayout?.id === layout.id ? 'border-primary' : ''}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium flex justify-between items-center">
                  <span>{layout.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteLayout(layout.id)}
                    disabled={layouts.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </CardTitle>
                <CardDescription>
                  {new Date(layout.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {layout.widgets.length} widgets
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => loadLayout(layout.id)}
                    disabled={currentLayout?.id === layout.id}
                  >
                    Load
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
