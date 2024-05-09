export const StringToDate = (string: string) => {
  let array = string.split('-')
  let date = new Date()
  date.setFullYear(parseInt(array[2]))
  date.setMonth(parseInt(array[1]) - 1)
  date.setDate(parseInt(array[0]))
  return date
}