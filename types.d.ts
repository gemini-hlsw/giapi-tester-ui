export type IsdId =
  | "cover_state"
  | "adc_pos_diff"
  | "adc_pos_joint"
  | "adc_control"
  | "adc_fov"
  | "svc_enabled"
  | "vph_gr_grism"
  | "vph_zi_grism"
  | "vph_jy_grism"
  | "vph_hk_grism"
  | "shutter_g"
  | "shutter_r"
  | "shutter_z"
  | "shutter_i"
  | "obs_time_left"
  | "obs_time_total"
  | "detg_temp"
  | "detr_temp"
  | "deti_temp"
  | "detz_temp"
  | "detj_temp"
  | "dety_temp"
  | "deth_temp"
  | "detk_temp"
  | "bench_1"
  | "bench_2"
  | "bench_3"
  | "bench_4"
  | "num_shift_rows"
  | "num_abba_seq"
  | "bench_a1"
  | "bench_a2"
  | "bench_a3"
  | "bench_a4"
  | "bench_b1"
  | "bench_b2"
  | "bench_b3"
  | "bench_b4"
  | "obs_mode"
  | "obs_strategy"
  | "scorpio_health"
  | "adc_health"
  | "cryo_health"
  | "vph_gr_health"
  | "vph_hk_health"
  | "vph_jy_health"
  | "vph_zi_health"
  | "fp_health"
  | "deth_health"
  | "detk_health"
  | "detj_health"
  | "dety_health"
  | "pic_health"
  | "svc_health"
  | "detgr_health"
  | "detzi_health"
  | "obs_data_label"
  | "obs_state"
  | "obs_type"

export type IsdState = Record<IsdId, number>

export type IsdStateUpdate = {
  id: IsdId
  value: number
  timestamp: string
}

export type Theme = "light" | "dark"

export type Temperature = {
  name: string
  value: number
}

export type State = {
  name: string
  value: number | string
  type: StateType
}

export type StateType = "connection" | "state" | "health" | "mode" | "strategy"

export type Severity = "error" | "warning" | "info" | "success"

export type LogMessage = {
  message: string
  timestamp: string
}
