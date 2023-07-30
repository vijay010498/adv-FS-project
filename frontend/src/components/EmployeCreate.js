import {useMutation} from "@apollo/client";
import React, {useState} from "react";
import {CREATE_EMPLOYEE_MUTATION} from "../GraphQL/Mutators";
import {useNavigate} from "react-router-dom"

function EmployeeCreate() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  const [createEmployee, {error}] = useMutation(CREATE_EMPLOYEE_MUTATION);

  const addEmployee = () => {
    const formErrors = {
      firstName: !firstName,
      lastName: !lastName,
      age: !age,
      dateOfJoining: !dateOfJoining,
      title: !title,
      department: !department,
      employeeType: !employeeType,

    };

    setIsSuccess(false);
    setFormErrors({...formErrors});

    if (Object.values(formErrors).some((v) => v)) return;

    createEmployee({
      variables: {
        employeeDetails: {
          firstName,
          lastName,
          age: +age,
          dateOfJoining,
          title,
          department,
          employeeType,

        },
      },
    });

    if (error) {
      console.log(error);
    } else {
      setFormErrors(null);
      setFirstName("");
      setLastName("");
      setAge("");
      setDateOfJoining("");
      setTitle("");
      setDepartment("");
      setEmployeeType("");

      // navigate to main router and refresh the employee list
      navigate("/", {
        state: {
          newEmployeeCreated: true
        }
      });
    }
  };
  return (
    <>
      <h1>Create Employee</h1>
      {isSuccess && (
        <div className="alert alert-success" role="alert">
          <b>Success!</b> Employee has been added
        </div>
      )}
      <form className="form-horizontal" method="post">
        <div className="mb-2 form-group">
          <label className="form-label required" htmlFor="firstname">
            First Name
          </label>
          <input
            type="text"
            className={`form-control ${
              formErrors && (formErrors?.firstName ? "is-invalid" : "is-valid")
            }`}
            id="firstname"
            placeholder="Enter first name"
            name="firstname"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.currentTarget.value);
            }}
          />
          <div className="invalid-feedback">Please enter first name</div>
        </div>
        <div className="mb-2">
          <label className="form-label required" htmlFor="lastname">
            Last Name
          </label>
          <input
            type="text"
            className={`form-control ${
              formErrors && (formErrors?.lastName ? "is-invalid" : "is-valid")
            }`}
            id="lastname"
            placeholder="Enter last name"
            name="lastname"
            value={lastName}
            onChange={(e) => {
              setLastName(e.currentTarget.value);
            }}
          />
          <div className="invalid-feedback">Please enter last name</div>
        </div>
        <div className="mb-2">
          <label className="form-label required" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            className={`form-control ${
              formErrors && (formErrors?.age ? "is-invalid" : "is-valid")
            }`}
            id="age"
            placeholder="Enter age"
            name="age"
            value={age}
            onChange={(e) => {
              setAge(e.currentTarget.value);
            }}
          />
          <div className="invalid-feedback">Please enter age</div>
        </div>
        <div className="mb-2">
          <label className="form-label required" htmlFor="dateofjoining">
            Date Of Joining
          </label>
          <input
            type="date"
            className={`form-control ${
              formErrors &&
              (formErrors?.dateOfJoining ? "is-invalid" : "is-valid")
            }`}
            id="dateofjoining"
            name="dateofjoining"
            value={dateOfJoining}
            onChange={(e) => {
              setDateOfJoining(e.currentTarget.value);
            }}
          />
          <div className="invalid-feedback">Please provide date of joining</div>
        </div>
        <div className="mb-2">
          <label className="form-label required" htmlFor="title">
            Title
          </label>
          <select
            type="text"
            className={`form-control ${
              formErrors && (formErrors?.title ? "is-invalid" : "is-valid")
            }`}
            id="title"
            placeholder="Enter Title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          >
            <option value="">Select Title</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
          <div className="invalid-feedback">Please enter a valid Title</div>
        </div>
        <div className="mb-2">
          <label className="form-label required" htmlFor="department">
            Department
          </label>
          <select
            type="text"
            className={`form-control ${
              formErrors && (formErrors?.department ? "is-invalid" : "is-valid")
            }`}
            id="department"
            placeholder="Enter Department"
            name="department"
            value={department}
            onChange={(e) => {
              setDepartment(e.currentTarget.value);
            }}
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
          <div className="invalid-feedback">Please enter Department</div>
        </div>
        <div className="mb-2">
          <label className="form-label required" htmlFor="employeetype">
            Employee Type
          </label>
          <select
            type="text"
            className={`form-control ${
              formErrors && (formErrors?.employeeType ? "is-invalid" : "is-valid")
            }`}
            id="employeetype"
            placeholder="Enter Employee Type"
            name="employeetype"
            value={employeeType}
            onChange={(e) => {
              setEmployeeType(e.currentTarget.value);
            }}
          >
            <option value="">Select Employee Type</option>
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
          <div className="invalid-feedback">Please enter Employee Type</div>
        </div>


        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addEmployee}
          >
            Add Employee
          </button>
        </div>
      </form>
    </>
  );
}

export default EmployeeCreate;
