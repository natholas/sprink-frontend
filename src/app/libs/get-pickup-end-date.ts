import { paddTo } from "./padd-to"

const serverToString = (min: number) => {
  let hours = Math.floor(min / 60)
  let minutes = (min % 60)
  return `${paddTo(hours.toString(), 2)}:${paddTo(minutes.toString(), 2)}`
}

const stringToServer = (time: string): number => {
  let hours = parseInt(time.substring(0, 2))
  let minutes = parseInt(time.substring(3, 5))
  return hours * 60 + minutes
}

export const getPickupEndDate = (time: string, duration: number = 0) => {
  if (!time) return ''
  let endDate = stringToServer(time) + duration
  if (endDate > 1439) endDate = 1439
  return serverToString(endDate)
}