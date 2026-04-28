// SRS scheduling constants

export const SRS_DAY_MS = 20 * 60 * 60 * 1000;
export const SRS_AGAIN_MS = 5 * 60 * 1000;
export const SRS_UNCERTAIN_MIN_MS = 60 * 60 * 1000;
export const SRS_UNCERTAIN_CAP_MS = SRS_UNCERTAIN_MIN_MS;
export const SRS_UNSPACED_RECOVERY_MS = SRS_UNCERTAIN_MIN_MS;
export const SRS_GUIDE_STEPS_DAYS = [1, 3, 5, 7];
export const SRS_NEAR_WINDOW_MS = 30 * 60 * 1000;
export const SRS_CYCLE_ADVANCE_MS = 60 * 60 * 1000;
