import { exec } from "child_process"
import { writeFile, readFile } from "fs/promises"
import { promisify } from "util"

const execAsync = promisify(exec)

async function readThresholdFile(path: string): Promise<number | null> {
  try {
    const content = await readFile(path, "utf-8")
    return Number.parseInt(content.trim())
  } catch (error) {
    console.log(`[v0] Could not read threshold file ${path}:`, error)
    return null
  }
}

async function writeThresholdFile(path: string, value: number): Promise<boolean> {
  try {
    await writeFile(path, value.toString())
    return true
  } catch (error) {
    console.log(`[v0] Could not write threshold file ${path}:`, error)
    return false
  }
}

export async function GET() {
  try {
    const batteryPath = "/sys/class/power_supply/BAT0"

    const [startThreshold, stopThreshold] = await Promise.all([
      readThresholdFile(`${batteryPath}/charge_start_threshold`),
      readThresholdFile(`${batteryPath}/charge_stop_threshold`),
    ])

    const thresholds = {
      chargeStart: startThreshold,
      chargeStop: stopThreshold,
      available: startThreshold !== null || stopThreshold !== null,
      timestamp: new Date().toISOString(),
    }

    console.log("[v0] Battery thresholds retrieved:", thresholds)
    return Response.json(thresholds)
  } catch (error) {
    console.error("[v0] Error reading battery thresholds:", error)
    return Response.json({
      chargeStart: null,
      chargeStop: null,
      available: false,
      timestamp: new Date().toISOString(),
      error: "Could not read threshold files",
    })
  }
}

export async function POST(request: Request) {
  try {
    const { chargeStart, chargeStop } = await request.json()

    const batteryPath = "/sys/class/power_supply/BAT0"
    const results = []

    if (chargeStart !== undefined) {
      const success = await writeThresholdFile(`${batteryPath}/charge_start_threshold`, chargeStart)
      results.push({ type: "start", value: chargeStart, success })
    }

    if (chargeStop !== undefined) {
      const success = await writeThresholdFile(`${batteryPath}/charge_stop_threshold`, chargeStop)
      results.push({ type: "stop", value: chargeStop, success })
    }

    console.log("[v0] Battery thresholds updated:", results)
    return Response.json({
      success: results.every((r) => r.success),
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Error updating battery thresholds:", error)
    return Response.json(
      {
        success: false,
        error: "Could not update threshold files",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
