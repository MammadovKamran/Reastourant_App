import React from "react";
import { Badge } from "reactstrap";
import { useSelector } from "react-redux";
import { selectAllOrders } from "../Redux/orders/ordersSlice";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";

const OrdersDetails = () => {
  const { orderID } = useParams();
  const allOrders = useSelector(selectAllOrders);
  const renderedOrder = allOrders.map((order) => {
    if (order.id == orderID) {
      return (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.name}</td>
          <td>{order.order}</td>
          <td>{order.price} Azn</td>
          <td>{order.quantity} eded</td>
          <td>{order.total} Azn</td>
        </tr>
      );
    }
  });
  return (
    <div>
      <Badge className="w-100" color="primary">
        <h5>Order details</h5>
      </Badge>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Order</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{renderedOrder}</tbody>
      </Table>
    </div>
  );
};

export default OrdersDetails;
