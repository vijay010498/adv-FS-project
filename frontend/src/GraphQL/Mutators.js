import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE_MUTATION = gql`
  mutation Mutation($employeeDetails: EmployeeInput) {
    createEmployee(employeeDetails: $employeeDetails) {
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
      
    }
  }
`;
