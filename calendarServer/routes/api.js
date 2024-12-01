// routes/api.js

const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const employeeController = require("../controllers/employeeController");
const holidayController = require("../controllers/holidayController");
const resourceController = require("../controllers/resourceController");
const planningsController = require("../controllers/planningsController");
const recurrencesController = require("../controllers/recurrencesController");
const groupController = require('../controllers/groupController');

// Define routes
router.get("/recurrences", recurrencesController.fetchRecurrences);
router.get("/events", eventController.getAllEvents);
router.post("/events", eventController.createEvent);
router.get("/plannings", planningsController.fetchPlannings);
router.post("/newplanning", planningsController.createPlanning);

// Route to fetch all employees
router.get("/employees", employeeController.fetchEmployees);
// Route to fetch a single employee by ID
router.get("/employees/:id", employeeController.fetchEmployeeById);
// Route to create a new employee
router.post("/employees", employeeController.createEmployee);
// Route to update an existing employee by ID
router.put("/employees/:id", employeeController.updateEmployee);
// Route to delete an employee by ID
router.delete("/employees/:id", employeeController.deleteEmployee);

router.get("/holidays", holidayController.fetchHolidays);
router.get("/resources", resourceController.fetchResources);

//groups routes
router.get('/groups', groupController.getAllGroups);
router.get('/groups/:id', groupController.getGroupById);
router.post('/groups', groupController.createGroup);
router.put('/groups/:id', groupController.updateGroup);
router.delete('/groups/:id', groupController.deleteGroup);


module.exports = router;
