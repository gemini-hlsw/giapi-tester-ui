import { setGiapiState } from "../setGiapiState"

export async function POST(request: Request) {
  const { key, value, type } = await request.json()

  // Validate the input
  if (
    typeof key !== "string" ||
    typeof value !== "number" ||
    typeof type !== "string"
  ) {
    return new Response("Invalid input", { status: 400 })
  }

  // Update the state in the singleton
  try {
    // Try to execute subprocess and update state using giapi-tester.jar
    await setGiapiState(key, value, type)

    return new Response("State updated successfully", { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Failed to update state", { status: 500 })
  }
}
