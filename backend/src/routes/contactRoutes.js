const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.post("/", contactController.submitContactForm);
router.get("/", contactController.getAllContacts);
router.get("/:id", contactController.getContactById);
router.put("/:id/status", contactController.updateContactStatus);
router.delete("/:id", contactController.deleteContact);

module.exports = router;