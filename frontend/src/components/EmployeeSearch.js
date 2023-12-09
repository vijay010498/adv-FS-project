import {useState} from "react";
import React from 'react';

function EmployeeSearch({onSearch}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [currentStatus, setCurrentStatus] = useState(1);
  const [employeeType, setEmployeeType] = useState("");


  const handleSearchClick = () => {
    onSearch({
      firstName,
      lastName,
      title,
      department,
      dateOfJoining,
      currentStatus,
      employeeType
    })
  }

  return (
    <form className="form-horizontal mt-3">
      <div className="row">
        <div className="col-3">
          <label className="form-label" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            placeholder=" Search First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="col-3">
          <label className="form-label" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            placeholder=" Search for Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="col-3">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            placeholder=" Search for title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-3">
          <label className="form-label" htmlFor="department">
            Department
          </label>
          <input
            type="text"
            className="form-control"
            id="department"
            value={department}
            placeholder=" Search for department"
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="col-3">
          <label className="form-label" htmlFor="dateofjoining">
            Date Of Joining
          </label>
          <input
            type="date"
            className="form-control"
            id="dateofjoining"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
          />
        </div>
        <div className="col-3">
          <label className="form-label" htmlFor="currentstatus">
            Current Status
          </label>
          <select className="form-select"
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(parseInt(e.target.value))}>
            <option value="1">Working</option>
            <option value="0">Retired</option>
          </select>
        </div>
        <div className="col-3">
          <label className="form-label" htmlFor="employeeType">
            Employee Type
          </label>
          <select className="form-select" value={employeeType} onChange={(e) => setEmployeeType(e.target.value)}>
            <option value="">ALL</option>
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>
        <div id="search-btn" className="col-4">
          <label className="form-label">&nbsp;</label>
          <button id="btn-bg-color"
                  type="button"
                  className="btn btn-primary form-control"
                  onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default EmployeeSearch;
