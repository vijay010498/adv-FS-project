import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
import {useLocation} from "react-router-dom";
import {useState} from "react";


function EmployeeDirectory() {
  const location = useLocation();
  const [newEmployeeCreated, setNewEmployeeCreated] = useState(location.state?.newEmployeeCreated || false);

  const [filterOptions, setFilterOptions] = useState({
    employeeType: ""
  });

  const handleSearch = (options) => {
    setFilterOptions(options);
    console.log("search-clicked", options);
  };

  const resetNewEmployeeCreated = () => {
    setNewEmployeeCreated(false);
  };


  return (
    <main>
      <h1>EMPLOYEE LIST</h1>
      <EmployeeSearch onSearch={handleSearch}/>
      <EmployeeTable newEmployeeCreated={newEmployeeCreated} onResetNewEmployeeCreated={resetNewEmployeeCreated} filterOptions={filterOptions}/>
    </main>
  );
}

export default EmployeeDirectory;
