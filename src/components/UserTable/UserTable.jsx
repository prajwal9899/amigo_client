import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./UserTable.scss";
import { MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserTable = ({ searchInput }) => {
  const [defaultersData, setDefaultersData] = useState([]);
  const [defaulters, setDefaulters] = useState([]);
  const [data, setData] = useState([]);
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
      setDefaultersData(filteredData);
    }
  };

  const filterDefaulters = () => {
    if (user !== null) {
      const defaultersData = data.filter(
        (item) => item.Registration_No == user.registrationNo
      );
    }
  };

  console.log(searchInput, "INPOUT");
  return (
    <>
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
            {defaultersData.map((item) => {
              return (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <MDBBtn rounded className="mb-4" block>
                      View
                    </MDBBtn>
                  </TableCell>
                  <TableCell align="left">{item.Customer_Name}</TableCell>
                  <TableCell align="left">{item.Bank_Name}</TableCell>
                  <TableCell align="left">{"YES"}</TableCell>
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
    </>
  );
};

export default UserTable;
