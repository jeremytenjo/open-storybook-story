module.exports = function removeFromArray(
  string,
  word,
  options = {
    split: '/',
    join: ''
  }
) {
  const index = string.split('/').findIndex((i) => i === word)
  return string
    .split(options.split)
    .slice(index + 1)
    .join(options.join)
}
