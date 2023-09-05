import axios from "axios";
import { MDBBtn } from "mdb-react-ui-kit";
import React, { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import "./UploadData.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const UploadData = () => {
  const fileRef = useRef();
  const [fileName, setFileName] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [file, setFile] = useState(null);
  const [sheetData, setSheetData] = useState({});
  const acceptableFileNames = ["xlsx", "xls"];
  const [selectedSheet, setSelectedSheet] = React.useState("");

  const handleChange = (event) => {
    setSelectedSheet(event.target.value);
  };

  const checkFileName = (name) => {
    return acceptableFileNames.includes(name.split(".").pop().toLowerCase());
  };

  const readDataFromExcel = (data) => {
    const wb = XLSX.read(data);
    setSheetNames(wb.SheetNames);

    var mySheetData = {};

    for (var i = 0; i < wb.SheetNames.length; i++) {
      var sheetName = wb.SheetNames[i];
      const workSheet = wb.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(workSheet);

      mySheetData[sheetName] = jsonData;
    }

    setSheetData(mySheetData);
  };

  const handleFile = async (e) => {
    // const myFile = e.target.files[0];
    const myFile = e;

    if (!myFile) return;

    if (!checkFileName(myFile.name)) {
      alert("Invalid File Format");
      return;
    }

    // Read File Data
    const data = await myFile.arrayBuffer();

    readDataFromExcel(data);

    // Assign sheets

    setFile(myFile);
    setFileName(myFile.name);
  };

  // const handleFileDelete = () => {
  //     setFile(null);
  //     setFileName(null);
  //     fileRef.current.value = "";
  // };

  const uploadData = async () => {
    if (Object.keys(sheetData).length === 0) {
      Swal.fire("Error", "Please select or upload a file", "error");
    } else {
      setSheetNames([]);
      axios
        .post(`${process.env.REACT_APP_URL}/upload`, sheetData[selectedSheet])
        .then((res) => {
          console.log(res, "res");
          if (res.data.message == "Uploaded Successfully") {
            Swal.fire("Success", "Excel uploaded successfully", "success");
          } else {
            Swal.fire("Error", "Something went wrong", "error");
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  };

  return (
    <div className="uploadContainer">
      <h1 className="title">Upload Loan Defaulters Data</h1>
      {sheetNames.length > 0 && (
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <Select
            id="demo-simple-select"
            value={selectedSheet}
            inputProps={{ "aria-label": "Without label" }}
            onChange={handleChange}
            placeholder="Select sheet"
          >
            {sheetNames.map((sheet, index) => {
              return (
                <MenuItem key={index} value={sheet}>
                  {sheet}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}

      <FileUploader
        handleChange={handleFile}
        name="file"
        types={acceptableFileNames}
      />
      <MDBBtn className="mb-4" block onClick={uploadData}>
        Upload
      </MDBBtn>
    </div>
  );
};

export default UploadData;
