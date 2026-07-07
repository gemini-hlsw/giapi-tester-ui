import { STATE_OPTIONS } from "@/helpers/state"
import { exec } from "child_process"
import { promisify } from "util"

const execPromise = promisify(exec)
const PATH_TO_JAR = process.env.PATH_TO_JAR || "giapi-tester.jar" // Default path if not set in environment variables

export async function setGiapiState(key: string, value: number, type: string) {
  const { stdout, stderr } = await execPromise(
    `java -jar ${PATH_TO_JAR} -set ${STATE_OPTIONS.find((o) => o.name === key)!.ref || key} -type ${type} -value ${value}`,
  )

  // Log the stdout and stderr
  console.log(stdout)
  console.error(stderr)
}
