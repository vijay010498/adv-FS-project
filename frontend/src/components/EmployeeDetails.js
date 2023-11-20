import React, { useState, useEffect } from "react";
import {useMutation, useQuery} from "@apollo/client";
import { GET_EMPLOYEE_BY_ID } from "../GraphQL/Queries";
import { useParams } from "react-router-dom";
import {UPDATE_EMPLOYEE_MUTATION} from "../GraphQL/Mutators";

function EmployeeDetails() {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id },
  });

  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [updatedEmployeeFields, setUpdatedEmployeeFields] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (data && data.employee) {
      const updatedEmployeeDetails = Object.entries(data.employee)
        .filter(([field]) => field !== "__typename")
        .map(([label, value]) => {
          if (label === "dateOfJoining") {
            value = new Date(value).toDateString();
          }
          if (label === 'currentStatus') {
            value = value === 1 ? 'Working' : 'Retired';
          }
          return {
            label: label.toUpperCase(),
            value: value.toString().toUpperCase(),
          };
        });
      console.log(data.employee,updatedEmployeeDetails);
      setEmployeeDetails(updatedEmployeeDetails);
    }
  }, [data]);

  const [updateEmployeeMutation] = useMutation(UPDATE_EMPLOYEE_MUTATION);
  const handleFieldChange = (field, value) => {
    setUpdatedEmployeeFields({ ...updatedEmployeeFields, [field]: value });
  };

  const handleUpdateEmployee = () => {
    setIsUpdating(true);
    updateEmployeeMutation({
      variables: {
        id,
        updateDetails: Object.assign({id}, updatedEmployeeFields),
      },
    })
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        // Handle error, if needed
      }).finally(() => {
        setIsUpdating(false);
    });
  };
  const handleTitleChange = (event) => {
    handleFieldChange("title", event.target.value);
  };

  const handleDepartmentChange = (event) => {
    handleFieldChange("department", event.target.value);
  };

  const handleStatusChange = (event) => {
    const statusValue = event.target.value === "1" ? 1 : 0;
    handleFieldChange("currentStatus", statusValue);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main>
      <div className="container">
        <div className="row">
          {employeeDetails.map((field, index) => (
            <div key={field.label} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{field.label}</h5>
                  <p className="card-text">{field.value}</p>
                </div>
                {field.label === "TITLE" && (
                  <select
                    id={field}
                    value={updatedEmployeeFields.title || employeeDetails.title}
                   onChange={handleTitleChange}
                    className="form-select"
                  >
                    <option value="">Select Title</option>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                    <option value="VP">VP</option>
                  </select>
                )}
                {field.label === "DEPARTMENT" && (
                  <select
                    id={field}
                    value={updatedEmployeeFields.department || employeeDetails.department}
                   onChange={handleDepartmentChange}
                    className="form-select"
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                )}
                {field.label === "CURRENTSTATUS" && (
                  <select
                    id={field}
                    value={updatedEmployeeFields.currentStatus || employeeDetails.currentStatus}
                   onChange={handleStatusChange}
                    className="form-select"
                  >
                    <option value="">Select Current Status</option>
                    <option value="1">Working</option>
                    <option value="0">Retired</option>
                  </select>
                )}
              </div>
            </div>
          ))}
          <button onClick={handleUpdateEmployee} className="btn btn-primary">
            {isUpdating ? "Updating..." : "Update Employee"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default EmployeeDetails;
