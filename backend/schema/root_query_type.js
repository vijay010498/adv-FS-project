const {GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLID} = require("graphql");
const {Employee} = require("../models/Employee");
const EmployeeType = require('./employee_type')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve() {
        return Employee.find({})
      }
    },
    employee: {
      type: EmployeeType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parentValue, {id}) {
        return  Employee.findById(id);
      }
    }
  })
})

module.exports = RootQuery;