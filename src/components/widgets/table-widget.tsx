import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TableWidgetProps {
  title: string;
  className?: string;
}

export function TableWidget({ title, className }: TableWidgetProps) {
  return (
    <Card className={`w-full h-full ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle">Item 1</td>
                <td className="p-4 align-middle">Active</td>
                <td className="p-4 align-middle">$320</td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle">Item 2</td>
                <td className="p-4 align-middle">Pending</td>
                <td className="p-4 align-middle">$150</td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle">Item 3</td>
                <td className="p-4 align-middle">Inactive</td>
                <td className="p-4 align-middle">$280</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
