const notFound = (req, res, next) => {
  res.status(404).send({
    Response: {
      Status: {
        StatusCode: 1,
        ErrorCode: '404',
        ErrorMessage: 'Request URL Not found',
        DisplayText: 'Request URL Not found',
      },
    },
  })

  next()
}

module.exports = notFound
