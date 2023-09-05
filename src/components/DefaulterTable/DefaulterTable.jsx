import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./DefaulterTable.scss";
import { MDBBtn } from "mdb-react-ui-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box, Modal, TableFooter, TablePagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import JsPDF from "jspdf";
import jsPdf from "jspdf";
import moment from "moment";
import GaugeChart from "react-gauge-chart";
import html2canvas from "html2canvas";
import cryptoRandomString from "crypto-random-string";
import ReactToPdf from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import domToPdf from "dom-to-pdf";

const style = {
  position: "absolute",
  top: "50%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

const chartStyle = {
  height: 250,
};

const DefaulterTable = ({ searchInput }) => {
  const navigate = useNavigate();
  const printRef = useRef(null);
  const uuid = cryptoRandomString({ length: 20 });

  const [defaultersData, setDefaultersData] = useState([]);
  const [defaulters, setDefaulters] = useState([]);
  const [data, setData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isNPA, setIsNPA] = useState("NA");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user !== null) {
      axios
        .get(`${process.env.REACT_APP_URL}/get-defaulters`, {
          params: {
            Registration_No: user.registrationNo,
          },
        })
        .then((data) => {
          var defaulters = [];
          let item = data.data;

          for (let index = 0; index < item.length; index++) {
            var NPA = "";
            let Installment = item[index].OverdueNoofInstallment;
            if (Installment < 3) {
              NPA = "Standard Assets";
            } else if (Installment > 3 && Installment < 12) {
              NPA = "Sub Standard";
            } else if (Installment > 12 && Installment <= 24) {
              NPA = "DoubtFul A";
            } else if (Installment > 24 && Installment <= 36) {
              NPA = "DoubtFul B";
            } else if (Installment > 36 && Installment <= 60) {
              NPA = "DoubtFul C";
            } else {
              NPA = "Loss Asset";
            }

            let newData = {
              AccountNumber: item[index].AccountNumber,
              AccountOpenDate: item[index].AccountOpenDate,
              Address: item[index].Address,
              Bank_Address: item[index].Bank_Address,
              Bank_Name: item[index].Bank_Name,
              City: item[index].City,
              Country: item[index].Country,
              Customer_Name: item[index].Customer_Name,
              DisbursementAmount: item[index].DisbursementAmount,
              DisbursementDate: item[index].DisbursementDate,
              InstallmentAmount: item[index].InstallmentAmount,
              LastInstallmentPaidDate: item[index].LastInstallmentPaidDate,
              LoanAmount: item[index].LoanAmount,
              LoanExpiryDate: item[index].LoanExpiryDate,
              LoanOutstandingBalance: item[index].LoanOutstandingBalance,
              LoanPeriod: item[index].LoanPeriod,
              LoanType: item[index].LoanType,
              OfficeNo: item[index].OfficeNo,
              OverdueNoofInstallment: item[index].OverdueNoofInstallment,
              PinCode: item[index].PinCode,
              Registration_No: item[index].Registration_No,
              State: item[index].State,
              isDefaulter:
                item[index].OverdueNoofInstallment < 3 &&
                NPA === "Standard Assets"
                  ? "NO"
                  : "YES",
              isNPA: NPA,
              CreditScore:
                NPA === "Standard Assets"
                  ? 750
                  : NPA === "Sub Standard" || NPA === "DoubtFul A"
                  ? 640
                  : 580,
            };

            defaulters.push(newData);
          }
          // setDefaultersData(defaulters)
          setData(defaulters);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    filterDefaultersData();
  }, [data, user]);

  const filterDefaultersData = () => {
    if (user !== null) {
      const filteredData = data.filter(
        (item) => item.Registration_No == user.registrationNo
      );
      setDefaultersData(filteredData);
    }
  };

  useEffect(() => {
    searchByValue();
  }, [searchInput]);

  const searchByValue = () => {
    if (searchInput.name !== "") {
      const filter = defaultersData.filter((item) => {
        const itemMatchesSearchTerm = item.Customer_Name.toLowerCase().includes(
          searchInput.name.toLowerCase()
        );
        return itemMatchesSearchTerm;
      });
      setDefaulters(filter);
    }
  };

  const pdfDownload = async (e) => {
    const domElement = document.getElementById("mainDivToPDF");
    // html2canvas(domElement).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPdf("p", "mm", "a4");
    //   var width = pdf.internal.pageSize.getWidth();
    //   var height = pdf.internal.pageSize.getHeight();
    //   pdf.addImage(imgData, "JPEG", 0, 0, width, height);
    //   pdf.save(`${new Date().toISOString()}.pdf`);
    // });

    const options = {
      filename: `${new Date().toISOString()}.pdf`,
      overrideWidth : 1100
    };

    domToPdf(domElement, options, (res) => {
      // 
    });
  };


  return (
    <>
      <Modal
        open={isModal}
        onClose={() => setIsModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal_container"
      >
        <Box sx={style}>
          <div className="header">
            <div className="text">
              <h3>Society Portal Loan Credit Details Portal</h3>
            </div>
            <div className="button">
              <MDBBtn
                className="mb-4"
                block
                onClick={(e) => {
                  // navigate(`/report/${modalData._id}`);
                  pdfDownload(e);
                }}
              >
                Download Report
              </MDBBtn>
              <MDBBtn
                className="mb-4 w-10"
                block
                onClick={() => setIsModal(false)}
              >
                Close
              </MDBBtn>
            </div>
          </div>
          <hr />
          <div className="sub_header">
            <h4>Credit Bureau Information CBI</h4>
          </div>
          <hr />
          <div className="credit_container">
            <div className="card">
              <div className="text">
                <span>Credit Score</span>
              </div>
              <div className="info">{modalData.CreditScore}</div>
            </div>
            <div className="card">
              <div className="text">
                <span>Credit Risk</span>
              </div>
              <div className="info">
                {modalData.CreditScore === 580
                  ? "HIGH RISK"
                  : modalData.CreditScore === 640
                  ? "MEDIUM"
                  : "LOW"}
              </div>
            </div>
            <div className="card">
              <div className="text">
                <span>Credit Description</span>
              </div>
              <div className="info">
                {modalData.CreditScore === 580
                  ? "POOR"
                  : modalData.CreditScore === 640
                  ? "GOOD"
                  : "GREAT"}
              </div>
            </div>
            <div className="card">
              <div className="text">
                <span>Is NPA</span>
              </div>
              <div className="info">{modalData.isNPA}</div>
            </div>
            <div className="card">
              <div className="text">
                <span>Is Defaulter</span>
              </div>
              <div className="info">{modalData.isDefaulter}</div>
            </div>
            <div className="card">
              <div className="text">
                <span>Bank Name</span>
              </div>
              <div className="info">{modalData.Bank_Name}</div>
            </div>
            <div className="card">
              <div className="text">
                <span>Loan type</span>
              </div>
              <div className="info">{modalData.LoanType}</div>
            </div>
            <div className="card">
              <div className="text">
                <span>Loan Amount</span>
              </div>
              <div className="info">{modalData.LoanAmount}</div>
            </div>
            <div className="card">
              <div className="text">
                <span>Is Secured</span>
              </div>
              <div className="info">750</div>
            </div>
          </div>
          <div className="information">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: "#FFF" }} align="center">
                      Details type
                    </TableCell>
                    <TableCell style={{ color: "#FFF" }} align="center">
                      Information
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Customer Name"}</TableCell>
                    <TableCell align="center">
                      {modalData.Customer_Name}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Account Number"}</TableCell>
                    <TableCell align="center">
                      {modalData.AccountNumber}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"PAN No"}</TableCell>
                    <TableCell align="center">
                      {modalData.PanNo !== undefined
                        ? modalData.PanNo
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Aadhar No"}</TableCell>
                    <TableCell align="center">
                      {modalData.AadharNo !== undefined
                        ? modalData.AadharNo
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Voter No"}</TableCell>
                    <TableCell align="center">
                      {modalData.VoterNo !== undefined
                        ? modalData.VoterNo
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Bank Address"}</TableCell>
                    <TableCell align="center">
                      {modalData.Bank_Address !== undefined
                        ? modalData.Bank_Address
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Registration No"}</TableCell>
                    <TableCell align="center">
                      {modalData.Registration_No !== undefined
                        ? modalData.Registration_No
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Account Open Date"}</TableCell>
                    <TableCell align="center">
                      {modalData.AccountOpenDate !== undefined
                        ? modalData.AccountOpenDate
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Loan Type"}</TableCell>
                    <TableCell align="center">
                      {modalData.LoanType !== undefined
                        ? modalData.LoanType
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Loan Period"}</TableCell>
                    <TableCell align="center">
                      {modalData.LoanPeriod !== undefined
                        ? modalData.LoanPeriod
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Loan Expiry Date"}</TableCell>
                    <TableCell align="center">
                      {modalData.LoanExpiryDate !== undefined
                        ? modalData.LoanExpiryDate
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Installment Amount"}</TableCell>
                    <TableCell align="center">
                      {modalData.InstallmentAmount !== undefined
                        ? modalData.InstallmentAmount
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">
                      {"Overdue Installment"}
                    </TableCell>
                    <TableCell align="center">
                      {modalData.OverdueNoofInstallment !== undefined
                        ? modalData.OverdueNoofInstallment
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Address"}</TableCell>
                    <TableCell align="center">
                      {modalData.Address !== undefined
                        ? modalData.Address
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Pin Code"}</TableCell>
                    <TableCell align="center">
                      {modalData.PinCode !== undefined
                        ? modalData.PinCode
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"City"}</TableCell>
                    <TableCell align="center">
                      {modalData.City !== undefined
                        ? modalData.City
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"State"}</TableCell>
                    <TableCell align="center">
                      {modalData.State !== undefined
                        ? modalData.State
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Country"}</TableCell>
                    <TableCell align="center">
                      {modalData.Country !== undefined
                        ? modalData.Country
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Office No"}</TableCell>
                    <TableCell align="center">
                      {modalData.OfficeNo !== undefined
                        ? modalData.OfficeNo
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">
                      {"Disbursement Amount"}
                    </TableCell>
                    <TableCell align="center">
                      {modalData.DisbursementAmount !== undefined
                        ? modalData.DisbursementAmount
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Disbursement Date"}</TableCell>
                    <TableCell align="center">
                      {modalData.DisbursementDate !== undefined
                        ? modalData.DisbursementDate
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">
                      {"Loan Outstanding Balance"}
                    </TableCell>
                    <TableCell align="center">
                      {modalData.LoanOutstandingBalance !== undefined
                        ? modalData.LoanOutstandingBalance
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{"Country"}</TableCell>
                    <TableCell align="center">
                      {modalData.Country !== undefined
                        ? modalData.Country
                        : "Not Mentioned"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#FFF" }} align="center">
                Action
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="left">
                Customer Name
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="left">
                Bank Name
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="left">
                Defaulter
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="left">
                PAN
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="left">
                Aadhar
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="left">
                Gntr1
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="left">
                Gntr2
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {defaulters.map((item) => {
              return (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <MDBBtn
                      rounded
                      className="mb-4"
                      block
                      onClick={() => {
                        setIsModal(true);
                        setModalData(item);
                        console.log(item);
                      }}
                    >
                      View
                    </MDBBtn>
                  </TableCell>
                  <TableCell align="left">{item.Customer_Name}</TableCell>
                  <TableCell align="left">{item.Bank_Name}</TableCell>
                  <TableCell align="left">{item.isDefaulter}</TableCell>
                  <TableCell align="left">{"Not Mentioned"}</TableCell>
                  <TableCell align="left">{"Not Mentioned"}</TableCell>
                  <TableCell align="left">{"Not Mentioned"}</TableCell>
                  <TableCell align="left">{"Not Mentioned"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <MDBBtn
        className="mb-4"
        block
        onClick={(e) => {
          pdfDownload(e);
          // handlePrint();
        }}
        id="print"
      >
        Download Report
      </MDBBtn>

      <div className="mainDiv" ref={printRef} id="mainDivToPDF">
        <GaugeChart
          id="score_meter"
          animate={false}
          percent={0.56}
          arcWidth={0.2}
          cornerRadius={6}
          textColor={"#000"}
          hideText={true}
          needleBaseColor={"#008abe"}
          needleColor="#345243"
          style={chartStyle}
          arcsLength={[1, 2, 3]}
          formatTextValue={(value) => value + ""}
        />
        <div className="header">
          <p>CREDIT BUREAU INFORMATION CBI</p>
          <hr />
        </div>
        <div className="inquiryContainer">
          <div className="title">
            <p>Inquiry By</p>
          </div>
          <div className="information">
            <div className="item">
              <div className="text">Name</div>
              <div className="value">Amigoestech Finance</div>
            </div>
            <div className="item">
              <div className="text">Email</div>
              <div className="value">prajwalgadge9899@gmail.com</div>
            </div>
            <div className="item">
              <div className="text">Mobile</div>
              <div className="value">7066057117</div>
            </div>
            <div className="item">
              <div className="text"></div>
              <div className="value"></div>
            </div>
          </div>
        </div>
        <div className="reportContainer">
          <div className="title">
            <p>Report Details</p>
          </div>
          <div className="information">
            <div className="item">
              <div className="text">Report Date</div>
              <div className="value">Amigoestech Finance</div>
            </div>
            <div className="item">
              <div className="text">Report Number</div>
              <div className="value">{uuid}</div>
            </div>
            <div className="item">
              <div className="text">Member Name</div>
              <div className="value">PRAJWAL RAVINDRA GADGE</div>
            </div>
            <div className="item">
              <div className="text">UserName/ ID</div>
              <div className="value"></div>
            </div>
          </div>
        </div>
        <div className="accountContainer">
          <div className="title">
            <p>Account Holder Details</p>
          </div>
          <div className="information">
            <div className="item">
              <div className="text">Name</div>
              <div className="value">Amigoestech Finance</div>
            </div>
            <div className="item">
              <div className="text">Gender</div>
              <div className="value">{uuid}</div>
            </div>
            <div className="item">
              <div className="text">Contact No</div>
              <div className="value">PRAJWAL RAVINDRA GADGE</div>
            </div>
            <div className="item">
              <div className="text">DOB</div>
              <div className="value"></div>
            </div>
            <div className="item">
              <div className="text">Email Id</div>
              <div className="value"></div>
            </div>
            <div className="item">
              <div className="text"></div>
              <div className="value"></div>
            </div>
          </div>
        </div>
        <div className="addressContainer">
          <div className="title">
            <p>Customer Address</p>
          </div>
          <div className="address">
            <p>NAGPUR</p>
          </div>
        </div>
        <div className="documentContainer">
          <div className="title">
            <p>Customer Document/s Details</p>
          </div>
          <div className="information">
            <div className="item">
              <div className="text">PAN</div>
              <div className="value">BJUFH5757P</div>
            </div>
            <div className="item">
              <div className="text">Aadhar Card No</div>
              <div className="value">69716896588</div>
            </div>
            <div className="item">
              <div className="text">Voting Card No</div>
              <div className="value">JDKSDS1865</div>
            </div>
            <div className="item">
              <div className="text"></div>
              <div className="value"></div>
            </div>
          </div>
        </div>
        <div className="loanContainer">
          <div className="title">
            <p>Loan Summary</p>
          </div>
          <div className="information">
            <div className="item">
              <div className="text">Name</div>
              <div className="value">{modalData.Customer_Name}</div>
            </div>
            <div className="item">
              <div className="text"></div>
              <div className="value"></div>
            </div>
            <div className="item">
              <div className="text">Conatct No</div>
              <div className="value"></div>
            </div>
            <div className="item">
              <div className="text">Email Id</div>
              <div className="value"></div>
            </div>
            <div className="item">
              <div className="text">Total Accounts</div>
              <div className="value">1</div>
            </div>
            <div className="item">
              <div className="text"></div>
              <div className="value"></div>
            </div>
          </div>
        </div>
        <div className="accountSummaryContainer">
          <div className="header">
            <h2>Accountwise Summary</h2>
          </div>
          <div className="subHeader">
            <p>
              ( Credit History as per the Data Submitted by Respective Credit
              Institutions )
            </p>
          </div>
          <div className="accountContainer">
            <div className="title">
              <p>Account Details</p>
            </div>
            <div className="information">
              <div className="item">
                <div className="text">Consumer Name</div>
                <div className="value">{modalData.Customer_Name}</div>
              </div>
              <div className="item">
                <div className="text"></div>
                <div className="value"></div>
              </div>
              <div className="item">
                <div className="text">Gender</div>
                <div className="value"></div>
              </div>
              <div className="item">
                <div className="text">DOB</div>
                <div className="value"></div>
              </div>
              <div className="item">
                <div className="text">Address</div>
                <div className="value">1</div>
              </div>
              <div className="item">
                <div className="text"></div>
                <div className="value"></div>
              </div>
              <div className="item">
                <div className="text">Mobile No</div>
                <div className="value">1</div>
              </div>
              <div className="item">
                <div className="text">Email</div>
                <div className="value"></div>
              </div>
              <div className="item">
                <div className="text">Secured Loan</div>
                <div className="value">1</div>
              </div>
              <div className="item">
                <div className="text"></div>
                <div className="value"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaulterTable;
