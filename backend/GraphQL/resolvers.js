const {Employee} = require("../models/Employee");


const resolvers = {
  Query: {
    employees: async () => {
      return await Employee.find();
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