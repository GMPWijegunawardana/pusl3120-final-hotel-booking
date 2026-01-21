const express = require("express");
const router = express.Router();
const {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} = require("../controllers/roomController");

// CREATE room
router.post("/", createRoom);

// GET all rooms
router.get("/", getRooms);

// GET room by ID
router.get("/:id", getRoomById);

// UPDATE room
router.put("/:id", updateRoom);

// DELETE room
router.delete("/:id", deleteRoom);

module.exports = router;
