const constructErrorResponse = (params) => {
  const response = {}
  response["Response"] = {
    ServiceRequestId: params.ServiceRequestId,
    Status: {
      DisplayText: params.DisplayText || '',
      ErrorCode: params.ErrorCode,
      ErrorMessage: params.ErrorMessage || '',
      StatusCode: '1',
    },
  }
  return response
}

const constructSuccessResponse = (params) => {
  const errorResponse = {}
  errorResponse["Response"] = {
    ServiceRequestId: params.ServiceRequestId,
    ResponseData: params.ResponseData,
    Status: {
      DisplayText: params.DisplayText || '',
      ErrorCode: params.ErrorCode,
      ErrorMessage: params.ErrorMessage || '',
      StatusCode: '0',
    },
  }
  return errorResponse
}

module.exports = {
  constructErrorResponse,
  constructSuccessResponse,
}
