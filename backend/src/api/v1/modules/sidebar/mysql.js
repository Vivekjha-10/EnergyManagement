const { StatusCodes } = require("http-status-codes");
const { mysqlConnection } = require("../../../../database/mysql.connection");
const { logGeneralData, logExceptions } = require("../../../../shared/log");

class SidebarDatabase {
  async dashboard(info, options) {
    try {
      logGeneralData('dashboard before database has been call - ', info)

      const sqlProcedureCall = `call getDashboard(?, ?, ?)`;
      const dashboardDetails = await mysqlConnection(sqlProcedureCall, [
        typeof info.logged_in_user_id !== "undefined" ? info.logged_in_user_id : '',
        typeof info.logged_in_role_id !== "undefined" ? info.logged_in_role_id : '',
        typeof options.filter !== "undefined" && options.filter ? options.filter : null,
      ]);

      logGeneralData('dashboard after database has been call - ', dashboardDetails);

      let dashboard = {};
      if (typeof dashboardDetails !== "undefined" && typeof dashboardDetails[0] !== "undefined" && typeof dashboardDetails[0][0] !== "undefined") {
        if (dashboardDetails[0][0].is_valid === 0) {
          dashboard["error"] = true;
          dashboard["code"] = '017';
        }
        else {
          if (typeof dashboardDetails[1] !== "undefined" && typeof dashboardDetails[1][0] !== "undefined") {
            dashboard = JSON.parse(dashboardDetails[1][0].result);
            dashboard["error"] = false;
            dashboard["code"] = '000';
          }
          else {
            dashboard["error"] = true;
            dashboard["code"] = '018';
          }
        }
      }
      return dashboard;
    } catch (error) {
      logExceptions('dashboard database fetch issue - ', error)
      return { error: true, code: '011' }
    }
  }



  async list_department(info) {
    try {
      logGeneralData('list_department before database has been call - ', info)

      const sqlProcedureCall = `call getListOfDepartment(?, ?)`;
      const ListDepartmentDetails = await mysqlConnection(sqlProcedureCall, [
        typeof info.logged_in_user_id !== "undefined" ? info.logged_in_user_id : '',
        typeof info.logged_in_role_id !== "undefined" ? info.logged_in_role_id : ''
      ]);

      logGeneralData('list_department after database has been call - ', ListDepartmentDetails);

      console.log("ListDepartmentDetails ------- ", ListDepartmentDetails)

      let list_department = {};
      if (typeof ListDepartmentDetails !== "undefined" && typeof ListDepartmentDetails[0] !== "undefined" && typeof ListDepartmentDetails[0][0] !== "undefined") {
        if (ListDepartmentDetails[0][0].is_valid === 0) {
          list_department["error"] = true;
          list_department["code"] = '017';
        }
        else {
          if (typeof ListDepartmentDetails[1] !== "undefined" && typeof ListDepartmentDetails[1][0] !== "undefined") {
            list_department = JSON.parse(ListDepartmentDetails[1][0].result);
            list_department["error"] = false;
            list_department["code"] = '000';
          }
          else {
            list_department["error"] = true;
            list_department["code"] = '019';
          }
        }
      }
      return list_department;
    } catch (error) {
      logExceptions('list_department database fetch issue - ', error)
      return { error: true, code: '011' }
    }
  }



  async assigning_meter(info, options) {
    try {
      logGeneralData('assigning_meter before database has been call - ', info)

      const sqlProcedureCall = `call submitAssigningMeter(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const assigning_meterDetails = await mysqlConnection(sqlProcedureCall, [
        typeof info.logged_in_user_id !== "undefined" ? info.logged_in_user_id : '',
        typeof info.logged_in_role_id !== "undefined" ? info.logged_in_role_id : '',
        options.name_of_department,
        options.name_of_meter,
        options.date_of_creation,
        options.meter_number,
        options.type_of_meter,
        options.ct_ratio,
        options.multiplying_factor
      ]);

      logGeneralData('assigning_meter after database has been call - ', assigning_meterDetails);

      console.log("assigning_meterDetails ---- ", assigning_meterDetails);

      let assigning_meter = {};
      if (typeof assigning_meterDetails !== "undefined" && typeof assigning_meterDetails[0] !== "undefined" && typeof assigning_meterDetails[0][0] !== "undefined") {
        assigning_meter = assigning_meterDetails[0][0];
        assigning_meter["error"] = false;
        assigning_meter["code"] = '000';
      }

      console.log("assigning_meter  ---- ", assigning_meter);


      return assigning_meter;
    } catch (error) {
      logExceptions('assigning_meter database fetch issue - ', error)
      return { error: true, code: '011' }
    }
  }


  async assigning_meter_details(info) {
    try {
      logGeneralData('assigning_meter_details before database has been call - ', info)

      const sqlProcedureCall = `call getAssignedMeterDetails(?, ?)`;
      const AssignedMeterDetails = await mysqlConnection(sqlProcedureCall, [
        typeof info.logged_in_user_id !== "undefined" ? info.logged_in_user_id : '',
        typeof info.logged_in_role_id !== "undefined" ? info.logged_in_role_id : ''
      ]);

      logGeneralData('assigning_meter_details after database has been call - ', AssignedMeterDetails);

      let assigning_meter_details = {};
      if (typeof AssignedMeterDetails !== "undefined" && typeof AssignedMeterDetails[0] !== "undefined" && typeof AssignedMeterDetails[0][0] !== "undefined") {
        if (AssignedMeterDetails[0][0].is_valid === 0) {
          assigning_meter_details["error"] = true;
          assigning_meter_details["code"] = '017';
        }
        else {
          if (typeof AssignedMeterDetails[1] !== "undefined" && typeof AssignedMeterDetails[1][0] !== "undefined") {
            assigning_meter_details = JSON.parse(AssignedMeterDetails[1][0].result);
            assigning_meter_details["error"] = false;
            assigning_meter_details["code"] = '000';
          }
          else {
            assigning_meter_details["error"] = true;
            assigning_meter_details["code"] = '027';
          }
        }
      }
      return assigning_meter_details;
    } catch (error) {
      logExceptions('assigning_meter_details database fetch issue - ', error)
      return { error: true, code: '011' }
    }
  }


  async billing(info) {
    try {
      logGeneralData('billing before database has been call - ', info)

      const sqlProcedureCall = `call getBilling(?, ?)`;
      const BillingDetails = await mysqlConnection(sqlProcedureCall, [
        typeof info.logged_in_user_id !== "undefined" ? info.logged_in_user_id : '',
        typeof info.logged_in_role_id !== "undefined" ? info.logged_in_role_id : ''
      ]);

      logGeneralData('billing after database has been call - ', BillingDetails);

      let billing = {};
      let intials = new Object();
      billing['line_graph'] = intials;

      if (typeof BillingDetails !== "undefined" && typeof BillingDetails[0] !== "undefined" && typeof BillingDetails[0][0] !== "undefined") {
        if (BillingDetails[0][0].is_valid === 0) {
          billing["error"] = true;
          billing["code"] = '017';
        }
        else {
          if (typeof BillingDetails[1] !== "undefined" && typeof BillingDetails[1][0] !== "undefined") {
            billing['state_board_electricity'] = JSON.parse(BillingDetails[1][0].state_board_electricity);
          }
          if (typeof BillingDetails[2] !== "undefined" && typeof BillingDetails[2][0] !== "undefined") {
            billing['solar'] = JSON.parse(BillingDetails[2][0].solar);
          }
          if (typeof BillingDetails[3] !== "undefined" && typeof BillingDetails[3][0] !== "undefined") {
            billing['gas_trubine'] = JSON.parse(BillingDetails[3][0].gas_trubine);
          }
          if (typeof BillingDetails[4] !== "undefined" && typeof BillingDetails[4][0] !== "undefined") {
            billing['trubine_generator'] = JSON.parse(BillingDetails[4][0].trubine_generator);
          }
          if (typeof BillingDetails[5] !== "undefined" && typeof BillingDetails[5][0] !== "undefined") {
            billing['diesel_generator'] = JSON.parse(BillingDetails[5][0].diesel_generator);
          }
          if (typeof BillingDetails[6] !== "undefined" && typeof BillingDetails[6][0] !== "undefined") {
            billing['line_graph']['state_board_electricity'] = (JSON.parse(BillingDetails[6][0].line_graph)).state_board_electricity;
          }
          if (typeof BillingDetails[7] !== "undefined" && typeof BillingDetails[7][0] !== "undefined") {
            billing['line_graph']['solar'] = (JSON.parse(BillingDetails[7][0].line_graph)).solar;
          }
          if (typeof BillingDetails[8] !== "undefined" && typeof BillingDetails[8][0] !== "undefined") {
            billing['line_graph']['diesel_generator_set_1'] = (JSON.parse(BillingDetails[8][0].line_graph)).diesel_generator_set_1;
          }
          if (typeof BillingDetails[9] !== "undefined" && typeof BillingDetails[9][0] !== "undefined") {
            billing['line_graph']['diesel_generator_set_2'] = (JSON.parse(BillingDetails[9][0].line_graph)).diesel_generator_set_2;
          }
          if (typeof BillingDetails[10] !== "undefined" && typeof BillingDetails[10][0] !== "undefined") {
            billing['line_graph']['diesel_generator_set_3'] = (JSON.parse(BillingDetails[10][0].line_graph)).diesel_generator_set_3;
          }
          if (typeof BillingDetails[11] !== "undefined" && typeof BillingDetails[11][0] !== "undefined") {
            billing['line_graph']['diesel_generator_set_4'] = (JSON.parse(BillingDetails[11][0].line_graph)).diesel_generator_set_4;
          }
          if (typeof BillingDetails[12] !== "undefined" && typeof BillingDetails[12][0] !== "undefined") {
            billing['line_graph']['trubine_generator_set_1'] = (JSON.parse(BillingDetails[12][0].line_graph)).trubine_generator_set_1;
          }
          if (typeof BillingDetails[13] !== "undefined" && typeof BillingDetails[13][0] !== "undefined") {
            billing['line_graph']['trubine_generator_set_2'] = (JSON.parse(BillingDetails[13][0].line_graph)).trubine_generator_set_2;
          }
          if (typeof BillingDetails[14] !== "undefined" && typeof BillingDetails[14][0] !== "undefined") {
            billing['line_graph']['gas_trubine'] = (JSON.parse(BillingDetails[14][0].line_graph)).gas_trubine;
          }
          if (typeof BillingDetails[15] !== "undefined" && typeof BillingDetails[15][0] !== "undefined") {
            billing['line_graph']['others'] = (JSON.parse(BillingDetails[15][0].line_graph)).others;
          }
          if (  typeof BillingDetails[1] !== "undefined" && typeof BillingDetails[1][0] !== "undefined" ||
                typeof BillingDetails[2] !== "undefined" && typeof BillingDetails[2][0] !== "undefined" ||
                typeof BillingDetails[3] !== "undefined" && typeof BillingDetails[3][0] !== "undefined" ||
                typeof BillingDetails[4] !== "undefined" && typeof BillingDetails[4][0] !== "undefined" ||
                typeof BillingDetails[5] !== "undefined" && typeof BillingDetails[5][0] !== "undefined" ||
                typeof BillingDetails[6] !== "undefined" && typeof BillingDetails[6][0] !== "undefined" ||
                typeof BillingDetails[7] !== "undefined" && typeof BillingDetails[7][0] !== "undefined" ||
                typeof BillingDetails[8] !== "undefined" && typeof BillingDetails[8][0] !== "undefined" ||
                typeof BillingDetails[9] !== "undefined" && typeof BillingDetails[9][0] !== "undefined" ||
                typeof BillingDetails[10] !== "undefined" && typeof BillingDetails[10][0] !== "undefined" ||
                typeof BillingDetails[11] !== "undefined" && typeof BillingDetails[11][0] !== "undefined" ||
                typeof BillingDetails[12] !== "undefined" && typeof BillingDetails[12][0] !== "undefined" ||
                typeof BillingDetails[13] !== "undefined" && typeof BillingDetails[13][0] !== "undefined" ||
                typeof BillingDetails[14] !== "undefined" && typeof BillingDetails[14][0] !== "undefined" ||
                typeof BillingDetails[15] !== "undefined" && typeof BillingDetails[15][0] !== "undefined" ){
            billing["error"] = false;
            billing["code"] = '000';
          }
          else {
            billing["error"] = true;
            billing["code"] = '019';
          }
        }
      }
      return billing;
    } catch (error) {
      logExceptions('billing database fetch issue - ', error)
      return { error: true, code: '011' }
    }
  }


  async list_cost_evaluation(info) {
    try {
      logGeneralData('list_cost_evaluation before database has been call - ', info)

      const sqlProcedureCall = `call getListCostEvaluation(?, ?)`;
      const listCostEvaluationDetails = await mysqlConnection(sqlProcedureCall, [
        typeof info.logged_in_user_id !== "undefined" ? info.logged_in_user_id : '',
        typeof info.logged_in_role_id !== "undefined" ? info.logged_in_role_id : ''
      ]);

      logGeneralData('list_cost_evaluation after database has been call - ', listCostEvaluationDetails);

      console.log("listCostEvaluationDetails ------- ", listCostEvaluationDetails)

      let list_cost_evaluation = {};
      if (typeof listCostEvaluationDetails !== "undefined" && typeof listCostEvaluationDetails[0] !== "undefined" && typeof listCostEvaluationDetails[0][0] !== "undefined") {
        if (listCostEvaluationDetails[0][0].is_valid === 0) {
          list_cost_evaluation["error"] = true;
          list_cost_evaluation["code"] = '017';
        }
        else {
          if (typeof listCostEvaluationDetails[1] !== "undefined" && typeof listCostEvaluationDetails[1][0] !== "undefined") {
            list_cost_evaluation = JSON.parse(listCostEvaluationDetails[1][0].result);
            list_cost_evaluation["error"] = false;
            list_cost_evaluation["code"] = '000';
          }
          else {
            list_cost_evaluation["error"] = true;
            list_cost_evaluation["code"] = '019';
          }
        }
      }
      return list_cost_evaluation;
    } catch (error) {
      logExceptions('list_cost_evaluation database fetch issue - ', error)
      return { error: true, code: '011' }
    }
  }


  async cost_evaluation(info, options) {
    try {
      logGeneralData('cost_evaluation before database has been call - ', info)

      const sqlProcedureCall = `call submitCostEvaluation(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const costEvaluationDetails = await mysqlConnection(sqlProcedureCall, [
        typeof info.logged_in_user_id !== "undefined" ? info.logged_in_user_id : '',
        typeof info.logged_in_role_id !== "undefined" ? info.logged_in_role_id : '',
        options.generation_id,
        options.generation_name,
        options.parameter_type_id,
        options.parameter_type_name,
        options.date,
        options.parameter_value,
        options.duration_id,
        options.duration
      ]);

      logGeneralData('cost_evaluation after database has been call - ', costEvaluationDetails);

      console.log("costEvaluationDetails ---- ", costEvaluationDetails);

      let cost_evaluation = {};
      if (typeof costEvaluationDetails !== "undefined" && typeof costEvaluationDetails[0] !== "undefined" && typeof costEvaluationDetails[0][0] !== "undefined") {
        cost_evaluation = costEvaluationDetails[0][0];
        cost_evaluation["error"] = false;
        cost_evaluation["code"] = '000';
      }

      console.log("cost_evaluation  ---- ", cost_evaluation);


      return cost_evaluation;
    } catch (error) {
      logExceptions('cost_evaluation database fetch issue - ', error)
      return { error: true, code: '011' }
    }
  }


  async cost_evaluation_details(info) {
    try {
      logGeneralData('cost_evaluation_details before database has been call - ', info)

      const sqlProcedureCall = `call getCostEvaluationDetails(?, ?)`;
      const CostEvaluationDetails = await mysqlConnection(sqlProcedureCall, [
        typeof info.logged_in_user_id !== "undefined" ? info.logged_in_user_id : '',
        typeof info.logged_in_role_id !== "undefined" ? info.logged_in_role_id : ''
      ]);

      logGeneralData('cost_evaluation_details after database has been call - ', CostEvaluationDetails);

      console.log("CostEvaluationDetails ------- ", CostEvaluationDetails)

      let cost_evaluation_details = {};
      if (typeof CostEvaluationDetails !== "undefined" && typeof CostEvaluationDetails[0] !== "undefined" && typeof CostEvaluationDetails[0][0] !== "undefined") {
        if (CostEvaluationDetails[0][0].is_valid === 0) {
          cost_evaluation_details["error"] = true;
          cost_evaluation_details["code"] = '017';
        }
        else {
          if (typeof CostEvaluationDetails[1] !== "undefined" && typeof CostEvaluationDetails[1][0] !== "undefined") {
            cost_evaluation_details = JSON.parse(CostEvaluationDetails[1][0].result);
            cost_evaluation_details["error"] = false;
            cost_evaluation_details["code"] = '000';
          }
          else {
            cost_evaluation_details["error"] = true;
            cost_evaluation_details["code"] = '019';
          }
        }
      }
      return cost_evaluation_details;
    } catch (error) {
      logExceptions('cost_evaluation_details database fetch issue - ', error)
      return { error: true, code: '011' }
    }
  }


  async realtime(info, date) {
    try {
      logGeneralData('realtime before database has been call - ', info)

      const sqlProcedureCall = `call getRealtime(?, ?, ?)`;
      const realtimeDetails = await mysqlConnection(sqlProcedureCall, [
        typeof info.logged_in_user_id !== "undefined" ? info.logged_in_user_id : '',
        typeof info.logged_in_role_id !== "undefined" ? info.logged_in_role_id : '',
        date
      ]);

      logGeneralData('realtime after database has been call - ', realtimeDetails);

      console.log("realtimeDetails ------- ", realtimeDetails)

      let realtime = {};
      if (typeof realtimeDetails !== "undefined" && typeof realtimeDetails[0] !== "undefined" && typeof realtimeDetails[0][0] !== "undefined") {
        if (realtimeDetails[0][0].is_valid === 0) {
          realtime["error"] = true;
          realtime["code"] = '017';
        }
        else {
          if (typeof realtimeDetails[1] !== "undefined" && typeof realtimeDetails[1][0] !== "undefined") {
            realtime = JSON.parse(realtimeDetails[1][0].result);
            realtime["error"] = false;
            realtime["code"] = '000';
          }
          else {
            realtime["error"] = true;
            realtime["code"] = '019';
          }
        }
      }
      return realtime;
    } catch (error) {
      logExceptions('realtime database fetch issue - ', error)
      return { error: true, code: '011' }
    }
  }



  async realtime_meter(info, date, meterId) {
    try {
      logGeneralData('realtime_meter before database has been call - ', info)

      const sqlProcedureCall = `call getRealtimeMeterDetails(?, ?, ?, ?)`;
      const realtimeMeterDetails = await mysqlConnection(sqlProcedureCall, [
        typeof info.logged_in_user_id !== "undefined" ? info.logged_in_user_id : '',
        typeof info.logged_in_role_id !== "undefined" ? info.logged_in_role_id : '',
        date,
        meterId
      ]);

      logGeneralData('realtime_meter after database has been call - ', realtimeMeterDetails);

      let realtime_meter = {};
      if (typeof realtimeMeterDetails !== "undefined" && typeof realtimeMeterDetails[0] !== "undefined" && typeof realtimeMeterDetails[0][0] !== "undefined") {
        if (realtimeMeterDetails[0][0].is_valid === 0) {
          realtime_meter["error"] = true;
          realtime_meter["code"] = '017';
        }
        else {
          if (typeof realtimeMeterDetails[1] !== "undefined" && typeof realtimeMeterDetails[1] !== "undefined") {
            if (realtimeMeterDetails[1][0].is_valid_data == 0) {
              realtime_meter["list"] = [];
              realtime_meter["count"] = 0;
              realtime_meter["error"] = false;
              realtime_meter["code"] = '000';
            }
            else {
              realtime_meter["list"] = realtimeMeterDetails[2];
              realtime_meter["count"] = (realtimeMeterDetails[2]).length;
              realtime_meter["error"] = false;
              realtime_meter["code"] = '000';
            }
          }
          else {
            realtime_meter["error"] = true;
            realtime_meter["code"] = '019';
          }
        }
      }
      return realtime_meter;
    } catch (error) {
      logExceptions('realtime_meter database fetch issue - ', error)
      return { error: true, code: '011' }
    }
  }


  async report(info, options) {
    try {

      const limit = options.limit ? parseInt(options.limit) : null;
      let offset = options.offset ? parseInt(options.offset) : null;
      offset = (offset - 1) * limit;

      logGeneralData('report info before database has been call info - ', info);
      logGeneralData('report options before database has been call info - ', options);
      logGeneralData('report offset before database has been call info - ', offset);
      logGeneralData('report limit before database has been call info - ', limit);


      const sqlProcedureCall = `call getReport(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const ReportDetails = await mysqlConnection(sqlProcedureCall, [
        typeof info.logged_in_user_id !== "undefined" ? info.logged_in_user_id : '',
        typeof info.logged_in_role_id !== "undefined" ? info.logged_in_role_id : '',
        typeof options.search !== "undefined" && options.search.text ? `%${options.search.text}%` : "",
        typeof options.filter !== "undefined" && options.filter.start_date ? options.filter.start_date : null,
        typeof options.filter !== "undefined" && options.filter.end_date ? options.filter.end_date : null,
        options.sort_by ? options.sort_by : "",
        options.order_by ? options.order_by : "desc",
        offset,
        limit
      ]);

      let reports_details = {};
      if (typeof ReportDetails !== "undefined" && typeof ReportDetails[0] !== "undefined" && typeof ReportDetails[0][0] !== "undefined") {

        if (ReportDetails[0][0].is_valid === 0) {
          reports_details["error"] = true;
          reports_details["code"] = '017';
        }
        else {
          if (typeof ReportDetails[1] !== "undefined" && typeof ReportDetails[1][0] !== "undefined") {
            reports_details["energy_meter_1"] = JSON.parse(ReportDetails[1][0].result);
          }
          else {
            reports_details["energy_meter_1"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[2] !== "undefined" && typeof ReportDetails[2][0] !== "undefined") {
            reports_details["energy_meter_2"] = JSON.parse(ReportDetails[2][0].result);
          }
          else {
            reports_details["energy_meter_2"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[3] !== "undefined" && typeof ReportDetails[3][0] !== "undefined") {
            reports_details["energy_meter_3"] = JSON.parse(ReportDetails[3][0].result);
          }
          else {
            reports_details["energy_meter_3"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[4] !== "undefined" && typeof ReportDetails[4][0] !== "undefined") {
            reports_details["energy_meter_4"] = JSON.parse(ReportDetails[4][0].result);
          }
          else {
            reports_details["energy_meter_4"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[5] !== "undefined" && typeof ReportDetails[5][0] !== "undefined") {
            reports_details["energy_meter_5"] = JSON.parse(ReportDetails[5][0].result);
          }
          else {
            reports_details["energy_meter_5"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[6] !== "undefined" && typeof ReportDetails[6][0] !== "undefined") {
            reports_details["energy_meter_6"] = JSON.parse(ReportDetails[6][0].result);
          }
          else {
            reports_details["energy_meter_6"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[7] !== "undefined" && typeof ReportDetails[7][0] !== "undefined") {
            reports_details["energy_meter_7"] = JSON.parse(ReportDetails[7][0].result);
          }
          else {
            reports_details["energy_meter_7"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[8] !== "undefined" && typeof ReportDetails[8][0] !== "undefined") {
            reports_details["energy_meter_8"] = JSON.parse(ReportDetails[8][0].result);
          }
          else {
            reports_details["energy_meter_8"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[9] !== "undefined" && typeof ReportDetails[9][0] !== "undefined") {
            reports_details["energy_meter_9"] = JSON.parse(ReportDetails[9][0].result);
          }
          else {
            reports_details["energy_meter_9"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[10] !== "undefined" && typeof ReportDetails[10][0] !== "undefined") {
            reports_details["energy_meter_10"] = JSON.parse(ReportDetails[10][0].result);
          }
          else {
            reports_details["energy_meter_10"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[11] !== "undefined" && typeof ReportDetails[11][0] !== "undefined") {
            reports_details["energy_meter_11"] = JSON.parse(ReportDetails[11][0].result);
          }
          else {
            reports_details["energy_meter_11"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[12] !== "undefined" && typeof ReportDetails[12][0] !== "undefined") {
            reports_details["energy_meter_12"] = JSON.parse(ReportDetails[12][0].result);
          }
          else {
            reports_details["energy_meter_12"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[13] !== "undefined" && typeof ReportDetails[13][0] !== "undefined") {
            reports_details["energy_meter_13"] = JSON.parse(ReportDetails[13][0].result);
          }
          else {
            reports_details["energy_meter_13"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[14] !== "undefined" && typeof ReportDetails[14][0] !== "undefined") {
            reports_details["energy_meter_14"] = JSON.parse(ReportDetails[14][0].result);
          }
          else {
            reports_details["energy_meter_14"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[15] !== "undefined" && typeof ReportDetails[15][0] !== "undefined") {
            reports_details["energy_meter_15"] = JSON.parse(ReportDetails[15][0].result);
          }
          else {
            reports_details["energy_meter_15"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[16] !== "undefined" && typeof ReportDetails[16][0] !== "undefined") {
            reports_details["energy_meter_16"] = JSON.parse(ReportDetails[16][0].result);
          }
          else {
            reports_details["energy_meter_16"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[17] !== "undefined" && typeof ReportDetails[17][0] !== "undefined") {
            reports_details["energy_meter_17"] = JSON.parse(ReportDetails[17][0].result);
          }
          else {
            reports_details["energy_meter_17"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[18] !== "undefined" && typeof ReportDetails[18][0] !== "undefined") {
            reports_details["energy_meter_18"] = JSON.parse(ReportDetails[18][0].result);
          }
          else {
            reports_details["energy_meter_18"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[19] !== "undefined" && typeof ReportDetails[19][0] !== "undefined") {
            reports_details["energy_meter_19"] = JSON.parse(ReportDetails[19][0].result);
          }
          else {
            reports_details["energy_meter_19"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[20] !== "undefined" && typeof ReportDetails[20][0] !== "undefined") {
            reports_details["energy_meter_20"] = JSON.parse(ReportDetails[20][0].result);
          }
          else {
            reports_details["energy_meter_20"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[21] !== "undefined" && typeof ReportDetails[21][0] !== "undefined") {
            reports_details["energy_meter_21"] = JSON.parse(ReportDetails[21][0].result);
          }
          else {
            reports_details["energy_meter_21"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[22] !== "undefined" && typeof ReportDetails[22][0] !== "undefined") {
            reports_details["energy_meter_22"] = JSON.parse(ReportDetails[22][0].result);
          }
          else {
            reports_details["energy_meter_22"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[23] !== "undefined" && typeof ReportDetails[23][0] !== "undefined") {
            reports_details["energy_meter_23"] = JSON.parse(ReportDetails[23][0].result);
          }
          else {
            reports_details["energy_meter_23"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[24] !== "undefined" && typeof ReportDetails[24][0] !== "undefined") {
            reports_details["energy_meter_24"] = JSON.parse(ReportDetails[24][0].result);
          }
          else {
            reports_details["energy_meter_24"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[25] !== "undefined" && typeof ReportDetails[25][0] !== "undefined") {
            reports_details["energy_meter_25"] = JSON.parse(ReportDetails[25][0].result);
          }
          else {
            reports_details["energy_meter_25"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[26] !== "undefined" && typeof ReportDetails[26][0] !== "undefined") {
            reports_details["energy_meter_26"] = JSON.parse(ReportDetails[26][0].result);
          }
          else {
            reports_details["energy_meter_26"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[27] !== "undefined" && typeof ReportDetails[27][0] !== "undefined") {
            reports_details["energy_meter_27"] = JSON.parse(ReportDetails[27][0].result);
          }
          else {
            reports_details["energy_meter_27"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[28] !== "undefined" && typeof ReportDetails[28][0] !== "undefined") {
            reports_details["energy_meter_28"] = JSON.parse(ReportDetails[28][0].result);
          }
          else {
            reports_details["energy_meter_28"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[29] !== "undefined" && typeof ReportDetails[29][0] !== "undefined") {
            reports_details["energy_meter_29"] = JSON.parse(ReportDetails[29][0].result);
          }
          else {
            reports_details["energy_meter_29"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[30] !== "undefined" && typeof ReportDetails[30][0] !== "undefined") {
            reports_details["energy_meter_30"] = JSON.parse(ReportDetails[30][0].result);
          }
          else {
            reports_details["energy_meter_30"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[31] !== "undefined" && typeof ReportDetails[31][0] !== "undefined") {
            reports_details["energy_meter_31"] = JSON.parse(ReportDetails[31][0].result);
          }
          else {
            reports_details["energy_meter_31"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[32] !== "undefined" && typeof ReportDetails[32][0] !== "undefined") {
            reports_details["energy_meter_32"] = JSON.parse(ReportDetails[32][0].result);
          }
          else {
            reports_details["energy_meter_32"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[33] !== "undefined" && typeof ReportDetails[33][0] !== "undefined") {
            reports_details["energy_meter_33"] = JSON.parse(ReportDetails[33][0].result);
          }
          else {
            reports_details["energy_meter_33"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[34] !== "undefined" && typeof ReportDetails[34][0] !== "undefined") {
            reports_details["energy_meter_34"] = JSON.parse(ReportDetails[34][0].result);
          }
          else {
            reports_details["energy_meter_34"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[35] !== "undefined" && typeof ReportDetails[35][0] !== "undefined") {
            reports_details["energy_meter_35"] = JSON.parse(ReportDetails[35][0].result);
          }
          else {
            reports_details["energy_meter_35"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[36] !== "undefined" && typeof ReportDetails[36][0] !== "undefined") {
            reports_details["energy_meter_36"] = JSON.parse(ReportDetails[36][0].result);
          }
          else {
            reports_details["energy_meter_36"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[37] !== "undefined" && typeof ReportDetails[37][0] !== "undefined") {
            reports_details["energy_meter_37"] = JSON.parse(ReportDetails[37][0].result);
          }
          else {
            reports_details["energy_meter_37"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[38] !== "undefined" && typeof ReportDetails[38][0] !== "undefined") {
            reports_details["energy_meter_38"] = JSON.parse(ReportDetails[38][0].result);
          }
          else {
            reports_details["energy_meter_38"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[39] !== "undefined" && typeof ReportDetails[39][0] !== "undefined") {
            reports_details["energy_meter_39"] = JSON.parse(ReportDetails[39][0].result);
          }
          else {
            reports_details["energy_meter_39"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[40] !== "undefined" && typeof ReportDetails[40][0] !== "undefined") {
            reports_details["energy_meter_40"] = JSON.parse(ReportDetails[40][0].result);
          }
          else {
            reports_details["energy_meter_40"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[41] !== "undefined" && typeof ReportDetails[41][0] !== "undefined") {
            reports_details["energy_meter_41"] = JSON.parse(ReportDetails[41][0].result);
          }
          else {
            reports_details["energy_meter_41"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[42] !== "undefined" && typeof ReportDetails[42][0] !== "undefined") {
            reports_details["energy_meter_42"] = JSON.parse(ReportDetails[42][0].result);
          }
          else {
            reports_details["energy_meter_42"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[43] !== "undefined" && typeof ReportDetails[43][0] !== "undefined") {
            reports_details["energy_meter_43"] = JSON.parse(ReportDetails[43][0].result);
          }
          else {
            reports_details["energy_meter_43"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[44] !== "undefined" && typeof ReportDetails[44][0] !== "undefined") {
            reports_details["energy_meter_44"] = JSON.parse(ReportDetails[44][0].result);
          }
          else {
            reports_details["energy_meter_44"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[45] !== "undefined" && typeof ReportDetails[45][0] !== "undefined") {
            reports_details["energy_meter_45"] = JSON.parse(ReportDetails[45][0].result);
          }
          else {
            reports_details["energy_meter_45"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[46] !== "undefined" && typeof ReportDetails[46][0] !== "undefined") {
            reports_details["energy_meter_46"] = JSON.parse(ReportDetails[46][0].result);
          }
          else {
            reports_details["energy_meter_46"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[47] !== "undefined" && typeof ReportDetails[47][0] !== "undefined") {
            reports_details["energy_meter_47"] = JSON.parse(ReportDetails[47][0].result);
          }
          else {
            reports_details["energy_meter_47"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[48] !== "undefined" && typeof ReportDetails[48][0] !== "undefined") {
            reports_details["energy_meter_48"] = JSON.parse(ReportDetails[48][0].result);
          }
          else {
            reports_details["energy_meter_48"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[49] !== "undefined" && typeof ReportDetails[49][0] !== "undefined") {
            reports_details["energy_meter_49"] = JSON.parse(ReportDetails[49][0].result);
          }
          else {
            reports_details["energy_meter_49"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[50] !== "undefined" && typeof ReportDetails[50][0] !== "undefined") {
            reports_details["energy_meter_50"] = JSON.parse(ReportDetails[50][0].result);
          }
          else {
            reports_details["energy_meter_50"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[51] !== "undefined" && typeof ReportDetails[51][0] !== "undefined") {
            reports_details["energy_meter_51"] = JSON.parse(ReportDetails[51][0].result);
          }
          else {
            reports_details["energy_meter_51"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[52] !== "undefined" && typeof ReportDetails[52][0] !== "undefined") {
            reports_details["energy_meter_52"] = JSON.parse(ReportDetails[52][0].result);
          }
          else {
            reports_details["energy_meter_52"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[53] !== "undefined" && typeof ReportDetails[53][0] !== "undefined") {
            reports_details["energy_meter_53"] = JSON.parse(ReportDetails[53][0].result);
          }
          else {
            reports_details["energy_meter_53"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[54] !== "undefined" && typeof ReportDetails[54][0] !== "undefined") {
            reports_details["energy_meter_54"] = JSON.parse(ReportDetails[54][0].result);
          }
          else {
            reports_details["energy_meter_54"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[55] !== "undefined" && typeof ReportDetails[55][0] !== "undefined") {
            reports_details["energy_meter_55"] = JSON.parse(ReportDetails[55][0].result);
          }
          else {
            reports_details["energy_meter_55"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[56] !== "undefined" && typeof ReportDetails[56][0] !== "undefined") {
            reports_details["energy_meter_56"] = JSON.parse(ReportDetails[56][0].result);
          }
          else {
            reports_details["energy_meter_56"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[57] !== "undefined" && typeof ReportDetails[57][0] !== "undefined") {
            reports_details["energy_meter_57"] = JSON.parse(ReportDetails[57][0].result);
          }
          else {
            reports_details["energy_meter_57"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[58] !== "undefined" && typeof ReportDetails[58][0] !== "undefined") {
            reports_details["energy_meter_58"] = JSON.parse(ReportDetails[58][0].result);
          }
          else {
            reports_details["energy_meter_58"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[59] !== "undefined" && typeof ReportDetails[59][0] !== "undefined") {
            reports_details["energy_meter_59"] = JSON.parse(ReportDetails[59][0].result);
          }
          else {
            reports_details["energy_meter_59"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[60] !== "undefined" && typeof ReportDetails[60][0] !== "undefined") {
            reports_details["energy_meter_60"] = JSON.parse(ReportDetails[60][0].result);
          }
          else {
            reports_details["energy_meter_60"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[61] !== "undefined" && typeof ReportDetails[61][0] !== "undefined") {
            reports_details["energy_meter_61"] = JSON.parse(ReportDetails[61][0].result);
          }
          else {
            reports_details["energy_meter_61"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[62] !== "undefined" && typeof ReportDetails[62][0] !== "undefined") {
            reports_details["energy_meter_62"] = JSON.parse(ReportDetails[62][0].result);
          }
          else {
            reports_details["energy_meter_62"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[63] !== "undefined" && typeof ReportDetails[63][0] !== "undefined") {
            reports_details["energy_meter_63"] = JSON.parse(ReportDetails[63][0].result);
          }
          else {
            reports_details["energy_meter_63"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[64] !== "undefined" && typeof ReportDetails[64][0] !== "undefined") {
            reports_details["energy_meter_64"] = JSON.parse(ReportDetails[64][0].result);
          }
          else {
            reports_details["energy_meter_64"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[65] !== "undefined" && typeof ReportDetails[65][0] !== "undefined") {
            reports_details["energy_meter_65"] = JSON.parse(ReportDetails[65][0].result);
          }
          else {
            reports_details["energy_meter_65"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[66] !== "undefined" && typeof ReportDetails[66][0] !== "undefined") {
            reports_details["energy_meter_66"] = JSON.parse(ReportDetails[66][0].result);
          }
          else {
            reports_details["energy_meter_66"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[67] !== "undefined" && typeof ReportDetails[67][0] !== "undefined") {
            reports_details["energy_meter_67"] = JSON.parse(ReportDetails[67][0].result);
          }
          else {
            reports_details["energy_meter_67"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[68] !== "undefined" && typeof ReportDetails[68][0] !== "undefined") {
            reports_details["energy_meter_68"] = JSON.parse(ReportDetails[68][0].result);
          }
          else {
            reports_details["energy_meter_68"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[69] !== "undefined" && typeof ReportDetails[69][0] !== "undefined") {
            reports_details["energy_meter_69"] = JSON.parse(ReportDetails[69][0].result);
          }
          else {
            reports_details["energy_meter_69"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[70] !== "undefined" && typeof ReportDetails[70][0] !== "undefined") {
            reports_details["energy_meter_70"] = JSON.parse(ReportDetails[70][0].result);
          }
          else {
            reports_details["energy_meter_70"] = { "list": [], "count": 0 };
          }
          
          if (typeof ReportDetails[71] !== "undefined" && typeof ReportDetails[71][0] !== "undefined") {
            reports_details["energy_meter_71"] = JSON.parse(ReportDetails[71][0].result);
          }
          else {
            reports_details["energy_meter_71"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[72] !== "undefined" && typeof ReportDetails[72][0] !== "undefined") {
            reports_details["energy_meter_72"] = JSON.parse(ReportDetails[72][0].result);
          }
          else {
            reports_details["energy_meter_72"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[73] !== "undefined" && typeof ReportDetails[73][0] !== "undefined") {
            reports_details["energy_meter_73"] = JSON.parse(ReportDetails[73][0].result);
          }
          else {
            reports_details["energy_meter_73"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[74] !== "undefined" && typeof ReportDetails[74][0] !== "undefined") {
            reports_details["energy_meter_74"] = JSON.parse(ReportDetails[74][0].result);
          }
          else {
            reports_details["energy_meter_74"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[75] !== "undefined" && typeof ReportDetails[75][0] !== "undefined") {
            reports_details["energy_meter_75"] = JSON.parse(ReportDetails[75][0].result);
          }
          else {
            reports_details["energy_meter_75"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[76] !== "undefined" && typeof ReportDetails[76][0] !== "undefined") {
            reports_details["energy_meter_76"] = JSON.parse(ReportDetails[76][0].result);
          }
          else {
            reports_details["energy_meter_76"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[77] !== "undefined" && typeof ReportDetails[77][0] !== "undefined") {
            reports_details["energy_meter_77"] = JSON.parse(ReportDetails[77][0].result);
          }
          else {
            reports_details["energy_meter_77"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[78] !== "undefined" && typeof ReportDetails[78][0] !== "undefined") {
            reports_details["energy_meter_78"] = JSON.parse(ReportDetails[78][0].result);
          }
          else {
            reports_details["energy_meter_78"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[79] !== "undefined" && typeof ReportDetails[79][0] !== "undefined") {
            reports_details["energy_meter_79"] = JSON.parse(ReportDetails[79][0].result);
          }
          else {
            reports_details["energy_meter_79"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[80] !== "undefined" && typeof ReportDetails[80][0] !== "undefined") {
            reports_details["energy_meter_80"] = JSON.parse(ReportDetails[80][0].result);
          }
          else {
            reports_details["energy_meter_80"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[81] !== "undefined" && typeof ReportDetails[81][0] !== "undefined") {
            reports_details["energy_meter_81"] = JSON.parse(ReportDetails[81][0].result);
          }
          else {
            reports_details["energy_meter_81"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[82] !== "undefined" && typeof ReportDetails[82][0] !== "undefined") {
            reports_details["energy_meter_82"] = JSON.parse(ReportDetails[82][0].result);
          }
          else {
            reports_details["energy_meter_82"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[83] !== "undefined" && typeof ReportDetails[83][0] !== "undefined") {
            reports_details["energy_meter_83"] = JSON.parse(ReportDetails[83][0].result);
          }
          else {
            reports_details["energy_meter_83"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[84] !== "undefined" && typeof ReportDetails[84][0] !== "undefined") {
            reports_details["energy_meter_84"] = JSON.parse(ReportDetails[84][0].result);
          }
          else {
            reports_details["energy_meter_84"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[85] !== "undefined" && typeof ReportDetails[85][0] !== "undefined") {
            reports_details["energy_meter_85"] = JSON.parse(ReportDetails[85][0].result);
          }
          else {
            reports_details["energy_meter_85"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[86] !== "undefined" && typeof ReportDetails[86][0] !== "undefined") {
            reports_details["energy_meter_86"] = JSON.parse(ReportDetails[86][0].result);
          }
          else {
            reports_details["energy_meter_86"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[87] !== "undefined" && typeof ReportDetails[87][0] !== "undefined") {
            reports_details["energy_meter_87"] = JSON.parse(ReportDetails[87][0].result);
          }
          else {
            reports_details["energy_meter_87"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[88] !== "undefined" && typeof ReportDetails[88][0] !== "undefined") {
            reports_details["energy_meter_88"] = JSON.parse(ReportDetails[88][0].result);
          }
          else {
            reports_details["energy_meter_88"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[89] !== "undefined" && typeof ReportDetails[89][0] !== "undefined") {
            reports_details["energy_meter_89"] = JSON.parse(ReportDetails[89][0].result);
          }
          else {
            reports_details["energy_meter_89"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[90] !== "undefined" && typeof ReportDetails[90][0] !== "undefined") {
            reports_details["energy_meter_90"] = JSON.parse(ReportDetails[90][0].result);
          }
          else {
            reports_details["energy_meter_90"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[91] !== "undefined" && typeof ReportDetails[91][0] !== "undefined") {
            reports_details["energy_meter_91"] = JSON.parse(ReportDetails[91][0].result);
          }
          else {
            reports_details["energy_meter_91"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[92] !== "undefined" && typeof ReportDetails[92][0] !== "undefined") {
            reports_details["energy_meter_92"] = JSON.parse(ReportDetails[92][0].result);
          }
          else {
            reports_details["energy_meter_92"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[93] !== "undefined" && typeof ReportDetails[93][0] !== "undefined") {
            reports_details["energy_meter_93"] = JSON.parse(ReportDetails[93][0].result);
          }
          else {
            reports_details["energy_meter_93"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[94] !== "undefined" && typeof ReportDetails[94][0] !== "undefined") {
            reports_details["energy_meter_94"] = JSON.parse(ReportDetails[94][0].result);
          }
          else {
            reports_details["energy_meter_94"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[95] !== "undefined" && typeof ReportDetails[95][0] !== "undefined") {
            reports_details["energy_meter_95"] = JSON.parse(ReportDetails[95][0].result);
          }
          else {
            reports_details["energy_meter_95"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[96] !== "undefined" && typeof ReportDetails[96][0] !== "undefined") {
            reports_details["energy_meter_96"] = JSON.parse(ReportDetails[96][0].result);
          }
          else {
            reports_details["energy_meter_96"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[97] !== "undefined" && typeof ReportDetails[97][0] !== "undefined") {
            reports_details["energy_meter_97"] = JSON.parse(ReportDetails[97][0].result);
          }
          else {
            reports_details["energy_meter_97"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[98] !== "undefined" && typeof ReportDetails[98][0] !== "undefined") {
            reports_details["energy_meter_98"] = JSON.parse(ReportDetails[98][0].result);
          }
          else {
            reports_details["energy_meter_98"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[99] !== "undefined" && typeof ReportDetails[99][0] !== "undefined") {
            reports_details["energy_meter_99"] = JSON.parse(ReportDetails[99][0].result);
          }
          else {
            reports_details["energy_meter_99"] = { "list": [], "count": 0 };
          }

          if (typeof ReportDetails[100] !== "undefined" && typeof ReportDetails[100][0] !== "undefined") {
            reports_details["energy_meter_100"] = JSON.parse(ReportDetails[100][0].result);
          }
          else {
            reports_details["energy_meter_100"] = { "list": [], "count": 0 };
          }

          if (
            (typeof ReportDetails[1] !== "undefined" && typeof ReportDetails[1][0] !== "undefined") ||
            (typeof ReportDetails[2] !== "undefined" && typeof ReportDetails[2][0] !== "undefined") ||
            (typeof ReportDetails[3] !== "undefined" && typeof ReportDetails[3][0] !== "undefined") ||
            (typeof ReportDetails[4] !== "undefined" && typeof ReportDetails[4][0] !== "undefined") ||
            (typeof ReportDetails[5] !== "undefined" && typeof ReportDetails[5][0] !== "undefined") ||
            (typeof ReportDetails[6] !== "undefined" && typeof ReportDetails[6][0] !== "undefined") ||
            (typeof ReportDetails[7] !== "undefined" && typeof ReportDetails[7][0] !== "undefined") ||
            (typeof ReportDetails[8] !== "undefined" && typeof ReportDetails[8][0] !== "undefined") ||
            (typeof ReportDetails[9] !== "undefined" && typeof ReportDetails[9][0] !== "undefined") ||
            (typeof ReportDetails[10] !== "undefined" && typeof ReportDetails[10][0] !== "undefined") ||
            (typeof ReportDetails[11] !== "undefined" && typeof ReportDetails[11][0] !== "undefined") ||
            (typeof ReportDetails[12] !== "undefined" && typeof ReportDetails[12][0] !== "undefined") ||
            (typeof ReportDetails[13] !== "undefined" && typeof ReportDetails[13][0] !== "undefined") ||
            (typeof ReportDetails[14] !== "undefined" && typeof ReportDetails[14][0] !== "undefined") ||
            (typeof ReportDetails[15] !== "undefined" && typeof ReportDetails[15][0] !== "undefined") ||
            (typeof ReportDetails[16] !== "undefined" && typeof ReportDetails[16][0] !== "undefined") ||
            (typeof ReportDetails[17] !== "undefined" && typeof ReportDetails[17][0] !== "undefined") ||
            (typeof ReportDetails[18] !== "undefined" && typeof ReportDetails[18][0] !== "undefined") ||
            (typeof ReportDetails[19] !== "undefined" && typeof ReportDetails[19][0] !== "undefined") ||
            (typeof ReportDetails[20] !== "undefined" && typeof ReportDetails[20][0] !== "undefined") ||
            (typeof ReportDetails[21] !== "undefined" && typeof ReportDetails[21][0] !== "undefined") ||
            (typeof ReportDetails[22] !== "undefined" && typeof ReportDetails[22][0] !== "undefined") ||
            (typeof ReportDetails[23] !== "undefined" && typeof ReportDetails[23][0] !== "undefined") ||
            (typeof ReportDetails[24] !== "undefined" && typeof ReportDetails[24][0] !== "undefined") ||
            (typeof ReportDetails[25] !== "undefined" && typeof ReportDetails[25][0] !== "undefined") ||
            (typeof ReportDetails[26] !== "undefined" && typeof ReportDetails[26][0] !== "undefined") ||
            (typeof ReportDetails[27] !== "undefined" && typeof ReportDetails[27][0] !== "undefined") ||
            (typeof ReportDetails[28] !== "undefined" && typeof ReportDetails[28][0] !== "undefined") ||
            (typeof ReportDetails[29] !== "undefined" && typeof ReportDetails[29][0] !== "undefined") ||
            (typeof ReportDetails[30] !== "undefined" && typeof ReportDetails[30][0] !== "undefined") ||
            (typeof ReportDetails[31] !== "undefined" && typeof ReportDetails[31][0] !== "undefined") ||
            (typeof ReportDetails[32] !== "undefined" && typeof ReportDetails[32][0] !== "undefined") ||
            (typeof ReportDetails[33] !== "undefined" && typeof ReportDetails[33][0] !== "undefined") ||
            (typeof ReportDetails[34] !== "undefined" && typeof ReportDetails[34][0] !== "undefined") ||
            (typeof ReportDetails[35] !== "undefined" && typeof ReportDetails[35][0] !== "undefined") ||
            (typeof ReportDetails[36] !== "undefined" && typeof ReportDetails[36][0] !== "undefined") ||
            (typeof ReportDetails[37] !== "undefined" && typeof ReportDetails[37][0] !== "undefined") ||
            (typeof ReportDetails[38] !== "undefined" && typeof ReportDetails[38][0] !== "undefined") ||
            (typeof ReportDetails[39] !== "undefined" && typeof ReportDetails[39][0] !== "undefined") ||
            (typeof ReportDetails[40] !== "undefined" && typeof ReportDetails[40][0] !== "undefined") ||
            (typeof ReportDetails[41] !== "undefined" && typeof ReportDetails[41][0] !== "undefined") ||
            (typeof ReportDetails[42] !== "undefined" && typeof ReportDetails[42][0] !== "undefined") ||
            (typeof ReportDetails[43] !== "undefined" && typeof ReportDetails[43][0] !== "undefined") ||
            (typeof ReportDetails[44] !== "undefined" && typeof ReportDetails[44][0] !== "undefined") ||
            (typeof ReportDetails[45] !== "undefined" && typeof ReportDetails[45][0] !== "undefined") ||
            (typeof ReportDetails[46] !== "undefined" && typeof ReportDetails[46][0] !== "undefined") ||
            (typeof ReportDetails[47] !== "undefined" && typeof ReportDetails[47][0] !== "undefined") ||
            (typeof ReportDetails[48] !== "undefined" && typeof ReportDetails[48][0] !== "undefined") ||
            (typeof ReportDetails[49] !== "undefined" && typeof ReportDetails[49][0] !== "undefined") ||
            (typeof ReportDetails[50] !== "undefined" && typeof ReportDetails[50][0] !== "undefined") ||
            (typeof ReportDetails[51] !== "undefined" && typeof ReportDetails[51][0] !== "undefined") ||
            (typeof ReportDetails[52] !== "undefined" && typeof ReportDetails[52][0] !== "undefined") ||
            (typeof ReportDetails[53] !== "undefined" && typeof ReportDetails[53][0] !== "undefined") ||
            (typeof ReportDetails[54] !== "undefined" && typeof ReportDetails[54][0] !== "undefined") ||
            (typeof ReportDetails[55] !== "undefined" && typeof ReportDetails[55][0] !== "undefined") ||
            (typeof ReportDetails[56] !== "undefined" && typeof ReportDetails[56][0] !== "undefined") ||
            (typeof ReportDetails[57] !== "undefined" && typeof ReportDetails[57][0] !== "undefined") ||
            (typeof ReportDetails[58] !== "undefined" && typeof ReportDetails[58][0] !== "undefined") ||
            (typeof ReportDetails[59] !== "undefined" && typeof ReportDetails[59][0] !== "undefined") ||
            (typeof ReportDetails[60] !== "undefined" && typeof ReportDetails[60][0] !== "undefined") ||
            (typeof ReportDetails[61] !== "undefined" && typeof ReportDetails[61][0] !== "undefined") ||
            (typeof ReportDetails[62] !== "undefined" && typeof ReportDetails[62][0] !== "undefined") ||
            (typeof ReportDetails[63] !== "undefined" && typeof ReportDetails[63][0] !== "undefined") ||
            (typeof ReportDetails[64] !== "undefined" && typeof ReportDetails[64][0] !== "undefined") ||
            (typeof ReportDetails[65] !== "undefined" && typeof ReportDetails[65][0] !== "undefined") ||
            (typeof ReportDetails[66] !== "undefined" && typeof ReportDetails[66][0] !== "undefined") ||
            (typeof ReportDetails[67] !== "undefined" && typeof ReportDetails[67][0] !== "undefined") ||
            (typeof ReportDetails[68] !== "undefined" && typeof ReportDetails[68][0] !== "undefined") ||
            (typeof ReportDetails[69] !== "undefined" && typeof ReportDetails[69][0] !== "undefined") ||
            (typeof ReportDetails[70] !== "undefined" && typeof ReportDetails[70][0] !== "undefined") ||
            (typeof ReportDetails[71] !== "undefined" && typeof ReportDetails[71][0] !== "undefined") ||
            (typeof ReportDetails[72] !== "undefined" && typeof ReportDetails[72][0] !== "undefined") ||
            (typeof ReportDetails[73] !== "undefined" && typeof ReportDetails[73][0] !== "undefined") ||
            (typeof ReportDetails[74] !== "undefined" && typeof ReportDetails[74][0] !== "undefined") ||
            (typeof ReportDetails[75] !== "undefined" && typeof ReportDetails[75][0] !== "undefined") ||
            (typeof ReportDetails[76] !== "undefined" && typeof ReportDetails[76][0] !== "undefined") ||
            (typeof ReportDetails[77] !== "undefined" && typeof ReportDetails[77][0] !== "undefined") ||
            (typeof ReportDetails[78] !== "undefined" && typeof ReportDetails[78][0] !== "undefined") ||
            (typeof ReportDetails[79] !== "undefined" && typeof ReportDetails[79][0] !== "undefined") ||
            (typeof ReportDetails[80] !== "undefined" && typeof ReportDetails[80][0] !== "undefined") ||
            (typeof ReportDetails[81] !== "undefined" && typeof ReportDetails[81][0] !== "undefined") ||
            (typeof ReportDetails[82] !== "undefined" && typeof ReportDetails[82][0] !== "undefined") ||
            (typeof ReportDetails[83] !== "undefined" && typeof ReportDetails[83][0] !== "undefined") ||
            (typeof ReportDetails[84] !== "undefined" && typeof ReportDetails[84][0] !== "undefined") ||
            (typeof ReportDetails[85] !== "undefined" && typeof ReportDetails[85][0] !== "undefined") ||
            (typeof ReportDetails[86] !== "undefined" && typeof ReportDetails[86][0] !== "undefined") ||
            (typeof ReportDetails[87] !== "undefined" && typeof ReportDetails[87][0] !== "undefined") ||
            (typeof ReportDetails[88] !== "undefined" && typeof ReportDetails[88][0] !== "undefined") ||
            (typeof ReportDetails[89] !== "undefined" && typeof ReportDetails[89][0] !== "undefined") ||
            (typeof ReportDetails[90] !== "undefined" && typeof ReportDetails[90][0] !== "undefined") ||
            (typeof ReportDetails[91] !== "undefined" && typeof ReportDetails[91][0] !== "undefined") ||
            (typeof ReportDetails[92] !== "undefined" && typeof ReportDetails[92][0] !== "undefined") ||
            (typeof ReportDetails[93] !== "undefined" && typeof ReportDetails[93][0] !== "undefined") ||
            (typeof ReportDetails[94] !== "undefined" && typeof ReportDetails[94][0] !== "undefined") ||
            (typeof ReportDetails[95] !== "undefined" && typeof ReportDetails[95][0] !== "undefined") ||
            (typeof ReportDetails[96] !== "undefined" && typeof ReportDetails[96][0] !== "undefined") ||
            (typeof ReportDetails[97] !== "undefined" && typeof ReportDetails[97][0] !== "undefined") ||
            (typeof ReportDetails[98] !== "undefined" && typeof ReportDetails[98][0] !== "undefined") ||
            (typeof ReportDetails[99] !== "undefined" && typeof ReportDetails[99][0] !== "undefined") ||
            (typeof ReportDetails[100] !== "undefined" && typeof ReportDetails[100][0] !== "undefined")
          ) {
            reports_details["error"] = false;
            reports_details["code"] = '000';
          }
          else {
            reports_details["error"] = true;
            reports_details["code"] = '026';
          }
        }
      }

      return reports_details;
    } catch (error) {
      logExceptions('report_details database fetch issue - ', error)
      return { error: true, code: '011' }
    }
  }


}

module.exports = {
  sidebarDatabase: new SidebarDatabase()
};
