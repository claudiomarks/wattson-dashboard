"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp } from "lucide-react"

const chartData = [
  { time: "00:00", charge: 45, health: 94 },
  { time: "04:00", charge: 52, health: 94 },
  { time: "08:00", charge: 68, health: 94 },
  { time: "12:00", charge: 75, health: 94 },
  { time: "16:00", charge: 78, health: 94 },
  { time: "20:00", charge: 80, health: 94 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium">{`Time: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey === "charge" ? "Battery Charge" : "Battery Health"}: ${entry.value}%`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function BatteryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Battery Trends
        </CardTitle>
        <CardDescription>24-hour battery charge and health monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="time" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
              <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="charge"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "hsl(var(--chart-1))" }}
              />
              <Line
                type="monotone"
                dataKey="health"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, fill: "hsl(var(--chart-2))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
