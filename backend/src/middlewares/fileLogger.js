const { logger, toDatetime, logs } = require('../modules/filelogger')
const { deflate } = require('zlib')
const { promisify } = require('util')

const do_zip = promisify(deflate)

module.exports = async (req, res) => {
  res.filelog.RS_MESSAGEDATETIME = toDatetime()
  res.filelog.RS_PAYLOAD = JSON.stringify(res.body)
  res.filelog.RESPONSE_CODE = res.filelog.RESPONSE_CODE || 0
  res.filelog.RESPONSE_STATUS = res.filelog.RESPONSE_STATUS || 'SUCCESS'
  await applyCompression(res)
  logger.fl(res.filelog)
  logs.info('Request ---> ' + res.filelog.REQUESTUUID + ' ---> Completed')
}

const applyCompression = async (res) => {
  try {
    let resPayload = res.filelog.RS_PAYLOAD
      ? Buffer.from(res.filelog.RS_PAYLOAD)
      : 'NA'
    let reqPayload = res.filelog.RQ_PAYLOAD
      ? Buffer.from(res.filelog.RQ_PAYLOAD)
      : 'NA'
    res.filelog.RS_PAYLOAD = (await do_zip(resPayload)).toString('base64')
    res.filelog.RQ_PAYLOAD = (await do_zip(reqPayload)).toString('base64')
  } catch (err) {
    console.log('Exception in applyCompression', err)
  }
}
