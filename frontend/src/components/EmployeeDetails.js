import React, {useState, useEffect} from "react";
import {useQuery} from "@apollo/client";
import {GET_EMPLOYEE_BY_ID} from "../GraphQL/Queries";

function EmployeeDetails({id}) {
  console.log("from-EmployeeDetails", id);
  const {loading, error, data} = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: {id}
  });

  const [employeeDetails, setEmployeeDetails] = useState({});

  useEffect(() => {
    if (data) {
      const employeeFields = [];
      for (let field in data) {
        data.push({
          label: field,
          value: data[field]
        })
      }
      setEmployeeDetails(employeeFields)
    }
  },[data]);
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
