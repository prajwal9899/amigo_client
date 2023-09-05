/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "../../styles/SearchDefaulters.scss";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import UserTable from "../../components/UserTable/UserTable.jsx";
import DefaulterTable from "../../components/DefaulterTable/DefaulterTable";

const SearchDefaulters = () => {
  const [filter, setFilter] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    aadhar: "",
    PAN: "",
    mobile: "",
  });
  const handleFilter = (e) => {
    e.preventDefault();
    setFilter(!filter);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div className="searchDefaultersContainer">
      <div className="head-title">
        <div className="left">
          <h1>Search Loan Defaulters</h1>
        </div>
      </div>
      <form>
        <MDBRow className="mb-4">
          <MDBCol lg={7}>
            <MDBInput
              wrapperClass="mb-4"
              id="form6Example3"
              label="Customer name"
              name="name"
              onChange={(e) => handleInput(e)}
            />
          </MDBCol>
          <MDBCol lg={2}>
            <MDBBtn className="mb-4">Search</MDBBtn>
          </MDBCol>
          <MDBCol lg={3}>
            <MDBBtn className="mb-4" onClick={handleFilter}>
              {filter == true ? (
                <>
                  <i className="fa-solid fa-minus"></i>Remove filter
                </>
              ) : (
                <>
                  <i className="fa-solid fa-plus"></i>Add filter
                </>
              )}
            </MDBBtn>
          </MDBCol>
          {filter && (
            <>
              <MDBCol lg={4}>
                <MDBInput
                  id="form6Example1"
                  label="Aadhar number"
                  type={"number"}
                  maxLength={12}
                  name="aadhar"
                  onChange={(e) => handleInput(e)}
                />
              </MDBCol>
              <MDBCol lg={4}>
                <MDBInput
                  id="form6Example2"
                  label="PAN number"
                  name="PAN"
                  onChange={(e) => handleInput(e)}
                />
              </MDBCol>
              <MDBCol lg={4}>
                <MDBInput
                  id="form6Example2"
                  label="Mobile number"
                  name="mobile"
                  onChange={(e) => handleInput(e)}
                />
              </MDBCol>{" "}
            </>
          )}
        </MDBRow>
      </form>
      <DefaulterTable searchInput={inputValues} />
    </div>
  );
};

export default SearchDefaulters;
