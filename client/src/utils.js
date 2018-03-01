export function truncate (string, length = 100) {
  if (string.length > length) {
    return `${string.substr(0, length)}...`
  } else {
    return string
  }
}
