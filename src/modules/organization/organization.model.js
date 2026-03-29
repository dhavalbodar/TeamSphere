const mongoose = require("mongoose");
const { Schema } = mongoose;
 
const organizationSchema = new Schema(
  {
    organizationName: {
      type: String,
      required: true,
      trim: true
    },
    organizationDescription: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;