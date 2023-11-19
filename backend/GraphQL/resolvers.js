const {Employee} = require("../models/Employee");


const resolvers = {
  Query: {
    employees: async (_, {filterOptions}) => {
      console.log("from-backend-employees", filterOptions);
      let query = {};

      // Apply filtering based on the provided filter options
      if (filterOptions) {
        if (filterOptions.firstName) {
          query.firstName = {$regex: new RegExp(filterOptions.firstName, "i")};
        }

        if (filterOptions.lastName) {
          query.lastName = {$regex: new RegExp(filterOptions.lastName, "i")};
        }

        if (filterOptions.dateOfJoining) {
          query.dateOfJoining = {$regex: new RegExp(filterOptions.dateOfJoining, "i")};
        }

        if (filterOptions.title) {
          query.title = {$regex: new RegExp(filterOptions.title, "i")};
        }

        if (filterOptions.department) {
          query.department = {$regex: new RegExp(filterOptions.department, "i")};
        }

        if (filterOptions.employeeType) {
          query.employeeType = {$regex: new RegExp(filterOptions.employeeType, "i")};
        }

        if (filterOptions.currentStatus) {
          query.currentStatus = filterOptions.currentStatus;
        }
      }

      return await Employee.find(query);
    },

    employee: async (parent, args, contextValue, info) => {
      return await Employee.findById(args.id)
    }
  },

  Mutation: {
    createEmployee: async (parent, args, context, info) => {
      console.log(args);
      const {dateOfJoining} = args.employeeDetails;

      const user = new Employee({
        ...args.employeeDetails,
        dateOfJoining: new Date(dateOfJoining),
      });
      await user.save();

      return user;
    },

    updateEmployee: async (parent, args, context, info) => {
      console.log('args-updateEmployee', args);
      const {id, title, department, currentStatus} = args.updateDetails;
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error('No Employee Found');
      }

      if (title === undefined && department === undefined && currentStatus === undefined) {
        throw new Error("Can't update with empty title, department, and currentStatus");
      }

      let updateQuery = {};

      if (title !== undefined) {
        updateQuery.title = title;
      }
      if (department !== undefined) {
        updateQuery.department = department;
      }
      if (currentStatus !== undefined) {
        updateQuery.currentStatus = currentStatus;
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(id, updateQuery,{new: true});
      return updatedEmployee;
    },

    deleteEmployee: async (parent, args, context, info) => {
      const {id} = args;

      const employee = await Employee.findById(id);

      if (!employee) {
        throw new Error('No Employee Found');
      }

      await Employee.findByIdAndDelete(id);

      return employee;

    }

  },


};

module.exports = resolvers;