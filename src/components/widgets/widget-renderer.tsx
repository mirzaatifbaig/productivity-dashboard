import { Widget } from "@/types";
import { ChartWidget } from "./chart-widget";
import { TableWidget } from "./table-widget";
import { StatsWidget } from "./stats-widget";
import { TextWidget } from "./text-widget";

interface WidgetRendererProps {
  widget: Widget;
  className?: string;
}

export function WidgetRenderer({ widget, className }: WidgetRendererProps) {
  switch (widget.type) {
    case 'chart':
      return <ChartWidget title={widget.title} className={className} />;
    case 'table':
      return <TableWidget title={widget.title} className={className} />;
    case 'stats':
      return <StatsWidget title={widget.title} className={className} />;
    case 'text':
      return <TextWidget title={widget.title} className={className} content={widget.content} />;
    default:
      return <div>Unknown widget type</div>;
  }
}
