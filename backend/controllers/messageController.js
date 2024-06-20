const mongoose = require("mongoose");
const Message = require("../models/messageModel");

const getMessages = async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: 1 });
  res.status(200).json(messages);
};

const getMessage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Message not found!" });
  }
  const message = await Message.findById(id);
  if (!message) {
    res.status(404).json({ error: "Message not found!" });
  }
  res.status(200).json(message);
};

const createMessage = async (req, res) => {
  const { messageContent } = req.body;
  try {
    const message = await Message.create({ messageContent });
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Message not found!" });
  }
  const message = await Message.findOneAndDelete({ _id: id });
  if (!message) {
    res.status(404).json({ error: "Message not found!" });
  }
  res.status(200).json(message);
};

const updateMessage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Message not found!" });
  }
  const message = await Message.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!message) {
    res.status(404).json({ error: "Message not found!" });
  }
  res.status(200).json(message);
};

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
};
