import React, {useState, useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_EMPLOYEE_LIST_QUERY} from "../GraphQL/Queries";
import {useNavigate} from "react-router-dom";
import {DELETE_EMPLOYEE_MUTATION} from "../GraphQL/Mutators";

function EmployeeTable({newEmployeeCreated, onResetNewEmployeeCreated, filterOptions, onlyUpcomingRetirement}) {

  const navigate = useNavigate();
  let {data, refetch} = useQuery(GET_EMPLOYEE_LIST_QUERY, {
    variables: {
      filterOptions
    }
  });


  const [employeeList, setEmployeeList] = useState([]);
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [upcomingRetEmployees, setUpcomingRetEmployees] = useState([]);
  const [showUpcomingRetirement, setShowUpcomingRetirement] = useState(false);

  useEffect(() => {
    if (data) {
      const onlyRetEmployees = getUpcomingRetirementEmployees(data.employees);
      if (onlyUpcomingRetirement) {
        setEmployeeList(onlyRetEmployees);
      } else {
        setEmployeeList(data.employees);
      }
    }
  }, [data, onlyUpcomingRetirement]);

  useEffect(() => {
    refetch({filterOptions}).then(({data, error}) => {
      if (data) {
        const onlyRetEmployees = getUpcomingRetirementEmployees(data.employees);
        if (onlyUpcomingRetirement) {
          setEmployeeList(onlyRetEmployees);
        } else {
          setEmployeeList(data.employees);
        }
      }
    })
  }, [filterOptions, refetch, data]);



  useEffect(() => {
    if (newEmployeeCreated) {
      refetch().then(() => {
        onResetNewEmployeeCreated();
      });
    }
  }, [newEmployeeCreated, refetch, onResetNewEmployeeCreated]);


  const handleEmployeeClick = (employee) => {
    navigate(`/employee/${employee.id}`);
  };

  const [deleteEmployeeMutation] = useMutation(DELETE_EMPLOYEE_MUTATION);
  const handleDelete = (employeeId) => {
    deleteEmployeeMutation({
      variables: {id: employeeId}
    }).then(() => {
      refetch();
    }).catch((error) => {
      if (error.message === "CAN’T DELETE EMPLOYEE STATUS ACTIVE") {
        setErrorModalMessage(error.message);
        setShowErrorModal(true);
      } else {
        console.error("Error deleting employee:", error.message);
      }
    });
  };

  const getUpcomingRetirementEmployees = (employeeList) => {
    const today = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(today.getMonth() + 6);

    const upcomingRetirementEmployees = employeeList.filter((employee) => {
      const dateOfJoining = new Date(employee.dateOfJoining);
      const ageAtJoining = employee.age;

      const retirementAge = 65;

      const retirementYear = dateOfJoining.getFullYear() + retirementAge - ageAtJoining;
      const retirementDate = new Date(retirementYear, dateOfJoining.getMonth(), dateOfJoining.getDate());

      return (
        retirementDate > today && retirementDate <= sixMonthsFromNow
      );
    });

    return upcomingRetirementEmployees;
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };

  const upcomingRetirementRows = upcomingRetEmployees.length > 0 ? (
    upcomingRetEmployees.map((employee) => (
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
        <b>No Upcoming retirement employees</b>
      </td>
    </tr>
  );

  const handleAllEmployeesTabClick = () => {
    setShowUpcomingRetirement(false);
  };
  const handleUpcomingRetirementTabClick = () => {
    setShowUpcomingRetirement(true);
    setUpcomingRetEmployees(getUpcomingRetirementEmployees(employeeList));
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
      <div className="tabs">
        <button
          className={`btn btn-secondary ${showUpcomingRetirement ? "" : "active"}`}
          onClick={handleAllEmployeesTabClick}
        >
          All Employees
        </button>
        <button
          className={`btn btn-secondary ${showUpcomingRetirement ? "active" : ""}`}
          onClick={handleUpcomingRetirementTabClick}
        >
          Upcoming Retirement
        </button>
      </div>

      <div className="mt-5">
        <h2>{showUpcomingRetirement ? "Upcoming Retirement Employees" : "All Employees"}</h2>
        <table id="bg-color-table" className="table table-striped mt-5">
          <thead id="head-bg-color">
          <tr>
            <th className="th-font">First Name</th>
            <th className="th-font">Last Name</th>
            <th className="th-font">Age</th>
            <th className="th-font">Date of joining</th>
            <th className="th-font">Title</th>
            <th className="th-font">Department</th>
            <th className="th-font">Employee Type</th>
            <th className="th-font">Current Status</th>
            <th className="th-font">Actions</th>
          </tr>
          </thead>
          <tbody>{showUpcomingRetirement ? upcomingRetirementRows : rows}</tbody>
        </table>
      </div>
      {showErrorModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{display: 'block'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Error</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {errorModalMessage}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeTable;
