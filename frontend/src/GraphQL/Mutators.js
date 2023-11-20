import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE_MUTATION = gql`
    mutation CreateEmployee($employeeDetails: EmployeeInput!) {
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

export const UPDATE_EMPLOYEE_MUTATION = gql`
    mutation UpdateEmployee($updateDetails: UpdateEmployeeInput!) {
        updateEmployee(updateDetails: $updateDetails) {
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

export const DELETE_EMPLOYEE_MUTATION = gql`
    mutation DeleteEmployee($id: ID!) {
        deleteEmployee(id: $id) {
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
