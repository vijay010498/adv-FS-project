import React, {useState, useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_EMPLOYEE_LIST_QUERY} from "../GraphQL/Queries";
import {useNavigate} from "react-router-dom";
import {DELETE_EMPLOYEE_MUTATION} from "../GraphQL/Mutators";

function EmployeeTable({newEmployeeCreated, onResetNewEmployeeCreated, filterOptions}) {

  const navigate = useNavigate();
  let {data, refetch} = useQuery(GET_EMPLOYEE_LIST_QUERY, {
    variables: {
      filterOptions
    }
  });


  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    if (data) {
      setEmployeeList(data.employees);
    }
  }, [data]);

  useEffect(() => {
    if (newEmployeeCreated) {
      refetch().then(() => {
        onResetNewEmployeeCreated();
      });
    }
  }, [newEmployeeCreated, refetch, onResetNewEmployeeCreated]);


  useEffect(() => {
    refetch({filterOptions}).then(({data, error}) => {
      console.log("refetch-filteroptions", data);
      if (data) {
        setEmployeeList(data.employees);
      }
    })
  }, [filterOptions, refetch, data]);

  const handleEmployeeClick = (employee) => {
    navigate(`/employee/${employee.id}`);
  };

  const [deleteEmployeeMutation] = useMutation(DELETE_EMPLOYEE_MUTATION);
  const handleDelete = (employeeId) => {
    deleteEmployeeMutation({
      variables: { id: employeeId }
    }).then(() => {
      refetch();
    }).catch((error) => {
      console.error("Error deleting employee:", error);
    });
  };


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
          <td>{employee.currentStatus === 1 ? "working" : "retired"}</td>
          <td>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
          </td>
          <td>
            <button onClick={() => handleEmployeeClick(employee)}>EDIT</button>
          </td>
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
    </div>
  );
}

export default EmployeeTable;
