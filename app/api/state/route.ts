import { exec } from "child_process"
import { promisify } from "util"
import { STATE_OPTIONS } from "@/helpers/state"

const execPromise = promisify(exec)
const PATH_TO_JAR = process.env.PATH_TO_JAR || "giapi-tester.jar" // Default path if not set in environment variables

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
    const { stdout, stderr } = await execPromise(
      `java -jar ${PATH_TO_JAR} -set ${STATE_OPTIONS.find((o) => o.name === key)!.ref || key} -type ${type} -value ${value}`,
    )

    // Log the stdout and stderr
    console.log(stdout)
    console.error(stderr)

    return new Response("State updated successfully", { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Failed to update state", { status: 500 })
  }
}
