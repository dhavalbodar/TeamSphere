const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      required: true,
      enum: ["SUPER_ADMIN", "ORG_ADMIN", "MANAGER", "EMPLOYEE"]
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: function () {
        return this.role !== "SUPER_ADMIN";
      },
      default: null
    },
    managerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.role === "EMPLOYEE";
      },
      default: null
    },
    isActive: {
      type: Boolean,
      default: true 
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.role !== "SUPER_ADMIN" && this.role !== "ORG_ADMIN";
      },
      default: null
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;