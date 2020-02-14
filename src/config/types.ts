export interface PlayerCounterFunction {
  (): void
}
export default interface Player {
  key: string,
  name: string,
  state: string,
  counter: number
  start: PlayerCounterFunction,
  reset: PlayerCounterFunction,
  stop: PlayerCounterFunction,
}