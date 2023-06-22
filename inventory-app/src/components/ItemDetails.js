import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useCookies } from "react-cookie";
import APIService from "../APIService";

function ItemDetails() {
  const [ItemDetails, setItemDetails] = useState([]);
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");
  const [item_name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [minimum_stock, setMinimumStock] = useState("");
  const { id } = useParams();
  const [token] = useCookies(["myToken"]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/stock/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token.myToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setItemDetails(resp);
        setSku(resp.sku);
        setCategory(resp.category);
        setName(resp.item_name);
        setMinimumStock(resp.minimum_stock);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateDeatails = () => {
    var store_id = token.storeId;
    APIService.UpdateItem(
      id,
      {
        category,
        sku,
        item_name,
        stock,
        minimum_stock,
        store_id,
      },
      token.myToken
    ).then((resp) => {
      if (resp.id) {
        navigate("/stock-table");
      } else {
        console.log(resp);
        alert("error");
      }
    });

    var store = store_id;
    APIService.AddItemRecord({
      category,
      sku,
      item_name,
      stock,
      store,
    }).catch((error) => console.log(error));
  };

  const deleteDeatails = () => {
    APIService.DeleteItem(id, token.myToken).then((resp) => {
      if (resp.ok) {
        navigate("/stock-table");
      } else {
        alert("error");
      }
    });

    var store = token.storeId;
    var action = "deleted";
    APIService.AddItemRecord({
      category,
      sku,
      item_name,
      store,
      action,
    }).catch((error) => console.log(error));
  };

  return (
    <div>
      <Navbar />
      <br />
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Category/ 类别</h5>
            <p className="card-text">
              <input
                type="text"
                className="form-control"
                id="category"
                defaultValue={ItemDetails.category}
                readOnly={true}
              />
            </p>
            <h5 className="card-title">Sku</h5>
            <p className="card-text">
              <input
                type="text"
                className="form-control"
                id="sku"
                defaultValue={ItemDetails.sku}
                readOnly={true}
              />
            </p>
            <h5 className="card-title">Item Name/ 商品名称</h5>
            <p className="card-text">
              <input
                type="text"
                className="form-control"
                id="item_name"
                defaultValue={ItemDetails.item_name}
                readOnly={true}
              />
            </p>
            <h5 className="card-title">Stock/ 商品数量</h5>
            <p className="card-text">
              <input
                type="number"
                className="form-control"
                id="stock"
                defaultValue={ItemDetails.stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </p>
            <h5 className="card-title">Minimum Stock/ 最低数量</h5>
            <p className="card-text">
              <input
                type="number"
                className="form-control"
                id="minimun_stock"
                defaultValue={ItemDetails.minimum_stock}
                readOnly={true}
              />
            </p>
          </div>
        </div>

        <br />

        <div className="d-grid gap-2 col-6 mx-auto">
          <a className="btn btn-primary" onClick={updateDeatails}>
            Update/ 更新
          </a>
          <a
            className="btn btn-danger"
            onClick={() => {
              const confirmBox = window.confirm(
                "Do you really want to delete this item?"
              );
              if (confirmBox === true) {
                deleteDeatails();
              }
            }}
          >
            Delete/ 删除
          </a>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
