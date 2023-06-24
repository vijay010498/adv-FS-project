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
