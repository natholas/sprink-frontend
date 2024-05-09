export const paddTo = (string: string, length: number) => {
  while (string.length < length) {
    string = '0' + string
  }
  return string
}