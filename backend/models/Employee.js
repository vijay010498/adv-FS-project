const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  dateOfJoining: {
    type: Date
  },
  title: {
    type: String,
    enum: ['Employee', 'Manager', 'Director', 'VP'],
    default: 'Employee'
  },
  department: {
    type: String,
    enum: ['IT', 'Marketing', 'HR', 'Engineering'],
    required: true,
  },
  employeeType: {
    type: String,
    enum: ['FullTime', 'PartTime', 'Contract', 'Seasonal'],
    default: 'FullTime'
  },
  currentStatus: {
    type: Number,
    default: 1 // working
  }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      const createdAtISO = ret.createdAt;
      delete ret.createdAt;
      ret.createdAt = createdAtISO.getTime();
      const updatedAtISO = ret.updatedAt;
      delete ret.updatedAt;
      ret.updatedAt = updatedAtISO.getTime();
    },
  },
  toObject: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      const createdAtISO = ret.createdAt;
      delete ret.createdAt;
      ret.createdAt = createdAtISO.getTime();
      const updatedAtISO = ret.updatedAt;
      delete ret.updatedAt;
      ret.updatedAt = updatedAtISO.getTime();
    },
  }
});


const Employee = mongoose.model("Employee", employeeSchema);


module.exports = {
  Employee
}
