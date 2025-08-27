"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Settings, Save } from "lucide-react"
import { useState } from "react"

export function ThresholdControls() {
  const [maxThreshold, setMaxThreshold] = useState([80])
  const [minThreshold, setMinThreshold] = useState([40])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Charge Thresholds
        </CardTitle>
        <CardDescription>Configure battery charge limits to optimize health</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Maximum Charge Threshold */}
        <div className="space-y-3">
          <Label htmlFor="max-threshold" className="text-sm font-medium">
            Maximum Charge Limit
          </Label>
          <div className="space-y-2">
            <Slider
              id="max-threshold"
              min={60}
              max={100}
              step={5}
              value={maxThreshold}
              onValueChange={setMaxThreshold}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>60%</span>
              <span className="font-medium text-foreground">{maxThreshold[0]}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Minimum Charge Threshold */}
        <div className="space-y-3">
          <Label htmlFor="min-threshold" className="text-sm font-medium">
            Minimum Charge Warning
          </Label>
          <div className="space-y-2">
            <Slider
              id="min-threshold"
              min={10}
              max={50}
              step={5}
              value={minThreshold}
              onValueChange={setMinThreshold}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>10%</span>
              <span className="font-medium text-foreground">{minThreshold[0]}%</span>
              <span>50%</span>
            </div>
          </div>
        </div>

        {/* Check Interval */}
        <div className="space-y-2">
          <Label htmlFor="check-interval" className="text-sm font-medium">
            Check Interval (seconds)
          </Label>
          <Input id="check-interval" type="number" defaultValue={60} min={10} max={300} className="w-full" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Apply Settings
          </Button>
          <Button variant="outline">Reset</Button>
        </div>

        {/* Current Status */}
        <div className="pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground space-y-1">
            <div>
              Current: Max {maxThreshold[0]}%, Min {minThreshold[0]}%
            </div>
            <div>Last updated: 2 minutes ago</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
