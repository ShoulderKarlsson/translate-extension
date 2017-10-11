module.exports = ({ params }, res, next) =>
  params.word.length > 0 ? next() : res.sendStatus(400)
