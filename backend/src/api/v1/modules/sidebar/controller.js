const { sidebarService } = require("./sidebar");
const { logGeneralData, logExceptions } = require("../../../../shared/log");

const dashboard = async (req, res, next) => {
  try {
    const dashboardDetails = await sidebarService.dashboard(res.locals.token, req.query);
    logGeneralData('dashboard cotroller response - ', dashboardDetails)
    res.status(200).send(dashboardDetails);
  } catch (error) {
    logExceptions('dashboard cotroller error response - ', error)
    next(error);
  }
}

const list_department = async (req, res, next) => {
  try {
    const list_departmentDetails = await sidebarService.list_department(res.locals.token);
    logGeneralData('list_department cotroller response - ', list_departmentDetails)
    res.status(200).send(list_departmentDetails);
  } catch (error) {
    logExceptions('list_department cotroller error response - ', error)
    next(error);
  }
}

const assigning_meter = async (req, res, next) => {
  try {
    const assigningMeterDetails = await sidebarService.assigning_meter(res.locals.token, req.body);
    logGeneralData('assigning_meter cotroller response - ', assigningMeterDetails)
    res.status(200).send(assigningMeterDetails);
  } catch (error) {
    logExceptions('assigning_meter cotroller error response - ', error)
    next(error);
  }
}

const assigning_meter_details = async (req, res, next) => {
  try {
    const assigningMeterDetails = await sidebarService.assigning_meter_details(res.locals.token);
    logGeneralData('assigning_meter_details cotroller response - ', assigningMeterDetails)
    res.status(200).send(assigningMeterDetails);
  } catch (error) {
    logExceptions('assigning_meter_details cotroller error response - ', error)
    next(error);
  }
}


const billing = async (req, res, next) => {
  try {
    const billingDetails = await sidebarService.billing(res.locals.token);
    logGeneralData('billing cotroller response - ', billingDetails)
    res.status(200).send(billingDetails);
  } catch (error) {
    logExceptions('billing cotroller error response - ', error)
    next(error);
  }
}


const list_cost_evaluation = async (req, res, next) => {
  try {
    const listCostEvaluationDetails = await sidebarService.list_cost_evaluation(res.locals.token);
    logGeneralData('list_cost_evaluation cotroller response - ', listCostEvaluationDetails)
    res.status(200).send(listCostEvaluationDetails);
  } catch (error) {
    logExceptions('list_cost_evaluation cotroller error response - ', error)
    next(error);
  }
}

const cost_evaluation = async (req, res, next) => {
  try {
    const costEvaluationDetails = await sidebarService.cost_evaluation(res.locals.token, req.body);
    logGeneralData('cost_evaluation cotroller response - ', costEvaluationDetails)
    res.status(200).send(costEvaluationDetails);
  } catch (error) {
    logExceptions('cost_evaluation cotroller error response - ', error)
    next(error);
  }
}

const cost_evaluation_details = async (req, res, next) => {
  try {
    const costEvaluationDetailsDetails = await sidebarService.cost_evaluation_details(res.locals.token);
    logGeneralData('cost_evaluation_details cotroller response - ', costEvaluationDetailsDetails)
    res.status(200).send(costEvaluationDetailsDetails);
  } catch (error) {
    logExceptions('cost_evaluation_details cotroller error response - ', error)
    next(error);
  }
}


const report = async (req, res, next) => {
  try {
    const reportDetails = await sidebarService.report(res.locals.token, req.query);
    logGeneralData('report cotroller response - ', reportDetails)
    res.status(200).send(reportDetails);
  } catch (error) {
    logExceptions('report cotroller error response - ', error)
    next(error);
  }
}


const realtime = async (req, res, next) => {
  try {
    const realtimeDetails = await sidebarService.realtime(res.locals.token);
    logGeneralData('realtime cotroller response - ', realtimeDetails)
    res.status(200).send(realtimeDetails);
  } catch (error) {
    logExceptions('realtime cotroller error response - ', error)
    next(error);
  }
}


const realtime_meter = async (req, res, next) => {
  try {
    const realtimeMeterDetails = await sidebarService.realtime_meter(res.locals.token, req.params.meterId);
    logGeneralData('realtime_meter cotroller response - ', realtimeMeterDetails)
    res.status(200).send(realtimeMeterDetails);
  } catch (error) {
    logExceptions('realtime_meter cotroller error response - ', error)
    next(error);
  }
}


module.exports = {
  dashboard,
  assigning_meter,
  list_department,
  billing,
  cost_evaluation,
  cost_evaluation_details,
  report,
  realtime,
  list_cost_evaluation,
  realtime_meter,
  assigning_meter_details
};
