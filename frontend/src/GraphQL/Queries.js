import { gql } from "@apollo/client";

export const GET_EMPLOYEE_LIST_QUERY = gql`
    query Query {
        employees {
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