const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");
const fs = require("fs");
const tmp = require("tmp");
const config = require("../config/config")

const response = (msg, data = {}) => {
  const details = {
    message: msg,
    data
  };
  return details;
};

const generateToken = tokenData => {
  const token = jwt.sign({ data: tokenData }, config.jwtTokenKey);
  return token;
};

const generateRefreshToken = tokenData => {
  const refreshToken = jwt.sign({ data: tokenData }, "1d", {
    expiresIn: "1d"
  });
  return refreshToken;
};

const verifyToken = token => {
  try {
    const decodedData = jwt.verify(token, config.jwtTokenKey);
    return decodedData;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      err.message = "User Session Expired";
      err.status = 401;
      throw err;
    }
    throw err;
  }
};

const verifyTokenWithoutExpiration = token => {
  try {
    const decodedData = jwt.verify(token, config.jwtTokenKey, { ignoreExpiration: true });
    return decodedData;
  } catch (err) {
    throw err;
  }
};

const verifyRefreshToken = token => {
  try {
    const decodedData = jwt.verify(token, config.jwtTokenKey);
    return decodedData;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      err.status = 403;
      throw err;
    }
    throw err;
  }
};

const encryptString = rawString => {
  const encryptedString = CryptoJS.AES.encrypt(rawString, config.cryptoKey).toString();
  return encryptedString;
};

const decryptString = encryptedString => {
  const decryptedString = CryptoJS.AES.decrypt(encryptedString, config.cryptoKey);
  const rawString = decryptedString.toString(CryptoJS.enc.Utf8);
  return rawString;
};

const encryptData = data => {
  const dataString = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(dataString, config.cryptoKey).toString();
  return encryptedData;
};

const decryptData = async data => {
  const decrypted = CryptoJS.AES.decrypt(data, config.cryptoKey);
  const decryptedData = await JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

const encryptRequestData = async data => {
  if (config.encryption === "true") {
    const dataString = JSON.stringify(data);
    const encryptedReq = await CryptoJS.AES.encrypt(dataString, config.cryptoKey);
    return { encrypted_res: encryptedReq.toString() };
  }
  return data;
};

const decryptRequestData = async data => {
  try {
    if (config.encryption === "true") {
      const decrypted = await CryptoJS.AES.decrypt(data, config.cryptoKey);
      if (decrypted) {
        const requestInfo = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        return requestInfo;
      }
      return data;
    }
    return data;
  } catch (err) {
    return err;
  }
};

const sendEmail = async (subject, body) => {
  const transporter = nodemailer.createTransport({
    name: config.SMTPHost,
    host: config.SMTPHost,
    port: 465,
    secure: true,
    auth: {
      user: config.SMTPEmail,
      pass: config.SMTPPassword
    }
  });
  const mailOptions = {
    from: `${config.SMTPFromName}<${config.SMTPEmail}>`,
    to: `ajuvis1999@gmail.com`,
    subject,
    html: body
  };

  try {
    const emailDetails = await transporter.sendMail(mailOptions);
    return emailDetails;
  } catch (error) {
    return "";
  }
};

const validateFileType = info => {
  try {
    if (
      info.type !== "png" ||
      info.type !== "jpg" ||
      info.type !== "jpeg" ||
      info.type !== "gif" ||
      info.type !== "webp" ||
      info.type !== "bmp" ||
      info.type !== "svg"
    ) {
      return 1;
    }
    return 1;
  } catch (error) {
    return 0;
  }
};

const AWSS3Connection = new AWS.S3({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecretAccessKey
});

const s3FileUpload = async info => {
  try {
    const params = {
      Bucket: config.awsS3AssetsBucket,
      Key: info.path,
      Body: info.file.data,
      ContentType: info.file.mimetype,
      ACL: "public-read"
    };
    const s3BucketFileLocation = await AWSS3Connection.upload(params).promise();
    return s3BucketFileLocation;
  } catch (error) {
    return "";
  }
};

const s3FileDelete = async info => {
  try {
    const params = {
      Bucket: config.awsS3AssetsBucket,
      Key: info.path
    };
    const s3BucketFileLocation = await AWSS3Connection.deleteObject(params).promise();
    return s3BucketFileLocation;
  } catch (error) {
    return "";
  }
};

const fileUpload = async info => {
  try {
    const fileRootDir = `${config.rootDir}/public/`;
    const fileDir = `${fileRootDir}${info.path}`;
    const tmpobj = tmp.dirSync();
    const tmpDir = tmpobj.name;
    const tempFilePath = `${tmpDir}/${info.name}`;
    if (info.is_base64) {
      const base64 = info.file.split(";base64,")[1];
      const fileBuffer = Buffer.from(base64, "base64");
      await fs.writeFileSync(tempFilePath, fileBuffer, "utf8");
    } else {
      await info.file.mv(tempFilePath);
    }
    const fileContent = await fs.readFileSync(tempFilePath);
    if (!await fs.existsSync(fileDir)) {
      await fs.mkdirSync(fileDir, { recursive: true });
    }
    await fs.writeFileSync(`${fileDir}${info.name}`, fileContent, "utf8");
    await fs.unlinkSync(tempFilePath);
    return 1;
  } catch (error) {
    return 0;
  }
};

const s3copy = async info => {
  try {
    var params = {
      Bucket: config.awsS3AssetsBucket, /* Another bucket working fine */
      CopySource: config.thumbnail, /* required */
      Key: `${config.awsS3NFTDir}${info}/thumbnail.png`,
      ACL: "public-read"
    };
    AWSS3Connection.copyObject(params, function (err, data) {
      if (err)
        console.log(err, err); // an error occurred
      else {
        console.log(data); // successful response
        return 1;
      }
    });
  } catch (error) {
    return "";
  }
};


module.exports = {
  response,
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyTokenWithoutExpiration,
  verifyRefreshToken,
  encryptString,
  decryptString,
  encryptData,
  decryptData,
  encryptRequestData,
  decryptRequestData,
  sendEmail,
  validateFileType,
  s3FileUpload,
  s3FileDelete,
  fileUpload,
  s3copy
};
