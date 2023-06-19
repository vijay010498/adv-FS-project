const graphql = require('graphql');
const {Employee} = require("../models/Employee");
const {GraphQLObjectType, GraphQLString,GraphQLInt} = graphql;
const EmployeeType = require('./employee_type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        firstName: {
          type: GraphQLString
        },
        lastName: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt
        },
        dateOfJoining: {
          type: GraphQLString
        },
        title: {
          type: GraphQLString
        },
        department: {
          type: GraphQLString
        },
        employeeType: {
          type: GraphQLString
        }
      },
      resolve(parentValue, {
        firstName, lastName, age,dateOfJoining, title, department,employeeType
      }) {
        return (new Employee({
          firstName,
          lastName,
          age,
          dateOfJoining: new Date(dateOfJoining),
          title,
          department,
          employeeType
        })).save();
      }
    }
  }
})

module.exports = mutation;