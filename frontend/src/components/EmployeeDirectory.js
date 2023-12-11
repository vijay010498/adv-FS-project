import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import React from 'react';


function EmployeeDirectory() {
  const location = useLocation();
  const [newEmployeeCreated, setNewEmployeeCreated] = useState(location.state?.newEmployeeCreated || false);

  const [filterOptions, setFilterOptions] = useState({
    firstName: "",
    lastName: "",
    title: "",
    department: "",
    dateOfJoining: "",
    employeeType: "",
    currentStatus: null,
  });

  const [onlyUpcomingRetirement, setOnlyUpcomingRetirement] = useState(false);


  const handleSearch = (options) => {
    setFilterOptions(options);
  };

  const handleSetOnlyUpcoming = (val) => {
    setOnlyUpcomingRetirement(val);
  }
  const resetNewEmployeeCreated = () => {
    setNewEmployeeCreated(false);
  };


  return (
    <main>
      <h1>EMPLOYEE LIST</h1>
      <EmployeeSearch onSearch={handleSearch} onSetOnlyRet={handleSetOnlyUpcoming}/>
      <EmployeeTable newEmployeeCreated={newEmployeeCreated} onResetNewEmployeeCreated={resetNewEmployeeCreated}
                     filterOptions={filterOptions} onlyUpcomingRetirement={onlyUpcomingRetirement}/>
    </main>
  );
}

export default EmployeeDirectory;
