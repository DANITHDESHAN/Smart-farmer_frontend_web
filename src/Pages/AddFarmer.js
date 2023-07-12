import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
import { Col, Form, Input, Row, message, Card } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Table } from "antd";
import axios from "axios";

function AddFarmer() {
  const [farmers, setFarmers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/farmer/registerFarmer", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  // Fetch farmers data
  const getFarmers = async () => {
    try {
      const res = await axios.get("/api/v1/farmer/getAllFarmer");

      if (res.data.success) {
        setFarmers(res.data.data);
        console.log(res.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getFarmers();
  }, []);
  //colum of farmer table
  const columns = [
    {
      title: "Farmer Name",
      dataIndex: "firstName",
    },
    {
      title: "Province",
      dataIndex: "province",
    },
    {
      title: "District",
      dataIndex: "district",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="scrollable-content">
        <Card title="All Farmers">
          <Table columns={columns} dataSource={farmers} />
        </Card>

        <Card title="Register New Farmer">
          <Form layout="vertical" onFinish={handleFinish} className="m-3">
            <h4>Personal Details:</h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Your first name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Your last name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={12}>
                <Form.Item
                  label="Province"
                  name="province"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Your province" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={12}>
                <Form.Item
                  label="District"
                  name="district"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Your district" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={12}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Your address" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={12}>
                <Form.Item
                  label="Mobile"
                  name="mobile"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Your mobile number" />
                </Form.Item>
              </Col>
            </Row>

            <h4>Login Credentials of User:</h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={12}>
                <Form.Item
                  label="Username"
                  name="userName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Farmer username" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="password" placeholder="User password" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <button className="btn form-btn" type="submit">
                  Submit
                </button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </Layout>
  );
}

export default AddFarmer;
