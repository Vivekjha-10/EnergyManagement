const { toDatetime, v1 } = require('../modules/filelogger')
var addr
require('dns').lookup(require('os').hostname(), function (err, add) {
  addr = add
  // console.log(add);
})

const contentTypeJson = async (req, res, next) => {
  if (!req.is('application/json')) {
    // Send error here
    const ServiceType = Object.keys(req.body)[0]
    const id = v1()
    res.filelog = {
      AUDITLOG_REQUEST_ID: id,
      SERVICE_NAME: ServiceType,
      REQUESTUUID: id,
      MSGFLOWNAME: ServiceType,
      CHANNELID: '',
      TIMEZONE: 'GMT 5:30',
      RQ_MESSAGEDATETIME: toDatetime(),
      CUSTOMERID: '',
      ACCNO: '',
      CARDNO: '',
      CREATEDBY: '',
      CREATEDDATE: toDatetime(),
      RQ_PAYLOAD_TP: '',
      RQ_PAYLOAD: '',
      SERREQID: id,
      SESSIONID: '',
      SERVERIP: addr,
      RS_MESSAGEDATETIME: '',
      ERRORCODE: '',
      ERRORDESC: '',
      ERRORSOURCE: '',
      ERRORTYPE: '',
      RS_PAYLOAD_TP: '',
      RS_PAYLOAD: '',
      RESPONSE_CODE: '',
      RESPONSE_STATUS: '',
    }
    req.body = ''
    res.body = { status: 400, error: 'Invalid Content type passed..' }
    // res.filelog={};
    res.status(400).send(res.body)
    next(new Error('Invalid Content Type'))
  }
  next()
}

module.exports = contentTypeJson
