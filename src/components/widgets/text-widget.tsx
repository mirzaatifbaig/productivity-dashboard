import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TextWidgetProps {
  title: string;
  className?: string;
  content?: string;
}

export function TextWidget({ 
  title, 
  className,
  content = "This is a customizable text widget. You can add notes, descriptions, or any other text-based content here."
}: TextWidgetProps) {
  return (
    <Card className={`w-full h-full ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}
