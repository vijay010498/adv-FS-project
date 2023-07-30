import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
import {useLocation} from "react-router-dom";
import {useState} from "react";


function EmployeeDirectory() {
  const location = useLocation();
  const [newEmployeeCreated, setNewEmployeeCreated] = useState(location.state?.newEmployeeCreated || false);
  const resetNewEmployeeCreated = () => {
    setNewEmployeeCreated(false);
  };
  return (
    <main>
      <h1>EMPLOYEE LIST</h1>
      <EmployeeSearch/>
      <EmployeeTable newEmployeeCreated={newEmployeeCreated} onResetNewEmployeeCreated={resetNewEmployeeCreated}/>
    </main>
  );
}

export default EmployeeDirectory;
