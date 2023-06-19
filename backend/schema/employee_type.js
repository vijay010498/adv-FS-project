
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt,  } = graphql;


const EmployeeType = new GraphQLObjectType({
  name: 'EmployeeType',
  fields: ()=> ({
    id: {
      type: GraphQLID,
    },
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
  })
});

module.exports = EmployeeType;