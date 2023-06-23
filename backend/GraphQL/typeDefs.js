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
        employees: [Employee]
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

    type Mutation {
        createEmployee(employeeDetails: EmployeeInput): Employee
    }
    
`;

module.exports = typeDefs;