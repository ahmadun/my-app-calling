import { Form, Button } from "react-bootstrap";

import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ConfirmTrouble = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
  });

  const { product_name, product_price, product_description } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    // await axios.post("http://localhost:3000/posts", user);
    // alert("Data Inserted");
    history.push("/");
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="row">
          <div className="col-md-12">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">Monthly Recap Report</h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <Form onSubmit={(e) => onSubmit(e)}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Product Name"
                          name="product_name"
                          value={product_name}
                          onChange={(e) => onInputChange(e)}
                        />
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter email"
                          placeholder="Enter Product Price"
                          name="product_price"
                          value={product_price}
                          onChange={(e) => onInputChange(e)}
                        />
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter email"
                          placeholder="Enter Product Description"
                          name="product_description"
                          value={product_description}
                          onChange={(e) => onInputChange(e)}
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmTrouble;
