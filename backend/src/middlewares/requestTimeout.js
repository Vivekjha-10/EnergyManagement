const responseHandler = require('../shared/responseManage')
const errorCodes = require('../constant/errorCode.json')
const logger = require('../shared/log')

const setRequestTimeout = (req, res, next) => {
  res.setTimeout(Number(global.gConfig.timeout), function () {
    logger.logExceptions('setRequestTimeout', errorCodes['408'].errorMsg)
    let serviceRequestId = "setRequestTimeout"
    let response = responseHandler.constructErrorResponse({
      ServiceRequestId: serviceRequestId,
      DisplayText: errorCodes['408'].errorMsg,
      ErrorCode: errorCodes['408'].errorCode,
      ErrorMessage: errorCodes['408'].errorMsg,
    })
    return res.status(408).send(response)
  })
  return next()
}

module.exports = setRequestTimeout
