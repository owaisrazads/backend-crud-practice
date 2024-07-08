// const mongoose = require('mongoose');
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: {
    type: "string",
    require: true
  },

  title: {
    type: "string",
    require: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

 


})

const Todos = mongoose.model('Todo', todoSchema);

export default Todos;