export type WidgetType = 'chart' | 'table' | 'stats' | 'text';

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: any;
}

export interface DashboardLayout {
  id: string;
  name: string;
  widgets: Widget[];
  createdAt: string;
}
