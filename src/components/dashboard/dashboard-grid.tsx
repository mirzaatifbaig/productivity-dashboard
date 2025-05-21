import { useState, useRef } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { WidgetRenderer } from "../widgets/widget-renderer";
import { Widget } from "@/types";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

function SortableWidget({ widget, removeWidget }: { widget: Widget; removeWidget: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className="relative group"
    >
      <div className="absolute top-0 right-0 p-1 z-10 hidden group-hover:block">
        <Button 
          variant="destructive" 
          size="icon" 
          className="h-6 w-6" 
          onClick={() => removeWidget(widget.id)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
      <div 
        className="absolute top-0 left-0 p-1 z-10 cursor-grab hidden group-hover:block"
        {...attributes}
        {...listeners}
      >
        <div className="h-6 w-6 flex items-center justify-center bg-muted rounded-sm">
          <GripVertical className="h-3 w-3" />
        </div>
      </div>
      <WidgetRenderer widget={widget} />
    </div>
  );
}

export function DashboardGrid() {
  const { currentLayout, updateWidget, removeWidget } = useDashboardStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const widgets = [...(currentLayout?.widgets || [])];
      const oldIndex = widgets.findIndex((w) => w.id === active.id);
      const newIndex = widgets.findIndex((w) => w.id === over.id);
      
      const newWidgets = arrayMove(widgets, oldIndex, newIndex);
      
      newWidgets.forEach((widget, index) => {
        updateWidget({
          ...widget,
          x: index % 3,
          y: Math.floor(index / 3),
        });
      });
    }
    
    setActiveId(null);
  };

  if (!currentLayout) {
    return <div className="p-4">No layout selected</div>;
  }

  return (
    <div 
      ref={containerRef}
      className="p-4 h-full overflow-y-auto bg-muted/40"
    >
      <div className="container mx-auto">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={currentLayout.widgets.map(w => w.id)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentLayout.widgets.map((widget) => (
                <div key={widget.id} className="h-64">
                  <SortableWidget 
                    widget={widget} 
                    removeWidget={removeWidget}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
        
        {currentLayout.widgets.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-card rounded-lg border border-dashed">
            <p className="text-muted-foreground mb-2">Your dashboard is empty</p>
            <p className="text-sm text-muted-foreground">Add widgets using the toolbar above</p>
          </div>
        )}
      </div>
    </div>
  );
}
