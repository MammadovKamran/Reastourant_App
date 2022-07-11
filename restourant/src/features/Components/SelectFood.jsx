/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Form, FormGroup, Button, Table, Badge } from "reactstrap";
import { selectForwardState } from "../Redux/forward/forwardSlice";
import { addOrder } from "../Redux/orders/ordersSlice";
import { fetchProducts, selectAllProducts } from "../Redux/products/productsSlice";

const SelectFood = () => {
  const allProducts = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const { waiter, tableNumber } = useSelector(selectForwardState);

  const renderedProducts = allProducts.map((product) => {
    return (
      <option key={product.id} value={product.id}>
        {product.name}
      </option>
    );
  });

  const handleSubmit = (e) => {
    if (price === "" || quantity === "") {
      alert("Məlumatları tam daxil edin");
    } else {
      dispatch(
        addOrder({
          name: waiter,
          table: tableNumber,
          order: product,
          price,
          quantity,
          total: price * quantity,
          date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
        })
      );
      navigate("/");
    }

    e.preventDefault();
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <h1>Aşağıdakı listdən məhsul seçimini edin</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label> Məhsul adi</label>
          <Input type="select" name="product" id="product" aria-label="products" value={id} onChange={(e) => setId(e.target.value)}>
            <option>Mehsul sec</option>
            {renderedProducts}
          </Input>
        </FormGroup>

        <div className="d-flex align-items-center ">
          <FormGroup>
            <label>Miqdar</label>
            <Input
              type="number"
              name="quantity"
              id="quantity"
              min="0"
              aria-label="quantity"
              placeholder=""
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setPrice(allProducts.find((product) => product.id === parseInt(id)).price);
                setProduct(allProducts.find((product) => product.id === parseInt(id)).name);
              }}
            />
          </FormGroup>

          <FormGroup className="d-flex flex-column mx-4">
            <label> Qiymət</label>
            <input type="text" disabled name="price" id="price" aria-label="price" value={quantity === 1 ? price : !quantity ? 0 : quantity * price} />
          </FormGroup>
        </div>

        <div className="d-flex justify-content-between">
          <Button color="success">Əlavə et</Button>
          <Button color="primary" type="submit">
            Sifaris Ver
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SelectFood;
