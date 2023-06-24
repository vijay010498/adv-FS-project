function EmployeeSearch() {
  return (
    <form className="form-horizontal mt-3">
      <div className="row">
        <div className="col-5">
          <label className="form-label" htmlFor="dateofjoining">
            Search
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder=" Search for name, title, department"
            />
          </div>
        </div>
        <div className="col-3">
          <label className="form-label" htmlFor="dateofjoining">
            Date Of Joining
          </label>
          <input type="date" className="form-control" id="dateofjoining" />
        </div>
        <div className="col-3">
          <label className="form-label" htmlFor="currentstatus">
            Current Status
          </label>
          <select className="form-select">
            <option value="1">Working</option>
            <option value="0">Retired</option>
          </select>
        </div>
        <div id ="search-btn" className="col-4">
          <label className="form-label">&nbsp;</label>
          <button id="btn-bg-color" type="button" className="btn btn-primary form-control">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default EmployeeSearch;
