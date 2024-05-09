export const compareObjects = (o1, o2) => {
  for (let i in o1) if (o1[i] !== o2[i]) return false
  return true
}