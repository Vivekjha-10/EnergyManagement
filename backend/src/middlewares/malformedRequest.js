const express = require('express')

const malformedRequest = (req, res, next) => {
  express.json()(req, res, (err) => {
    if (err) {
      return res.status(400).send({
        Response: {
          Status: {
            StatusCode: 1,
            ErrorCode: '400',
            ErrorMessage: 'Malformed Request',
            DisplayText: 'Invalid input provided in request..',
          },
        },
      })
    }
    next()
  })
}

module.exports = malformedRequest
