const {Employee} = require("../models/Employee");


const resolvers = {
  Query: {
    employees: async (_, {filterOptions}) => {
      console.log("from-backend-employees", filterOptions);
      let query = {};

      // Apply filtering based on the provided filter options
      if (filterOptions) {
        if (filterOptions.firstName) {
          query.firstName = { $regex: new RegExp(filterOptions.firstName, "i") };
        }

        if (filterOptions.lastName) {
          query.lastName = { $regex: new RegExp(filterOptions.lastName, "i") };
        }

        if (filterOptions.dateOfJoining) {
          query.dateOfJoining = { $regex: new RegExp(filterOptions.dateOfJoining, "i") };
        }

        if (filterOptions.title) {
          query.title = { $regex: new RegExp(filterOptions.title, "i") };
        }

        if (filterOptions.department) {
          query.department = { $regex: new RegExp(filterOptions.department, "i") };
        }

        if (filterOptions.employeeType) {
          query.employeeType = { $regex: new RegExp(filterOptions.employeeType, "i") };
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
      const { dateOfJoining } = args.employeeDetails;

      const user = new Employee({
        ...args.employeeDetails,
        dateOfJoining: new Date(dateOfJoining),
      });
      await user.save();

      return user;
    },
  }
};

module.exports = resolvers;