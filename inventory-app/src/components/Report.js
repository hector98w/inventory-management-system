import React, { useState } from "react";
import Navbar from "./Navbar";
import { useCookies } from "react-cookie";
import { CSVLink } from "react-csv";

function Report() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [data, setData] = useState();
  const [token] = useCookies(["myToken"]);
  const [fileName, setFileName] = useState("");

  const getData = () => {
    if (startDate && endDate) {
      fetch(
        `http://127.0.0.1:8000/api/report?start=${startDate}&end=${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token.myToken}`,
          },
        }
      )
        .then((resp) => resp.json())
        .then((resp) => setData(resp));
      setFileName(`Inventory report from ${startDate} to ${endDate}`);
    } else {
      alert("wrong date information!");
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <h5 className="card-header">Report</h5>
          <div className="card-body text-center">
            <h6 className="card-title">Select Date range for report</h6>
            <div className="row">
              <div className="col">
                <label htmlFor="start">Start date :</label>
                <input
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="start">End date :</label>
                <input
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary" onClick={getData}>
            Get Data
          </button>
          {data ? (
            <CSVLink
              className="btn btn-primary"
              data={data}
              filename={fileName}
            >
              Export
            </CSVLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Report;
