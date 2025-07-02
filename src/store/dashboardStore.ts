import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Widget, DashboardLayout, WidgetType } from '@/types';

interface DashboardState {
  layouts: DashboardLayout[];
  currentLayout: DashboardLayout | null;
  availableWidgets: { type: WidgetType; icon: string; title: string }[];
  
  addWidget: (widget: Omit<Widget, 'id'>) => void;
  removeWidget: (widgetId: string) => void;
  updateWidget: (widget: Widget) => void;
  updateWidgetPosition: (id: string, x: number, y: number) => void;
  saveCurrentLayout: (name: string) => void;
  loadLayout: (layoutId: string) => void;
  createNewLayout: () => void;
  deleteLayout: (layoutId: string) => void;
}

const defaultWidgetTemplates = [
  { type: 'chart' as WidgetType, icon: 'bar-chart', title: 'Chart' },
  { type: 'table' as WidgetType, icon: 'table', title: 'Table' },
  { type: 'stats' as WidgetType, icon: 'activity', title: 'Stats' },
  { type: 'text' as WidgetType, icon: 'file-text', title: 'Text' },
];

const initialLayout: DashboardLayout = {
  id: 'default',
  name: 'Default Layout',
  widgets: [],
  createdAt: new Date().toISOString(),
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      layouts: [initialLayout],
      currentLayout: initialLayout,
      availableWidgets: defaultWidgetTemplates,

      addWidget: (widgetData) => {
        const { currentLayout } = get();
        if (!currentLayout) return;
        
        const newWidget: Widget = {
          ...widgetData,
          id: `widget-${Date.now()}`,
        };
        
        set((state) => ({
          currentLayout: {
            ...state.currentLayout!,
            widgets: [...state.currentLayout!.widgets, newWidget],
          },
        }));
      },
      
      removeWidget: (widgetId) => {
        const { currentLayout } = get();
        if (!currentLayout) return;
        
        set((state) => ({
          currentLayout: {
            ...state.currentLayout!,
            widgets: state.currentLayout!.widgets.filter(w => w.id !== widgetId),
          },
        }));
      },
      
      updateWidget: (updatedWidget) => {
        const { currentLayout } = get();
        if (!currentLayout) return;
        
        set((state) => ({
          currentLayout: {
            ...state.currentLayout!,
            widgets: state.currentLayout!.widgets.map(widget => 
              widget.id === updatedWidget.id ? updatedWidget : widget
            ),
          },
        }));
      },
      
      updateWidgetPosition: (id, x, y) => {
        const { currentLayout } = get();
        if (!currentLayout) return;
        
        set((state) => ({
          currentLayout: {
            ...state.currentLayout!,
            widgets: state.currentLayout!.widgets.map(widget => 
              widget.id === id ? { ...widget, x, y } : widget
            ),
          },
        }));
      },
      
      saveCurrentLayout: (name) => {
        const { currentLayout } = get();
        if (!currentLayout) return;
        
        const layoutToSave: DashboardLayout = {
          ...currentLayout,
          name,
          id: currentLayout.id === 'default' ? `layout-${Date.now()}` : currentLayout.id,
        };
        
        set((state) => ({
          layouts: state.layouts.map(layout => 
            layout.id === layoutToSave.id ? layoutToSave : layout
          ).concat(
            state.layouts.find(layout => layout.id === layoutToSave.id) ? [] : [layoutToSave]
          ),
          currentLayout: layoutToSave,
        }));
      },
      
      loadLayout: (layoutId) => {
        const { layouts } = get();
        const layoutToLoad = layouts.find(layout => layout.id === layoutId);
        if (layoutToLoad) {
          set({ currentLayout: layoutToLoad });
        }
      },
      
      createNewLayout: () => {
        const newLayout: DashboardLayout = {
          id: `layout-${Date.now()}`,
          name: 'New Layout',
          widgets: [],
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          layouts: [...state.layouts, newLayout],
          currentLayout: newLayout,
        }));
      },
      
      deleteLayout: (layoutId) => {
        const { layouts, currentLayout } = get();
        if (layouts.length <= 1) return;
        
        const updatedLayouts = layouts.filter(layout => layout.id !== layoutId);
        
        set(() => ({
          layouts: updatedLayouts,
          currentLayout: currentLayout?.id === layoutId 
            ? updatedLayouts[0] 
            : currentLayout,
        }));
      },
    }),
    {
      name: 'dashboard-storage',
    }
  )
);
