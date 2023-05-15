import React from 'react'

const InfoBox = () => {
  return (
    <>
      <ul className="box-info">
        <li>
          <i className="bx bxs-calendar-check"></i>
          <span className="text">
            <p>Total Loan Amount</p>
            <h3><span>₹</span> 1020</h3>
          </span>
        </li>
        <li>
          <i className="bx bxs-group"></i>
          <span className="text">
            <p>Outstanding Balance</p>
            <h3><span>₹</span> 1020</h3>
          </span>
        </li>
        <li>
          <i className="bx bxs-dollar-circle"></i>
          <span className="text">
            <p>Secured Amount</p>
            <h3><span>₹</span> 1020</h3>
          </span>
        </li>
      </ul>
      <ul className="box-info">
        <li>
          <i className="bx bxs-calendar-check"></i>
          <span className="text">
            <p>Non-Secured Amount</p>
            <h3><span>₹</span> 1020</h3>
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
            <h3>1020</h3>
          </span>
        </li>
      </ul>
    </>
  )
}

export default InfoBox