import { exec } from "child_process"
import { readFile } from "fs/promises"
import { promisify } from "util"

const execAsync = promisify(exec)

async function readBatteryFile(path: string): Promise<string | null> {
  try {
    const content = await readFile(path, "utf-8")
    return content.trim()
  } catch (error) {
    console.log(`[v0] Could not read ${path}:`, error)
    return null
  }
}

export async function GET() {
  try {
    const batteryPath = "/sys/class/power_supply/BAT0"

    // Read battery information from system files
    const [capacity, status, voltage, current, temp, cycleCount, health] = await Promise.all([
      readBatteryFile(`${batteryPath}/capacity`),
      readBatteryFile(`${batteryPath}/status`),
      readBatteryFile(`${batteryPath}/voltage_now`),
      readBatteryFile(`${batteryPath}/current_now`),
      readBatteryFile(`${batteryPath}/temp`),
      readBatteryFile(`${batteryPath}/cycle_count`),
      readBatteryFile(`${batteryPath}/health`),
    ])

    // Calculate power draw (voltage * current / 1000000000000 for watts)
    const voltageNum = voltage ? Number.parseInt(voltage) : 0
    const currentNum = current ? Number.parseInt(current) : 0
    const powerDraw = voltageNum && currentNum ? (voltageNum * currentNum) / 1000000000000 : 0

    // Convert temperature from decidegrees to celsius
    const tempCelsius = temp ? Number.parseInt(temp) / 10 : null

    // Get charge thresholds if available
    const [startThreshold, stopThreshold] = await Promise.all([
      readBatteryFile(`${batteryPath}/charge_start_threshold`),
      readBatteryFile(`${batteryPath}/charge_stop_threshold`),
    ])

    const batteryData = {
      percentage: capacity ? Number.parseInt(capacity) : 0,
      status: status || "Unknown",
      temperature: tempCelsius,
      powerDraw: Math.abs(powerDraw),
      voltage: voltageNum ? voltageNum / 1000000 : 0, // Convert to volts
      current: currentNum ? currentNum / 1000000 : 0, // Convert to amps
      cycleCount: cycleCount ? Number.parseInt(cycleCount) : null,
      health: health || "Unknown",
      chargeStartThreshold: startThreshold ? Number.parseInt(startThreshold) : null,
      chargeStopThreshold: stopThreshold ? Number.parseInt(stopThreshold) : null,
      timestamp: new Date().toISOString(),
    }

    console.log("[v0] Battery data retrieved:", batteryData)
    return Response.json(batteryData)
  } catch (error) {
    console.error("[v0] Error reading battery data:", error)

    return Response.json({
      percentage: 85,
      status: "Charging",
      temperature: 42,
      powerDraw: 15.2,
      voltage: 12.6,
      current: 1.2,
      cycleCount: null,
      health: "Good",
      chargeStartThreshold: null,
      chargeStopThreshold: null,
      timestamp: new Date().toISOString(),
      error: "Could not read system battery files",
    })
  }
}
