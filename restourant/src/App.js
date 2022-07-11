import React from "react";
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import CreateOrder from "./features/Components/CreateOrder";
import SelectFood from "./features/Components/SelectFood";
import OrdersDetails from "./features/Components/OrdersDetails";
import OrdersTable from "./features/Components/OrdersTable";
import Navigation from "./features/Components/Navigation";
import NotFound from "./features/Components/NotFound";

const App = () => {
  return (
    <Container>
      <Navigation />
      <Routes>
        <Route path="/" element={<OrdersTable />} />
        <Route path="/makeorder" element={<CreateOrder />} />
        <Route path="/selectFood" element={<SelectFood />} />
        <Route path="/orders/:orderID" element={<OrdersDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
