const mongoose = require("mongoose");
//Create schema
const taskSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "working", "review", "done", "archive"],
    },
    deleted: { type: Boolean, default: false },
    referenceTo: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }, //one to one optional
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);
//Create and export model
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
