const { userService } = require("./user");
const { response } = require("../../../../utils/common");
const { logGeneralData, logExceptions } = require("../../../../shared/log");

const signUp = async (req, res, next) => {
  try {
    const signUpDetails = await userService.signUp(req.body);
    logGeneralData('signUp cotroller response - ', signUpDetails)
    res.status(200).send(signUpDetails);
  } catch (error) {
    logExceptions('signUp cotroller error response - ', error)
    next(error);
  }
}

const logIn = async (req, res, next) => {
  try {
    const logInDetails = await userService.logIn(req.body, req.ipInfo);
    logGeneralData('logIn cotroller response - ', logInDetails)
    res.status(200).send(logInDetails);
  } catch (error) {
    logExceptions('logIn cotroller error response - ', error)
    next(error);
  }
}

module.exports = {
  signUp,
  logIn
};
