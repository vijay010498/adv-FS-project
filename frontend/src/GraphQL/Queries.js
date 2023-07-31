import { gql } from "@apollo/client";

export const GET_EMPLOYEE_LIST_QUERY = gql`
    query GetEmployees($filterOptions: EmployeeInput) {
        employees(filterOptions: $filterOptions) {
            id
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

export const GET_EMPLOYEE_BY_ID = gql`
    query Employee($id: ID!) {
        employee(id: $id) {
            id
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