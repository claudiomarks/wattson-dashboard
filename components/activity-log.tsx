import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, CheckCircle, AlertTriangle, Info } from "lucide-react"

const logEntries = [
  {
    id: 1,
    timestamp: "14:32:15",
    type: "success",
    message: "Charge threshold updated to 80%",
    icon: CheckCircle,
  },
  {
    id: 2,
    timestamp: "14:28:42",
    type: "info",
    message: "Battery health check completed",
    icon: Info,
  },
  {
    id: 3,
    timestamp: "14:15:33",
    type: "warning",
    message: "Temperature elevated: 45°C",
    icon: AlertTriangle,
  },
  {
    id: 4,
    timestamp: "13:45:21",
    type: "success",
    message: "System monitoring started",
    icon: CheckCircle,
  },
  {
    id: 5,
    timestamp: "13:42:18",
    type: "info",
    message: "Configuration loaded successfully",
    icon: Info,
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case "success":
      return "bg-primary text-primary-foreground"
    case "warning":
      return "bg-secondary text-secondary-foreground"
    case "error":
      return "bg-destructive text-destructive-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function ActivityLog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Activity Log
        </CardTitle>
        <CardDescription>Recent system events and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {logEntries.map((entry) => {
              const IconComponent = entry.icon
              return (
                <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <IconComponent className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{entry.message}</p>
                      <Badge variant="outline" className={`text-xs ${getTypeColor(entry.type)}`}>
                        {entry.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
