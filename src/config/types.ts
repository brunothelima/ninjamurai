export interface PlayerCounterFunction {
  (): void
}

export interface PlayerSetStateFunction {
  (state: string): void
}

export default interface Player {
  key: string,
  name: string,
  state: string,
  setState: PlayerSetStateFunction,
  counter: number
  start: PlayerCounterFunction,
  reset: PlayerCounterFunction,
  stop: PlayerCounterFunction,
}