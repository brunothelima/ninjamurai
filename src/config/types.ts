export interface PlayerCounterFunctionType {
  (): void
}

export interface PlayerSetStateFunctionType {
  (state: string): void
}

export default interface PlayerType {
  key: string,
  name: string,
  state: string,
  setState: PlayerSetStateFunctionType,
  counter: number
  start: PlayerCounterFunctionType,
  reset: PlayerCounterFunctionType,
  stop: PlayerCounterFunctionType,
}