import React, { useState } from "react";
import APIService from "../APIService";
import Navbar from "./Navbar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const [sku, setSku] = useState("");
  const [item_name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minimum_stock, setMinimumStock] = useState("");
  const [token] = useCookies(["myToken"]);
  const navigate = useNavigate();

  const submit = () => {
    var store = token.storeId;
    var auth = token.myToken;
    APIService.AddItem(
      {
        category,
        sku,
        item_name,
        minimum_stock,
        store,
      },
      auth
    ).then((resp) => {
      if (resp.id) {
        navigate("/stock-table");
      } else {
        alert("error");
      }
    });

    var stock = "initialize";
    APIService.AddItemRecord({
      category,
      sku,
      item_name,
      stock,
      store,
    }).catch((error) => console.log(error));
  };

  return (
    <div>
      <Navbar />
      <br />
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <h5 className="card-header">Add Item</h5>
          <div className="card-body">
            <h6 className="card-title">SKU (optional)</h6>
            <p className="card-text">
              <input
                type="text"
                className="form-control"
                id="sku"
                required
                onChange={(e) => setSku(e.target.value)}
              />
            </p>
            <h6 className="card-title">Item Name</h6>
            <p className="card-text">
              <input
                type="text"
                className="form-control"
                id="item-name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <h6 className="card-title">Category</h6>
            <p className="card-text">
              <input
                type="text"
                className="form-control"
                id="category"
                required
                onChange={(e) => setCategory(e.target.value)}
              />
            </p>
            <h6 className="card-title">Minimum Stock</h6>
            <p className="card-text">
              <input
                type="text"
                className="form-control"
                id="minimum_stock"
                required
                onChange={(e) => setMinimumStock(e.target.value)}
              />
            </p>
          </div>
        </div>

        <br />

        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
