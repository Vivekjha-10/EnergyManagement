const validator = require("validator");
const fs = require("fs");
const { userDatabase } = require("../user/mysql");
const { generateToken, decryptString, sendEmail, encryptString, verifyToken } = require("../../../../utils/common");
const responseHandler = require('../../../../shared/responseManage')
const { logGeneralData, logExceptions } = require('../../../../shared/log')
const errorCodes = require('../../../../constant/errorCode.json')

class UserService {
  /**
   * API for user sign-up
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async signUp(info) {
    try {
      if (
        !info.fullname ||
        !info.email
      ) {
        logExceptions("signUp service fullname and email - ", errorCodes['005'].errorMsg)
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "SignUp",
          DisplayText: errorCodes['005'].errorMsg,
          ErrorCode: errorCodes['005'].errorCode,
          ErrorMessage: errorCodes['005'].errorMsg,
        })
      }

      if (!validator.isEmail(info.email)) {
        logExceptions("signUp service email - ", errorCodes['006'].errorMsg)
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "SignUp",
          DisplayText: errorCodes['006'].errorMsg,
          ErrorCode: errorCodes['006'].errorCode,
          ErrorMessage: errorCodes['006'].errorMsg,
        })
      }

      if (!info.password) {
        logExceptions("signUp service password - ", errorCodes['007'].errorMsg)
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "SignUp",
          DisplayText: errorCodes['007'].errorMsg,
          ErrorCode: errorCodes['007'].errorCode,
          ErrorMessage: errorCodes['007'].errorMsg,
        })
      }

      info.password = encryptString(info.password);

      const userDetails = await userDatabase.signUp(info);

      if (userDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "SignUp",
          DisplayText: errorCodes[userDetails.code].errorMsg,
          ErrorCode: errorCodes[userDetails.code].errorCode,
          ErrorMessage: errorCodes[userDetails.code].errorMsg,
        })
      }

      if (Object.keys(userDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "SignUp",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      if (!userDetails.user_id) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "SignUp",
          DisplayText: errorCodes['009'].errorMsg,
          ErrorCode: errorCodes['009'].errorCode,
          ErrorMessage: errorCodes['009'].errorMsg,
        })
      }

      if (userDetails.email_already_assigned) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "SignUp",
          DisplayText: errorCodes['010'].errorMsg,
          ErrorCode: errorCodes['010'].errorCode,
          ErrorMessage: errorCodes['010'].errorMsg,
        })
      }

      // Send notification to admin that new user has been onboarded

/*       let emailBody = fs
        .readFileSync(`${config.rootDir}/templates/email/verify-email.html`, "utf8")
        .toString();
      emailBody = emailBody.replace("$fullname", info.fullname).replace("$email", info.email);

      await sendEmail("Kindly check the email and verify the user.", emailBody); */

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "SignUp",
        ResponseData: userDetails,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })
    } catch (error) {
      logExceptions("signUp service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "SignUp",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }


  /**
   * API for user login
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async logIn(info_details, info_ip) {
    try {
      if (
        !info_details.email ||
        !info_details.password
      ) {
        logExceptions("logIn service password or email - ", errorCodes['005'].errorMsg)
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "SignUp",
          DisplayText: errorCodes['005'].errorMsg,
          ErrorCode: errorCodes['005'].errorCode,
          ErrorMessage: errorCodes['005'].errorMsg,
        })
      }

      if (!validator.isEmail(info_details.email)) {
        logExceptions("logIn service email - ", errorCodes['006'].errorMsg)
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "SignUp",
          DisplayText: errorCodes['006'].errorMsg,
          ErrorCode: errorCodes['006'].errorCode,
          ErrorMessage: errorCodes['006'].errorMsg,
        })
      }

      const userDetails = await userDatabase.getUser(info_details);

      if (userDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "LogIn",
          DisplayText: errorCodes[userDetails.code].errorMsg,
          ErrorCode: errorCodes[userDetails.code].errorCode,
          ErrorMessage: errorCodes[userDetails.code].errorMsg,
        })
      }

      if (Object.keys(userDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "LogIn",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      if (userDetails.is_verfied === 0) {
        logExceptions("logIn service user is_verfied - ", errorCodes['012'].errorMsg)
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "LogIn",
          DisplayText: errorCodes['012'].errorMsg,
          ErrorCode: errorCodes['012'].errorCode,
          ErrorMessage: errorCodes['012'].errorMsg,
        })
      }

      if (userDetails.is_deleted !== 0) {
        logExceptions("logIn service user is_deleted - ", errorCodes['013'].errorMsg)
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "LogIn",
          DisplayText: errorCodes['013'].errorMsg,
          ErrorCode: errorCodes['013'].errorCode,
          ErrorMessage: errorCodes['013'].errorMsg,
        })
      }

      if (!userDetails.password) {
        logExceptions("logIn service user response password missing - ", errorCodes['014'].errorMsg)
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "LogIn",
          DisplayText: errorCodes['014'].errorMsg,
          ErrorCode: errorCodes['014'].errorCode,
          ErrorMessage: errorCodes['014'].errorMsg,
        })
      }

      const password = decryptString(userDetails.password);

      if (password !== info_details.password) {
        logExceptions("logIn service user response password - ", errorCodes['014'].errorMsg)
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "LogIn",
          DisplayText: errorCodes['014'].errorMsg,
          ErrorCode: errorCodes['014'].errorCode,
          ErrorMessage: errorCodes['014'].errorMsg,
        })
      }


      const token = await generateToken(userDetails);

      const userData = {
        user_id: userDetails.user_id,
        role_id: userDetails.role_id,
        fullname : userDetails.fullname,
        x_auth_token: token
      };

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "LogIn",
        ResponseData: userData,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })
    } catch (error) {
      logExceptions("logIn service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "LogIn",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }



}

module.exports = {
  userService: new UserService(),
};
