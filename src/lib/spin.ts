export type SpinState = { angle: number; velocity: number };

/** Velocity below this (deg/ms) is treated as rest, so the loop truly settles. */
const REST_THRESHOLD = 1e-4;

/**
 * Advances the hero flower's rotation one frame. Velocity decays geometrically
 * so a flick spins the flower and then eases out; `dtMs` normalisation keeps the
 * feel identical regardless of frame rate.
 */
export function stepSpin(state: SpinState, dtMs: number, friction = 0.94): SpinState {
  const decayed = state.velocity * Math.pow(friction, dtMs / 16.67);
  const velocity = Math.abs(decayed) < REST_THRESHOLD ? 0 : decayed;
  return { angle: state.angle + velocity * dtMs, velocity };
}

export function addImpulse(state: SpinState, impulse: number): SpinState {
  return { angle: state.angle, velocity: state.velocity + impulse };
}
