import React, {useState, useEffect} from "react";
import {useQuery} from "@apollo/client";
import {GET_EMPLOYEE_LIST_QUERY} from "../GraphQL/Queries";

function EmployeeTable() {
  const {data} = useQuery(GET_EMPLOYEE_LIST_QUERY);

  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (data) {
      setEmployeeList(data.employees);
    }
  }, [data]);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  const rows =
    employeeList.length > 0 ? (
      employeeList.map((employee) => (
        <tr key={employee.id} onClick={() => handleEmployeeClick(employee)}>
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
    <div>
      <table id="bg-color-table" className="table table-striped mt-5">
        <thead id="head-bg-color">
        <tr>
          <td className="th-font">First Name</td>
          <td className="th-font">Last Name</td>
          <td className="th-font">Age</td>
          <td className="th-font">Date of joining</td>
          <td className="th-font">Title</td>
          <td className="th-font">Department</td>
          <td className="th-font">Employee Type</td>
          <td className="th-font">Current Status</td>

        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>

    }
      {selectedEmployee && (
        <div className="modal" tabIndex="-1" role="dialog" style={{display: "block"}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{`${selectedEmployee.firstName.toUpperCase()} ${selectedEmployee.lastName.toUpperCase()}`}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Age: {selectedEmployee.age}</p>
                <p>Date of Joining: {selectedEmployee.dateOfJoining.split("T")[0]}</p>
                <p>Title: {selectedEmployee.title}</p>
                <p>Department: {selectedEmployee.department}</p>
                <p>Employee Type: {selectedEmployee.employeeType}</p>
                <p>Current Status: {selectedEmployee.currentStatus}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeTable;
