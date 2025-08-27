export async function GET() {
  try {
    const apiUrl = process.env.WATTSON_API_URL || "http://localhost:9090"
    console.log(`[v0] Calling FastAPI backend at: ${apiUrl}/thresholds`)

    const response = await fetch(`${apiUrl}/thresholds`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`)
    }

    const thresholds = await response.json()
    console.log("[v0] Battery thresholds from FastAPI:", thresholds)
    return Response.json(thresholds)
  } catch (error) {
    console.error("[v0] Error calling FastAPI backend:", error)
    return Response.json({
      chargeStart: null,
      chargeStop: null,
      available: false,
      timestamp: new Date().toISOString(),
      error: "Could not connect to FastAPI backend - ensure it's running on port 9090",
    })
  }
}

export async function POST(request: Request) {
  try {
    const { chargeStart, chargeStop } = await request.json()
    const apiUrl = process.env.WATTSON_API_URL || "http://localhost:9090"
    console.log(`[v0] Updating thresholds via FastAPI at: ${apiUrl}/thresholds`)

    const response = await fetch(`${apiUrl}/thresholds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chargeStart, chargeStop }),
    })

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`)
    }

    const result = await response.json()
    console.log("[v0] Thresholds updated via FastAPI:", result)
    return Response.json(result)
  } catch (error) {
    console.error("[v0] Error updating thresholds via FastAPI:", error)
    return Response.json(
      {
        success: false,
        error: "Could not connect to FastAPI backend - ensure it's running on port 9090",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
