import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, Users } from "lucide-react";

interface StatsWidgetProps {
  title: string;
  className?: string;
  icon?: "users" | "activity" | "trending";
  value?: string;
  description?: string;
}

export function StatsWidget({ 
  title, 
  className, 
  icon = "activity",
  value = "$12,345",
  description = "12% from last month"
}: StatsWidgetProps) {
  return (
    <Card className={`w-full h-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <div className="h-5 w-5 text-muted-foreground">
          {icon === "users" && <Users className="h-5 w-5" />}
          {icon === "activity" && <Activity className="h-5 w-5" />}
          {icon === "trending" && <TrendingUp className="h-5 w-5" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
