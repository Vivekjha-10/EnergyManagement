require('winston-daily-rotate-file')
const winston = require('winston')

const { createLogger, format, transports } = winston

function encodeBase64(data) {
  try {
    data = JSON.stringify({ details: data })
    return new Buffer.from(data).toString('base64')
  } catch (error) {
    return error.message
  }
}

const generalLogFormat = format.printf(({ message, timestamp }) => {
  const tagging = message.tagging || ''
  const data = encodeBase64(message.data)
  let finalLog = `|**|${
    timestamp + '|~|'+ tagging + '|~|' + data
  }`
  return finalLog
})

const exceptionFormat = format.printf(({ message, timestamp }) => {
  const funName = message.functionName || ''
  let data = ''
  if (message.data instanceof Error) {
    data = encodeBase64(message.data.message + ' ' + message.data.stack)
  } else {
    data = encodeBase64(message.data)
  }

  let finalLog = `|**|${
    timestamp + '|~|' + funName + '|~|' + data
  }`
  return finalLog
})

const generalLog = createLogger({
  transports: [
    new transports.DailyRotateFile({
      filename: global.gConfig.logsDirectory + '/general/%DATE%.log',
      zippedArchive: true,
      maxSize: '1024m',
      maxFiles: '3065d',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        generalLogFormat
      ),
    }),
  ],
})

const exceptionLogs = createLogger({
  transports: [
    new transports.DailyRotateFile({
      filename: global.gConfig.logsDirectory + '/exceptions/%DATE%.log',
      zippedArchive: true,
      maxSize: '1024m',
      maxFiles: '3065d',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        exceptionFormat
      ),
    }),
  ],
})

/**
 * This is used to Log data on console or file
 * @param {*} tagging
 * @param {*} data
 */
function logGeneralData(tagging, data) {
  try {
    //log data in file
    if (global.gConfig.log.file.general_enable == 'true') {
      generalLog.info({tagging, data })
    }
    if (global.gConfig.log.console.general_enable == 'true') {
      console.log(tagging, data)
    }
  } catch (error) {
    console.error('Error in log', error)
  }
}

/**
 * Log exception data
 * @param {*} requestUUID
 * @param {*} functionName
 * @param {*} data
 */
function logExceptions(functionName, data) {
  try {
    if (global.gConfig.log.file.exception_enable == 'true') {
      exceptionLogs.error({functionName, data })
    }
    if (global.gConfig.log.console.exception_enable == 'true') {
      console.log(functionName, data)
    }
  } catch (error) {
    console.error('Error in log', error)
  }
}

module.exports = { logGeneralData, logExceptions }
