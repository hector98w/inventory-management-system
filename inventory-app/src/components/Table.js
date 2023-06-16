import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Table() {
  const [data, setData] = useState([]);
  const [token] = useCookies(["myToken"]);
  const [order, setOrder] = useState("ASC");
  const navigate = useNavigate();
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1
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
              <th scope="col" onClick={() => sorting("Category")}>
                Category
              </th>
              <th scope="col" onClick={() => sorting("SKU")}>
                SKU
              </th>
              <th scope="col" onClick={() => sorting("Item name")}>
                Item name
              </th>
              <th scope="col" onClick={() => sorting("Stock")}>
                Stock
              </th>
              <th scope="col">Minimum Stock</th>
              <th scope="col" onClick={() => sorting("Created At")}>
                Created At
              </th>
              <th scope="col">ID</th>
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
                      {data.id}
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
