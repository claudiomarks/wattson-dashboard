import { exec } from "child_process"
import { readFile } from "fs/promises"
import { promisify } from "util"

const execAsync = promisify(exec)

async function getCpuUsage(): Promise<number> {
  try {
    const { stdout } = await execAsync("top -bn1 | grep 'Cpu(s)' | awk '{print $2}' | sed 's/%us,//'")
    const usage = Number.parseFloat(stdout.trim()) || 0
    console.log(`[v0] CPU usage: ${usage}%`) // Added debug logging
    return usage
  } catch (error) {
    console.log("[v0] Could not get CPU usage:", error)
    return 0
  }
}

async function getMemoryUsage(): Promise<{ used: number; total: number; percentage: number }> {
  try {
    const meminfo = await readFile("/proc/meminfo", "utf-8")
    const lines = meminfo.split("\n")

    const memTotal = Number.parseInt(lines.find((line) => line.startsWith("MemTotal:"))?.split(/\s+/)[1] || "0") * 1024
    const memFree = Number.parseInt(lines.find((line) => line.startsWith("MemFree:"))?.split(/\s+/)[1] || "0") * 1024
    const buffers = Number.parseInt(lines.find((line) => line.startsWith("Buffers:"))?.split(/\s+/)[1] || "0") * 1024
    const cached = Number.parseInt(lines.find((line) => line.startsWith("Cached:"))?.split(/\s+/)[1] || "0") * 1024

    const memUsed = memTotal - memFree - buffers - cached
    const percentage = memTotal > 0 ? (memUsed / memTotal) * 100 : 0

    return {
      used: memUsed,
      total: memTotal,
      percentage: Math.round(percentage),
    }
  } catch (error) {
    console.log("[v0] Could not get memory usage:", error)
    return { used: 0, total: 0, percentage: 0 }
  }
}

async function getDiskUsage(): Promise<{ used: string; total: string; percentage: number }> {
  try {
    const { stdout } = await execAsync("df -h / | awk 'NR==2 {print $2,$3,$5}' | sed 's/%//'")
    const parts = stdout.trim().split(/\s+/)
    console.log(`[v0] Disk usage raw output: "${stdout.trim()}"`) // Added debug logging

    const totalStr = parts[0] || "0"
    const usedStr = parts[1] || "0"
    const percentage = Number.parseInt(parts[2]) || 0

    return {
      used: usedStr,
      total: totalStr,
      percentage: percentage,
    }
  } catch (error) {
    console.log("[v0] Could not get disk usage:", error)
    return { used: "0G", total: "0G", percentage: 0 }
  }
}

async function getUptime(): Promise<string> {
  try {
    const { stdout } = await execAsync("uptime -p")
    return stdout.trim().replace("up ", "")
  } catch (error) {
    console.log("[v0] Could not get uptime:", error)
    return "unknown"
  }
}

export async function GET() {
  try {
    const [cpu, memory, disk, uptime] = await Promise.all([
      getCpuUsage(),
      getMemoryUsage(),
      getDiskUsage(),
      getUptime(),
    ])

    const systemStats = {
      cpu: {
        usage: Math.round(cpu),
        cores: Number.parseInt(
          await execAsync("nproc")
            .then((r) => r.stdout.trim())
            .catch(() => "1"),
        ),
      },
      memory: {
        usage: memory.percentage,
        used: memory.used,
        total: memory.total,
        usedGB: Math.round((memory.used / (1024 * 1024 * 1024)) * 10) / 10,
        totalGB: Math.round((memory.total / (1024 * 1024 * 1024)) * 10) / 10,
      },
      disk: {
        usage: disk.percentage,
        used: disk.used,
        total: disk.total,
      },
      uptime,
      timestamp: new Date().toISOString(),
    }

    console.log("[v0] System stats retrieved:", systemStats)
    return Response.json(systemStats)
  } catch (error) {
    console.error("[v0] Error getting system stats:", error)

    return Response.json({
      cpu: { usage: 9, cores: 4 },
      memory: { usage: 13, used: 2147483648, total: 16777216000, usedGB: 2.0, totalGB: 15.6 },
      disk: { usage: 85, used: "45G", total: "50G" },
      uptime: "6 days, 2 hours",
      timestamp: new Date().toISOString(),
      error: "Could not read system statistics",
    })
  }
}
