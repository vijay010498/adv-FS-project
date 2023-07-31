import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEE_BY_ID } from "../GraphQL/Queries";
import { useParams } from "react-router-dom";

function EmployeeDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id },
  });

  const [employeeDetails, setEmployeeDetails] = useState([]);

  useEffect(() => {
    if (data && data.employee) {
      console.log("employeeData", data);
      const employeeFields = [];
      for (let field in data.employee) {
        let  value = data.employee[field];
        if (field === "dateOfJoining") {
          value = new Date(value).toDateString()
        }
        employeeFields.push({
          label: field.toUpperCase(),
          value: value.toString().toUpperCase()
        });
      }
      setEmployeeDetails(employeeFields);
    }
  }, [data]);

  return (
    <div className="container">
      <div className="row">
        {employeeDetails.map((field, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{field.label}</h5>
                <p className="card-text">{field.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeDetails;
