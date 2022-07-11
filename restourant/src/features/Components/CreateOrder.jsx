/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Form, FormGroup, Button, Badge } from "reactstrap";
import { fetchWaiters, selectAllWaiters } from "../Redux/waiters/waitersSlice";
import { useNavigate } from "react-router-dom";
import { addWaiter } from "../Redux/forward/forwardSlice";

const CreateOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allWaiters = useSelector(selectAllWaiters);

  const renderedWaiters = allWaiters.map((waiter) => {
    return (
      <option key={waiter.id} value={waiter.name}>
        {waiter.name}
      </option>
    );
  });

  const [waiter, setWaiter] = useState("");
  const [table, setTable] = useState(0);

  const handleSubmit = (e) => {
    if (waiter === "" || table === 0) {
      alert("Məlumatları tam daxil edin");
    } else {
      dispatch(addWaiter({ waiterName: waiter, tableNumber: table }));
      navigate("/selectFood");
    }
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(fetchWaiters());
  }, []);

  return (
    <div>
      <Badge className="w-100" color="primary">
        <h5>Aşağıdakı listdən ofisiant və masa seçimini edin</h5>
      </Badge>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Ofisiant</label>
          <Input type="select" name="waiter" id="waiter" aria-label="waiter" value={waiter} onChange={(e) => setWaiter(e.target.value)}>
            <option>Ofisiant seç</option>
            {renderedWaiters}
          </Input>
        </FormGroup>

        <div className="d-flex align-items-center">
          <FormGroup>
            <label htmlFor="table">Masa sec</label>
            <Input type="number" name="table" id="table" aria-label="table" placeholder="" min={0} value={table} onChange={(e) => setTable(e.target.value)} />
          </FormGroup>
          <Button className="mt-2 mx-3">Sifaris yarat</Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateOrder;
