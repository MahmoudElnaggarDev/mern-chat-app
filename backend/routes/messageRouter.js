const express = require("express");
const router = express.Router();
const {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
} = require("../controllers/messageController");

router.get("/", getMessages);

router.get("/:id", getMessage);

router.post("/", createMessage);

router.delete("/:id", deleteMessage);

router.patch("/:id", updateMessage);

module.exports = router;
