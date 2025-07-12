const allowedHttpMethods = (req, res, next) => {
  const method = req.method
  const allowedMethods = ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']

  if (!allowedMethods.includes(method)) {
    return res.status(405).send({
      Response: {
        Status: {
          StatusCode: 1,
          ErrorCode: '405',
          ErrorMessage: 'Method Not Allowed',
          DisplayText: 'Method Not Allowed',
        }
      }
    })
  }

  next()
}
module.exports = allowedHttpMethods
