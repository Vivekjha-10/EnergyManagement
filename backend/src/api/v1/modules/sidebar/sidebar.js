const validator = require("validator");
const fs = require("fs");
const { sidebarDatabase } = require("./mysql");
const { generateToken, decryptString, sendEmail, encryptString, verifyToken } = require("../../../../utils/common");
const responseHandler = require('../../../../shared/responseManage')
const { logGeneralData, logExceptions } = require('../../../../shared/log')
const errorCodes = require('../../../../constant/errorCode.json')
const moment = require("moment");

class SidebarService {
  /**
   * API for fetching the dashboard
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async dashboard(token, options) {
    try {
      if (typeof options.filter === "undefined") {
        options.filter = 'week';
      }
      const dashboardDetails = await sidebarDatabase.dashboard({ logged_in_user_id: typeof token !== "undefined" ? token.user_id : null, logged_in_role_id: typeof token !== "undefined" ? token.role_id : null }, options);

      if (dashboardDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Dashboard",
          DisplayText: errorCodes[dashboardDetails.code].errorMsg,
          ErrorCode: errorCodes[dashboardDetails.code].errorCode,
          ErrorMessage: errorCodes[dashboardDetails.code].errorMsg,
        })
      }

      if (Object.keys(dashboardDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Dashboard",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      logGeneralData("Dashboard service Response - ", dashboardDetails)

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "Dashboard",
        ResponseData: dashboardDetails,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })
    } catch (error) {
      logExceptions("Dashboard service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "Dashboard",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }

  /**
   * API for fetching the list of department
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async list_department(token) {
    try {
      const list_departmentDetails = await sidebarDatabase.list_department({ logged_in_user_id: typeof token !== "undefined" ? token.user_id : null, logged_in_role_id: typeof token !== "undefined" ? token.role_id : null });

      if (list_departmentDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "List of department",
          DisplayText: errorCodes[list_departmentDetails.code].errorMsg,
          ErrorCode: errorCodes[list_departmentDetails.code].errorCode,
          ErrorMessage: errorCodes[list_departmentDetails.code].errorMsg,
        })
      }

      if (Object.keys(list_departmentDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "List of department",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      logGeneralData("list_department service Response - ", list_departmentDetails)

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "List of department",
        ResponseData: list_departmentDetails,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })
    } catch (error) {
      logExceptions("list_department service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "List of department",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }


  /**
   * API for creating the assigning_meter
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async assigning_meter(token, info) {
    try {
      if (
        !info.name_of_department ||
        !info.name_of_meter ||
        !info.date_of_creation ||
        !info.meter_number ||
        !info.type_of_meter ||
        !info.ct_ratio ||
        !info.multiplying_factor 
      ) {
        logExceptions("Assigning Meter service input error - ", errorCodes['020'].errorMsg)
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Assigning Meter",
          DisplayText: errorCodes['020'].errorMsg,
          ErrorCode: errorCodes['020'].errorCode,
          ErrorMessage: errorCodes['020'].errorMsg,
        })
      }

      const assigning_meterDetails = await sidebarDatabase.assigning_meter({ logged_in_user_id: typeof token !== "undefined" ? token.user_id : null, logged_in_role_id: typeof token !== "undefined" ? token.role_id : null }, info);

      if (assigning_meterDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Assigning Meter",
          DisplayText: errorCodes[assigning_meterDetails.code].errorMsg,
          ErrorCode: errorCodes[assigning_meterDetails.code].errorCode,
          ErrorMessage: errorCodes[assigning_meterDetails.code].errorMsg,
        })
      }

      if (Object.keys(assigning_meterDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Assigning Meter",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      if (!assigning_meterDetails.is_valid) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Assigning Meter",
          DisplayText: errorCodes["017"].errorMsg,
          ErrorCode: errorCodes["017"].errorCode,
          ErrorMessage: errorCodes["017"].errorMsg,
        })
      }


      if (assigning_meterDetails.meter_number_already) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Assigning Meter",
          DisplayText: errorCodes["021"].errorMsg,
          ErrorCode: errorCodes["021"].errorCode,
          ErrorMessage: errorCodes["021"].errorMsg,
        })
      }

      if (!assigning_meterDetails.new_meter_id) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Assigning Meter",
          DisplayText: errorCodes["022"].errorMsg,
          ErrorCode: errorCodes["022"].errorCode,
          ErrorMessage: errorCodes["022"].errorMsg,
        })
      }


      logGeneralData("Assigning Meter service Response - ", assigning_meterDetails)

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "Assigning Meter",
        ResponseData: assigning_meterDetails,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })
    } catch (error) {
      logExceptions("Assigning Meter service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "Assigning Meter",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }


  /**
   * API for fetching the list of assigning meter details
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async assigning_meter_details(token) {
    try {
      const AssigningMeterDetails = await sidebarDatabase.assigning_meter_details({ logged_in_user_id: typeof token !== "undefined" ? token.user_id : null, logged_in_role_id: typeof token !== "undefined" ? token.role_id : null });

      if (AssigningMeterDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Assigned Meter Details",
          DisplayText: errorCodes[AssigningMeterDetails.code].errorMsg,
          ErrorCode: errorCodes[AssigningMeterDetails.code].errorCode,
          ErrorMessage: errorCodes[AssigningMeterDetails.code].errorMsg,
        })
      }

      if (Object.keys(AssigningMeterDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Assigned Meter Details",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      logGeneralData("assigned_meter_details service Response - ", AssigningMeterDetails)

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "Assigned Meter Details",
        ResponseData: AssigningMeterDetails,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })
    } catch (error) {
      logExceptions("assigned_meter_details service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "Assigned Meter Details",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }


  /**
   * API for fetching the billing deatils
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async billing(token, options) {
    try {

      const BillingDetails = await sidebarDatabase.billing({ logged_in_user_id: typeof token !== "undefined" ? token.user_id : null, logged_in_role_id: typeof token !== "undefined" ? token.role_id : null });

      if (BillingDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Billing Details",
          DisplayText: errorCodes[BillingDetails.code].errorMsg,
          ErrorCode: errorCodes[BillingDetails.code].errorCode,
          ErrorMessage: errorCodes[BillingDetails.code].errorMsg,
        })
      }

      if (Object.keys(BillingDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Billing Details",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      logGeneralData("Billing service Response - ", BillingDetails)

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "Billing Details",
        ResponseData: BillingDetails,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })

    } catch (error) {
      logExceptions("Billing service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "Billing Details",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }


  /**
   * API for fetching the list of cost evaluation
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async list_cost_evaluation(token) {
    try {
      const listCostEvaluationDetails = await sidebarDatabase.list_cost_evaluation({ logged_in_user_id: typeof token !== "undefined" ? token.user_id : null, logged_in_role_id: typeof token !== "undefined" ? token.role_id : null });

      if (listCostEvaluationDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "List Cost Evaluation",
          DisplayText: errorCodes[listCostEvaluationDetails.code].errorMsg,
          ErrorCode: errorCodes[listCostEvaluationDetails.code].errorCode,
          ErrorMessage: errorCodes[listCostEvaluationDetails.code].errorMsg,
        })
      }

      if (Object.keys(listCostEvaluationDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "List Cost Evaluation",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      logGeneralData("list_cost_evaluation service Response - ", listCostEvaluationDetails)

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "List Cost Evaluation",
        ResponseData: listCostEvaluationDetails,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })
    } catch (error) {
      logExceptions("list_cost_evaluation service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "List Cost Evaluation",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }


  /**
   * API for creating the cost evaluation
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async cost_evaluation(token, info) {
    try {
      if (
        !info.generation_id ||
        !info.generation_name ||
        !info.parameter_type_id ||
        !info.parameter_type_name ||
        !info.date ||
        !info.parameter_value ||
        !info.duration_id ||
        !info.duration
      ) {
        logExceptions("Cost Evaluation service input error - ", errorCodes['023'].errorMsg)
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Cost Evaluation",
          DisplayText: errorCodes['023'].errorMsg,
          ErrorCode: errorCodes['023'].errorCode,
          ErrorMessage: errorCodes['023'].errorMsg,
        })
      }

      const costEvaluationDetails = await sidebarDatabase.cost_evaluation({ logged_in_user_id: typeof token !== "undefined" ? token.user_id : null, logged_in_role_id: typeof token !== "undefined" ? token.role_id : null }, info);

      if (costEvaluationDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Cost Evaluation",
          DisplayText: errorCodes[costEvaluationDetails.code].errorMsg,
          ErrorCode: errorCodes[costEvaluationDetails.code].errorCode,
          ErrorMessage: errorCodes[costEvaluationDetails.code].errorMsg,
        })
      }

      if (Object.keys(costEvaluationDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Cost Evaluation",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      if (!costEvaluationDetails.is_valid) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Cost Evaluation",
          DisplayText: errorCodes["017"].errorMsg,
          ErrorCode: errorCodes["017"].errorCode,
          ErrorMessage: errorCodes["017"].errorMsg,
        })
      }

      if (!costEvaluationDetails.new_cost_evalution_id) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Cost Evaluation",
          DisplayText: errorCodes["022"].errorMsg,
          ErrorCode: errorCodes["022"].errorCode,
          ErrorMessage: errorCodes["022"].errorMsg,
        })
      }

      logGeneralData("Cost Evaluation service Response - ", costEvaluationDetails)

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "Cost Evaluation",
        ResponseData: costEvaluationDetails,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })
    } catch (error) {
      logExceptions("Cost Evaluation service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "Cost Evaluation",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }



  /**
   * API for fetching the list of cost evaluation details
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async cost_evaluation_details(token) {
    try {
      const CostEvaluationDetails = await sidebarDatabase.cost_evaluation_details({ logged_in_user_id: typeof token !== "undefined" ? token.user_id : null, logged_in_role_id: typeof token !== "undefined" ? token.role_id : null });

      if (CostEvaluationDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Cost Evaluation Details",
          DisplayText: errorCodes[CostEvaluationDetails.code].errorMsg,
          ErrorCode: errorCodes[CostEvaluationDetails.code].errorCode,
          ErrorMessage: errorCodes[CostEvaluationDetails.code].errorMsg,
        })
      }

      if (Object.keys(CostEvaluationDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Cost Evaluation Details",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      logGeneralData("cost_evaluation_details service Response - ", CostEvaluationDetails)

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "Cost Evaluation Details",
        ResponseData: CostEvaluationDetails,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })
    } catch (error) {
      logExceptions("cost_evaluation_details service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "Cost Evaluation Details",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }



  /**
   * API for fetching the realtime some parameters
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async realtime(token) {
    try {
      const date = moment().format("YYYY-MM-DD");

      const realtimeDetails = await sidebarDatabase.realtime({ logged_in_user_id: typeof token !== "undefined" ? token.user_id : null, logged_in_role_id: typeof token !== "undefined" ? token.role_id : null }, date);

      if (realtimeDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Realtime Details",
          DisplayText: errorCodes[realtimeDetails.code].errorMsg,
          ErrorCode: errorCodes[realtimeDetails.code].errorCode,
          ErrorMessage: errorCodes[realtimeDetails.code].errorMsg,
        })
      }

      if (Object.keys(realtimeDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Realtime Details",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      logGeneralData("realtime service Response - ", realtimeDetails)

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "Realtime Details",
        ResponseData: realtimeDetails,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })
    } catch (error) {
      logExceptions("realtime service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "Realtime Details",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }


  /**
   * API for fetching the specific meter realtime parameters
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async realtime_meter(token, meterId) {
    try {
      if (
        !meterId
      ) {
        logExceptions("Realtime Meter service input error - ", errorCodes['025'].errorMsg)
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Realtime Meter Details",
          DisplayText: errorCodes['025'].errorMsg,
          ErrorCode: errorCodes['025'].errorCode,
          ErrorMessage: errorCodes['025'].errorMsg,
        })
      }

      const date = moment().format("YYYY-MM-DD");

      const realtimeMeterDetails = await sidebarDatabase.realtime_meter({ logged_in_user_id: typeof token !== "undefined" ? token.user_id : null, logged_in_role_id: typeof token !== "undefined" ? token.role_id : null }, date, meterId);

      if (realtimeMeterDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Realtime Meter Details",
          DisplayText: errorCodes[realtimeMeterDetails.code].errorMsg,
          ErrorCode: errorCodes[realtimeMeterDetails.code].errorCode,
          ErrorMessage: errorCodes[realtimeMeterDetails.code].errorMsg,
        })
      }

      if (Object.keys(realtimeMeterDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Realtime Meter Details",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      logGeneralData("realtime meter service Response - ", realtimeMeterDetails)

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "Realtime Meter Details",
        ResponseData: realtimeMeterDetails,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })
    } catch (error) {
      logExceptions("realtime meter service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "Realtime Meter Details",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }
 

  /**
   * API for fetching the report deatils
   * @param {*} req (json)
   * @param {*} res (json with success/failure)
   */
  async report(token, options) {
    try {

      const reportDetails = await sidebarDatabase.report({ logged_in_user_id: typeof token !== "undefined" ? token.user_id : null, logged_in_role_id: typeof token !== "undefined" ? token.role_id : null }, options);

      if (reportDetails.error) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Reports Details",
          DisplayText: errorCodes[reportDetails.code].errorMsg,
          ErrorCode: errorCodes[reportDetails.code].errorCode,
          ErrorMessage: errorCodes[reportDetails.code].errorMsg,
        })
      }

      if (Object.keys(reportDetails).length === 0) {
        return responseHandler.constructErrorResponse({
          ServiceRequestId: "Reports Details",
          DisplayText: errorCodes['008'].errorMsg,
          ErrorCode: errorCodes['008'].errorCode,
          ErrorMessage: errorCodes['008'].errorMsg,
        })
      }

      logGeneralData("reports service Response - ", reportDetails)

      return responseHandler.constructSuccessResponse({
        ServiceRequestId: "Reports Details",
        ResponseData: reportDetails,
        DisplayText: errorCodes['000'].errorMsg,
        ErrorCode: errorCodes['000'].errorCode,
        ErrorMessage: errorCodes['000'].errorMsg,
      })

    } catch (error) {
      logExceptions("Reports service issue - ", error)
      return responseHandler.constructErrorResponse({
        ServiceRequestId: "Reports Details",
        DisplayText: errorCodes['101'].errorMsg,
        ErrorCode: errorCodes['101'].errorCode,
        ErrorMessage: errorCodes['101'].errorMsg,
      })
    }
  }



}

module.exports = {
  sidebarService: new SidebarService(),
};
