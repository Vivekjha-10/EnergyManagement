const express = require("express");
const { Router } = express;
const router = new Router();

const controller = require("./controller");
const { decryptRequest, setToken, validateToken } = require("../../../../middlewares/authentication")

router.post("/dashboard", decryptRequest, validateToken, controller.dashboard);

router.post("/list-department", decryptRequest, validateToken, controller.list_department);
router.post("/assigning-meter", decryptRequest, validateToken, controller.assigning_meter);
router.post("/assigning-meter-details", decryptRequest, validateToken, controller.assigning_meter_details);

router.post("/billing", decryptRequest, validateToken, controller.billing);

router.post("/list-cost-evaluation", decryptRequest, validateToken, controller.list_cost_evaluation);
router.post("/cost-evaluation", decryptRequest, validateToken, controller.cost_evaluation);
router.post("/cost-evaluation-details", decryptRequest, validateToken, controller.cost_evaluation_details);

router.post("/report", decryptRequest, validateToken, controller.report);

router.post("/realtime", decryptRequest, validateToken, controller.realtime);
router.post("/realtime-meter/:meterId", decryptRequest, validateToken, controller.realtime_meter);

module.exports = router;
