export function arrayFunction(to, target) {
  let set = new Set(to)
  return target.filter(type => set.has(type))
}