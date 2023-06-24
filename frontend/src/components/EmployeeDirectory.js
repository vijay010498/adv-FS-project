import EmployeeCreate from "./EmployeCreate";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
import { PAGES } from "../enum";

function EmployeeDirectory({ currentPage }) {
  return (
    <main>
      {currentPage === PAGES.EMPLOYEE_LIST && (
        <>
          <h1>EMPLOYEE LIST</h1>
          <EmployeeSearch />
          <EmployeeTable />
        </>
      )}
      {currentPage === PAGES.ADD_EMPLOYEE && <EmployeeCreate />}
    </main>
  );
}

export default EmployeeDirectory;
