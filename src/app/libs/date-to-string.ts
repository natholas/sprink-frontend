import { paddTo } from './padd-to'

export const DateToString = (date: Date) => {
  return [
    paddTo(date.getDate().toString(), 2),
    paddTo((date.getMonth() + 1).toString(), 2),
    date.getFullYear().toString()
  ].join('-')
}