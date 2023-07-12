import React from "react";
import Layout from "../Component/Layout";
import { Col, Form, Input, Row, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const { TextArea } = Input;

function Crop() {
  const dispatch = useDispatch();
  //crop form handler
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/crop/addCrop", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <Layout>
      <h4 className="text-center">ADD NEW CROP</h4>
      <button className="all-crop">View Crop List</button>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Crop Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={12}>
            <Form.Item
              label="crop name"
              name="cropName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="enter crop name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <Form.Item
              label="crop type"
              name="cropType"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="nter crop type" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <Form.Item
              label="duration"
              name="duration"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="enter crop duration" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <Form.Item
              label="crop guide"
              name="guide"
              required
              rules={[{ required: true }]}
            >
              <TextArea rows={4} placeholder="enter guide" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
}

export default Crop;
