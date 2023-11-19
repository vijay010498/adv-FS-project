const { gql } = require("apollo-server-express");

const typeDefs = gql `
    scalar Date
    
    type Employee {
        id: ID
        firstName: String
        lastName: String
        age: Int
        dateOfJoining: Date
        title: String
        department: String
        employeeType: String
        currentStatus: Int
    }

    type Query {
        employees(filterOptions: EmployeeInput): [Employee]
        employee(id: ID): Employee
    }

    input EmployeeInput {
        firstName: String
        lastName: String
        age: Int
        dateOfJoining: Date
        title: String
        department: String
        employeeType: String
        currentStatus: Int
    }
    input UpdateEmployeeInput {
        id: ID!
        title: String
        department: String
        currentStatus: Int
    }

    type Mutation {
        createEmployee(employeeDetails: EmployeeInput): Employee
#        • Create Employee Update API: Using this api update only selected fields of Employee record.
#        Only allow to modify Title, Department and CurrentStatus
#        • Delete Employee API: Using this api user can delete any selected Employee data
        updateEmployee(updateDetails: UpdateEmployeeInput): Employee
        deleteEmployee(id: ID!): Employee
    }
    
`;

module.exports = typeDefs;