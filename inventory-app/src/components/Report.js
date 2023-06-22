import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useCookies } from "react-cookie";
import { CSVLink } from "react-csv";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

function Report() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [data, setData] = useState();
  const [item, setItem] = useState();
  const [token] = useCookies(["myToken"]);
  const [fileName, setFileName] = useState("");
  const [boxName, setBoxName] = useState([]);
  const [isClicked, setClicked] = useState(false);

  const handleOnClick = () => {
    setClicked(!isClicked);
  };

  const headers = [
    { label: "Category/ 类别", key: "category" },
    { label: "SKU", key: "sku" },
    { label: "Item name/ 商品名称", key: "item_name" },
    { label: "Stock/ 库存数量", key: "stock" },
    { label: "Edited Date/ 变动日期", key: "edited_date" },
    { label: "Action/ 操作", key: "action" },
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setBoxName(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/stock/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token.myToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setItem(resp);
      })
      .catch((error) => console.log(error));
  }, []);

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
        .then((resp) => {
          if (boxName.length !== 0) {
            var filteredData = [];
            for (let i = 0; i < boxName.length; i++) {
              const value = resp.filter(
                (item) => item.item_name === boxName[i]
              );
              filteredData = [...filteredData, ...value];
            }
            setData(filteredData);
          } else {
            setData(resp);
          }
        });

      setFileName(`Inventory report from ${startDate} to ${endDate}`);
    } else {
      alert("Wrong date information!（请选择合适的日期区间）");
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <div>
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <h5 className="card-header">Report</h5>
            <div className="card-body text-center">
              <h6 className="card-title">Select date range for report</h6>
              <div className="row">
                <div className="col">
                  <label htmlFor="start">Start date :（起始日期）</label>
                  <input
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="start">End date :（结束日期）</label>
                  <input
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <br />
                <br />
                <h6 className="card-title">Select item name for report</h6>
                <div className="row">
                  <div className="col">
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="multiple-checkbox-label">Item</InputLabel>
                      <Select
                        labelId="multiple-checkbox-label"
                        id="multiple-checkbox"
                        multiple
                        value={boxName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {item?.map((item) => (
                          <MenuItem key={item.id} value={item.item_name}>
                            <Checkbox />
                            <ListItemText primary={item.item_name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          {!isClicked ? (
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                className="btn btn-primary"
                onClick={() => {
                  getData();
                  handleOnClick();
                }}
              >
                Get Data/ 获取数据
              </button>
            </div>
          ) : null}
        </div>

        <br />

        {data ? (
          <div className="container">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Category/ 类别</th>
                  <th scope="col">SKU</th>
                  <th scope="col">Item name/ 商品名称</th>
                  <th scope="col">Stock/ 库存数量</th>
                  <th scope="col">Edited Date/ 变动日期</th>
                  <th scope="col">Action/ 操作</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{item.category}</th>
                      <td>{item.sku}</td>
                      <td>{item.item_name}</td>
                      <td>{item.stock}</td>
                      <td>{item.edited_date}</td>
                      <td>{item.action}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="d-grid gap-2 col-4 mx-auto">
              <CSVLink
                className="btn btn-primary"
                data={data}
                filename={fileName}
                headers={headers}
              >
                Export/ 下载表格
              </CSVLink>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Report;
