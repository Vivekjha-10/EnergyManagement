const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const { response, verifyToken, generateToken, decryptRequestData } = require("../utils/common");
const responseHandler = require('../shared/responseManage')
const errorCodes = require('../constant/errorCode.json')

const validateToken = async (req, res, next) => {
  const { headers } = req;
  try {
    if (headers["x-auth-token"]) {
      const tokenDecryptInfo = await verifyToken(headers["x-auth-token"]);
      if (tokenDecryptInfo.data) {
        res.locals.token = tokenDecryptInfo.data;
        const token = await generateToken(tokenDecryptInfo.data);
        res.header("x-auth-token", token);
        next();
      } else {
        res.status(StatusCodes.UNAUTHORIZED).send(
          responseHandler.constructErrorResponse({
            ServiceRequestId: "validateToken",
            DisplayText: errorCodes['015'].errorMsg,
            ErrorCode: errorCodes['015'].errorCode,
            ErrorMessage: errorCodes['015'].errorMsg,
          })
        );
      }
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send(
        responseHandler.constructErrorResponse({
          ServiceRequestId: "validateToken",
          DisplayText: errorCodes['016'].errorMsg,
          ErrorCode: errorCodes['016'].errorCode,
          ErrorMessage: errorCodes['016'].errorMsg,
        })
      );
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
      responseHandler.constructErrorResponse({
        ServiceRequestId: "validateToken",
        DisplayText: e.message,
        ErrorCode: '888',
        ErrorMessage: e.message,
      })
    );
  }
};


const decryptRequest = async (req, res, next) => {
  try {
    if (req.body) {
      const data = req.body.encrypted_req ? req.body.encrypted_req : req.body;
      const requestData = await decryptRequestData(data);
      res.locals.requestBody = requestData;
      res.locals.requestFiles = req.files;
      next();
    } else {
      res.status(StatusCodes.BAD_REQUEST);
      res.send(
        response(
          ReasonPhrases.BAD_REQUEST,
          {}
        )
      );
    }
  } catch (error) {
    next(error);
  }
}; 

const setToken = async (req, res, next) => {
  const { headers } = req;
  try {
    if (headers["x-auth-token"]) {
      const tokenDecryptInfo = await verifyToken(headers["x-auth-token"]);
      if (tokenDecryptInfo.data) {
        res.locals.token = tokenDecryptInfo.data;
        const token = await generateToken(tokenDecryptInfo.data);
        res.header("x-auth-token", token);
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.send(
      response(
        e.message,
        {}
      )
    );
  }
};

/* const validateSuperAdmin = (req, res, next) => {
  try {
    if (res.locals.token.role_id === 1) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN);
      res.send(
        response(
          message.forbidden,
          {}
        )
      );
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.send(
      response(
        e.message,
        {}
      )
    );
  }
};

const validateAdmin = (req, res, next) => {
  try {
    if (res.locals.token.role_id === 2) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN);
      res.send(
        response(
          message.forbidden,
          {}
        )
      );
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.send(
      response(
        e.message,
        {}
      )
    );
  }
};

const validateSuperAdminOrAdmin = (req, res, next) => {
  try {
    if (res.locals.token.role_id === 1 || res.locals.token.role_id === 2) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN);
      res.send(
        response(
          message.forbidden,
          {}
        )
      );
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.send(
      response(
        e.message,
        {}
      )
    );
  }
}; */


module.exports = {
  setToken,
  decryptRequest,
  validateToken
}
