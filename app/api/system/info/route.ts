import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function GET() {
  try {
    const [hostname, kernel, distro, architecture, temperature] = await Promise.all([
      execAsync("hostname")
        .then((r) => r.stdout.trim())
        .catch(() => "unknown"),
      execAsync("uname -r")
        .then((r) => r.stdout.trim())
        .catch(() => "unknown"),
      execAsync("lsb_release -d")
        .then((r) => r.stdout.split("\t")[1]?.trim())
        .catch(() => "Ubuntu"),
      execAsync("uname -m")
        .then((r) => r.stdout.trim())
        .catch(() => "unknown"),
      execAsync("sensors | grep 'Core 0' | awk '{print $3}' | sed 's/+//;s/°C//'")
        .then((r) => Number.parseFloat(r.stdout.trim()))
        .catch(() => null),
    ])

    const systemInfo = {
      hostname,
      kernel,
      distro,
      architecture,
      cpuTemperature: temperature,
      timestamp: new Date().toISOString(),
    }

    console.log("[v0] System info retrieved:", systemInfo)
    return Response.json(systemInfo)
  } catch (error) {
    console.error("[v0] Error getting system info:", error)
    return Response.json({
      hostname: "ubuntu-server",
      kernel: "5.15.0-generic",
      distro: "Ubuntu 22.04 LTS",
      architecture: "x86_64",
      cpuTemperature: null,
      timestamp: new Date().toISOString(),
      error: "Could not read system information",
    })
  }
}
