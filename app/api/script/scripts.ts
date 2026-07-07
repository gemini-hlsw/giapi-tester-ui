import { STATE_OPTIONS } from "@/helpers/state"
import { setGiapiState } from "../setGiapiState"

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function adcRotate() {
  // Rotate diff and joint adc values by 10 degrees until they reach 180 degrees, then reset to 0
  for (let i = 0; i < 9; i++) {
    await setGiapiState("adc_pos_diff", -i * 20, "double")
    await setGiapiState("adc_pos_joint", i * 20, "double")
    await wait(200) // Wait for 1 second
  }

  await wait(3000) // Wait for 1 second
  await setGiapiState("adc_pos_diff", 0, "double")
  await setGiapiState("adc_pos_joint", 0, "double")
}

export async function resetState() {
  // Reset all states to their default values
  for (const option of STATE_OPTIONS) {
    await setGiapiState(option.name, option.options[0], option.type)
  }
}

export async function observationExample() {
  await resetState()

  await wait(1000) // Wait for 1 second
  await setGiapiState("adc_fov", 1, "integer")

  await wait(1000) // Wait for 1 second
  await setGiapiState("cover_state", 1, "integer")

  await wait(1000) // Wait for 1 second
  await setGiapiState("adc_control", 0, "integer")

  await wait(1000) // Wait for 1 second
  await setGiapiState("obs_strategy", 2, "integer")

  await wait(1000) // Wait for 1 second
  await setGiapiState("shutter_g", 1, "integer")
  await setGiapiState("shutter_r", 1, "integer")
  await setGiapiState("detgr_health", 3, "integer")

  await wait(1000) // Wait for 1 second
  await setGiapiState("obs_time_total", 10, "integer")

  await wait(100) // Wait for 1 second
  for (let i = 10; i >= 0; i--) {
    await setGiapiState("obs_time_left", i, "integer")
    await wait(400) // Wait for 1 second
  }
}
