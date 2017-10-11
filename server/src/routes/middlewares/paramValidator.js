module.exports = (req, res, next) => (
  word.length > 0 ? res.send(400) : next()
)
