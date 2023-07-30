import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";


function EmployeeDirectory() {
  return (
    <main>
      <h1>EMPLOYEE LIST</h1>
      <EmployeeSearch />
      <EmployeeTable />
    </main>
  );
}

export default EmployeeDirectory;
