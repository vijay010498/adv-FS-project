import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEE_LIST_QUERY } from "../GraphQL/Queries";

function EmployeeTable() {
  const { data } = useQuery(GET_EMPLOYEE_LIST_QUERY);

  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    if (data) {
      setEmployeeList(data.employees);
    }
  }, [data]);

  const rows =
    employeeList.length > 0 ? (
      employeeList.map((employee) => (
        <tr key={employee.id}>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.age}</td>
          <td>{employee.dateOfJoining.split("T")[0]}</td>
          <td>{employee.title}</td>
          <td>{employee.department}</td>
          <td>{employee.employeeType}</td>
          <td>{employee.currentStatus}</td>

        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={8} className="text-center">
          <b>No record found</b>
        </td>
      </tr>
    );
  return (
    <table id="bg-color-table" className="table table-striped mt-5">
      <thead id="head-bg-color">
        <tr>
          <td class="th-font">First Name</td>
          <td class="th-font">Last Name</td>
          <td class="th-font">Age</td>
          <td class="th-font">Date of joining</td>
          <td class="th-font">Title</td>
          <td class="th-font">Department</td>
          <td class="th-font">Employee Type</td>
          <td class="th-font">Current Status</td>

        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default EmployeeTable;
