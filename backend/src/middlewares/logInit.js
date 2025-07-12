const { toDatetime, v1, logs } = require('../modules/filelogger')
// const _=require('underscore');
var addr
require('dns').lookup(require('os').hostname(), function (err, add) {
  addr = add
  // console.log(add);
})
module.exports = function (req, res, next) {
  const id = v1()
  // console.log(_.allKeys(req.body));
  logs.info('Request ---> ' + id + ' ---> Started')
  const ServiceType = Object.keys(req.body)[0]
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

  if (req.body) {
    res.filelog.RQ_PAYLOAD = JSON.stringify(req.body)
  }
  next()
}
