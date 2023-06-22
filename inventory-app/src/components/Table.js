import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import SortIcon from "@mui/icons-material/Sort";

function Table() {
  const [data, setData] = useState([]);
  const [token] = useCookies(["myToken"]);
  const [order, setOrder] = useState("ASC");
  const navigate = useNavigate();
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col]?.toString().toLowerCase() > b[col]?.toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col]?.toString().toLowerCase() < b[col]?.toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stock/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token.myToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setData(resp))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <div className="container">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">
                Category/ 类别 <SortIcon onClick={() => sorting("category")} />
              </th>
              <th scope="col">SKU</th>
              <th scope="col">
                Item name/ 商品名称{" "}
                <SortIcon onClick={() => sorting("item_name")} />
              </th>
              <th scope="col">Stock/ 库存数量</th>
              <th scope="col">Minimum Stock/ 最低数量</th>
              <th scope="col">
                Created At/ 创建日期{" "}
                <SortIcon onClick={() => sorting("created_at")} />
              </th>
              <th scope="col">Action/ 操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => {
              return (
                <tr key={data.id}>
                  <th scope="row">{data.category}</th>
                  <td>{data.sku}</td>
                  <td>{data.item_name}</td>
                  {data.stock > data.minimum_stock ? (
                    <td>{data.stock}</td>
                  ) : (
                    <td className="text-danger">{data.stock}</td>
                  )}
                  <td>{data.minimum_stock}</td>
                  <td>{data.created_at}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/details/${data.id}`)}
                    >
                      Edit/ 编辑
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
