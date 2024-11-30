// routes/api.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const employeeController = require('../controllers/employeeController');
const holidayController = require('../controllers/holidayController');
const resourceController = require('../controllers/resourceController');
const planningsController = require('../controllers/planningsController');
const recurrencesController = require('../controllers/recurrencesController');

// Define routes
router.get('/recurrences', recurrencesController.fetchRecurrences);
router.get('/events', eventController.getAllEvents);
router.post('/events', eventController.createEvent);
router.get('/plannings', planningsController.fetchPlannings);
router.post('/newplanning', planningsController.createPlanning);
router.get('/employees', employeeController.fetchEmployees);
router.get('/holidays', holidayController.fetchHolidays);
router.get('/resources', resourceController.fetchResources);

module.exports = router;
