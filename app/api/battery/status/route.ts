export async function GET() {
  try {
    const apiUrl = process.env.WATTSON_API_URL || "http://localhost:9090"
    console.log(`[v0] Calling FastAPI backend at: ${apiUrl}/battery`)

    const response = await fetch(`${apiUrl}/battery`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`)
    }

    const batteryData = await response.json()
    console.log("[v0] Battery data from FastAPI:", batteryData)

    return Response.json(batteryData)
  } catch (error) {
    console.error("[v0] Error calling FastAPI backend:", error)

    return Response.json({
      percentage: 0,
      status: "Unknown",
      temperature: null,
      powerDraw: 0,
      voltage: 0,
      current: 0,
      cycleCount: null,
      health: "Unknown",
      chargeStartThreshold: null,
      chargeStopThreshold: null,
      timestamp: new Date().toISOString(),
      error: "Could not connect to FastAPI backend - ensure it's running on port 9090",
    })
  }
}
