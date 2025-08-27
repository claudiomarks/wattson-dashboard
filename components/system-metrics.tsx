import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Server, Cpu, HardDrive, Thermometer } from "lucide-react"

export function SystemMetrics() {
  // Mock system data
  const systemData = {
    uptime: "7d 14h 32m",
    cpuUsage: 23,
    memoryUsage: 67,
    diskUsage: 45,
    temperature: 42.3,
    powerConsumption: 15.2,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5 text-primary" />
          System Metrics
        </CardTitle>
        <CardDescription>Server performance and resource utilization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Status */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">System Uptime</div>
            <div className="text-2xl font-bold text-foreground">{systemData.uptime}</div>
          </div>
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            Healthy
          </Badge>
        </div>

        {/* Resource Usage */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-chart-1" />
                <span className="text-sm font-medium">CPU Usage</span>
              </div>
              <span className="text-sm text-muted-foreground">{systemData.cpuUsage}%</span>
            </div>
            <Progress value={systemData.cpuUsage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-chart-2 rounded-sm" />
                <span className="text-sm font-medium">Memory Usage</span>
              </div>
              <span className="text-sm text-muted-foreground">{systemData.memoryUsage}%</span>
            </div>
            <Progress value={systemData.memoryUsage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-chart-3" />
                <span className="text-sm font-medium">Disk Usage</span>
              </div>
              <span className="text-sm text-muted-foreground">{systemData.diskUsage}%</span>
            </div>
            <Progress value={systemData.diskUsage} className="h-2" />
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center space-y-1">
            <Thermometer className="h-4 w-4 text-secondary mx-auto" />
            <div className="text-lg font-bold text-foreground">{systemData.temperature}°C</div>
            <div className="text-xs text-muted-foreground">System Temp</div>
          </div>
          <div className="text-center space-y-1">
            <div className="h-4 w-4 bg-accent rounded-full mx-auto" />
            <div className="text-lg font-bold text-foreground">{systemData.powerConsumption}W</div>
            <div className="text-xs text-muted-foreground">Power Draw</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
