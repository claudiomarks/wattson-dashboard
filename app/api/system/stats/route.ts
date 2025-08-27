export async function GET() {
  try {
    const apiUrl = process.env.WATTSON_API_URL || "http://localhost:9090"
    console.log(`[v0] Calling FastAPI backend at: ${apiUrl}/system`)

    const response = await fetch(`${apiUrl}/system`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`)
    }

    const systemStats = await response.json()
    console.log("[v0] System stats from FastAPI:", systemStats)

    return Response.json(systemStats)
  } catch (error) {
    console.error("[v0] Error calling FastAPI backend:", error)

    return Response.json({
      cpu: { usage: 9, cores: 4 },
      memory: { usage: 13, used: 2147483648, total: 16777216000, usedGB: 2.0, totalGB: 15.6 },
      disk: { usage: 85, used: "45G", total: "50G" },
      uptime: "6 days, 2 hours",
      timestamp: new Date().toISOString(),
      error: "Could not connect to FastAPI backend - ensure it's running on port 9090",
    })
  }
}
