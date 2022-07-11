import React, { useEffect } from "react";
import { Table, Button } from "reactstrap";
import { fetchOrders, selectAllOrders } from "../Redux/orders/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Badge } from "reactstrap";

const OrdersTable = () => {
  const allOrders = useSelector(selectAllOrders);
  const totalPrice = allOrders
    .map((acc) => {
      return acc.total;
    })
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderedOrders = allOrders.map((order) => {
    return (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.name}</td>
        <td>{order.order}</td>
        <td>{order.date}</td>
        <td>{order.price} Azn</td>
        <td>{order.quantity} eded</td>
        <td>{order.total} Azn</td>
        <td>
          <Button color="danger">
            <Link to={`/orders/${order.id}`} className="text-decoration-none text-light">Ətraflı</Link>
          </Button>
        </td>
      </tr>
    );
  });

  const handleNavigate = (paramsUrl) => {
    navigate(paramsUrl);
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <div>
      <Badge className="w-100" color="primary"><h5>Orders</h5></Badge>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Order</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Etrafli</th>
          </tr>
        </thead>
        <tbody>{renderedOrders}</tbody>
      </Table>
      <div className="d-flex justify-content-between" style={{ marginRight: "150px " }}>
        <Button color="primary" onClick={() => handleNavigate("/makeorder")}>
          Sifaris Ver
        </Button>
        <Badge color="success" style={{ padding: "13px 37px " }}>
          Total: {totalPrice} Azn
        </Badge>
      </div>
    </div>
  );
};

export default OrdersTable;
