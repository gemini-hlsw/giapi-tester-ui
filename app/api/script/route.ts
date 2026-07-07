import { adcRotate, observationExample, spectrumExample } from "./scripts"

export async function POST(request: Request) {
  const { id } = await request.json()

  // Validate the input
  if (typeof id !== "string") {
    return new Response("Invalid input", { status: 400 })
  }

  console.log(`Executing script: ${id}`)

  // Execute the script
  try {
    switch (id) {
      case "adcRotate":
        await adcRotate()
        break
      case "observationExample":
        await observationExample()
        break
      case "spectrumExample":
        await spectrumExample()
        break
      default:
        return new Response("Script not found", { status: 404 })
    }

    return new Response("Script executed successfully", { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Failed to execute script", { status: 500 })
  }
}
