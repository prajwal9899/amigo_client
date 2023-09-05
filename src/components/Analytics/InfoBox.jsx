import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const InfoBox = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [noOfDefaulters, setNoOfDefaulters] = useState(null);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [outstandingBalance, setOutstandingBalance] = useState(0);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/get-defaulters`)
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    filterDefaultersData();
  }, [data, user]);

  const filterDefaultersData = () => {
    if (user !== null) {
      const filteredData = data.filter(
        (item) => item.Registration_No == user.registrationNo
      );

      setFilteredData(filteredData)

      let noOfDefaulters = filteredData.length
      setNoOfDefaulters(noOfDefaulters)

      // Get Total Loan amount
      var TotalLoanAmount = 0
      // Get Total Outstanding Balance
      var OutstandingBalance = 0



      filteredData.map((item) => {
        // console.log(item.LoanOutstandingBalance);
        OutstandingBalance += Number(item.LoanOutstandingBalance)
        TotalLoanAmount += Number(item.LoanAmount)
      })

      setOutstandingBalance(OutstandingBalance)
      setTotalLoanAmount(TotalLoanAmount)
    }
  };


  // const getTotalLoanAmount = () => {

  // }

  return (
    <>
      <ul className="box-info">
        <li>
          <i className="bx bxs-calendar-check"></i>
          <span className="text">
            <p>Total Loan Amount</p>
            <h3>
              <span>₹</span> {totalLoanAmount}
            </h3>
          </span>
        </li>
        <li>
          <i className="bx bxs-group"></i>
          <span className="text">
            <p>Outstanding Balance</p>
            <h3>
              <span>₹</span> {outstandingBalance}
            </h3>
          </span>
        </li>
        <li>
          <i className="bx bxs-dollar-circle"></i>
          <span className="text">
            <p>Secured Amount</p>
            <h3>
              <span>₹</span> 1020
            </h3>
          </span>
        </li>
      </ul>
      <ul className="box-info">
        <li>
          <i className="bx bxs-calendar-check"></i>
          <span className="text">
            <p>Non-Secured Amount</p>
            <h3>
              <span>₹</span> 1020
            </h3>
          </span>
        </li>
        <li>
          <i className="bx bxs-group"></i>
          <span className="text">
            <p>Total No. of Accounts</p>
            <h3> 1020</h3>
          </span>
        </li>
        <li>
          <i className="bx bxs-dollar-circle"></i>
          <span className="text">
            <p>Total No. of Defaulters</p>
            <h3>{noOfDefaulters}</h3>
          </span>
        </li>
      </ul>
    </>
  );
};

export default InfoBox;
