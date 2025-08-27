"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Battery, Zap, Shield, Clock } from "lucide-react"
import { BatteryChart } from "./battery-chart"

export function BatteryOverview() {
  // Mock data - in real app, this would come from your Python backend
  const batteryData = {
    currentCharge: 78,
    maxThreshold: 80,
    minThreshold: 40,
    health: 94,
    status: "Charging",
    timeRemaining: "2h 15m",
    cycleCount: 342,
    temperature: 32.5,
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "charging":
        return "bg-primary"
      case "discharging":
        return "bg-secondary"
      case "full":
        return "bg-accent"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Battery Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Battery className="h-5 w-5 text-primary" />
            Battery Status
          </CardTitle>
          <CardDescription>Current battery health and charging information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Large Battery Percentage */}
          <div className="text-center space-y-2">
            <div className="text-6xl font-serif font-bold text-primary">{batteryData.currentCharge}%</div>
            <Badge className={getStatusColor(batteryData.status)}>{batteryData.status}</Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Min: {batteryData.minThreshold}%</span>
              <span>Max: {batteryData.maxThreshold}%</span>
            </div>
            <Progress value={batteryData.currentCharge} className="h-3" />
          </div>

          {/* Battery Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-1">
              <Shield className="h-4 w-4 text-accent mx-auto" />
              <div className="text-2xl font-bold text-foreground">{batteryData.health}%</div>
              <div className="text-xs text-muted-foreground">Health</div>
            </div>
            <div className="text-center space-y-1">
              <Clock className="h-4 w-4 text-secondary mx-auto" />
              <div className="text-2xl font-bold text-foreground">{batteryData.timeRemaining}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
            <div className="text-center space-y-1">
              <Zap className="h-4 w-4 text-primary mx-auto" />
              <div className="text-2xl font-bold text-foreground">{batteryData.cycleCount}</div>
              <div className="text-xs text-muted-foreground">Cycles</div>
            </div>
            <div className="text-center space-y-1">
              <div className="h-4 w-4 bg-chart-3 rounded-full mx-auto"></div>
              <div className="text-2xl font-bold text-foreground">{batteryData.temperature}°C</div>
              <div className="text-xs text-muted-foreground">Temp</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Battery Chart */}
      <BatteryChart />
    </div>
  )
}
