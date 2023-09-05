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
import { ListGroup } from "react-bootstrap";

const UserTable = ({ searchInput }) => {
  const [defaultersData, setDefaultersData] = useState([]);
  const [defaulters, setDefaulters] = useState([]);
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/admin/getUsers`)
      .then((data) => {
        console.log(data,"JAHUGAFD")
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);




  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#FFF" }} align="center">
                User Name
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="left">
                Registration No.
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="left">
                Email
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="left">
                Contact
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="left">
                Branch Name
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="left">
                Subscription Till
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {defaulters.map((item) => {
              console.log(item)
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
                  <TableCell align="left">{item.OverdueNoofInstallment>3 ? "YES" : "NO"}</TableCell>
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
