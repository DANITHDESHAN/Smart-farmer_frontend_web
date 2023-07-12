import React from "react";
import "../Css/register.css";
import { Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import logo from "../Img/smartfarmer.png";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
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
    <div>
      {/* <h1 class="text-center">Registration Page</h1> */}
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
          initialValues={{
            remember: true,
          }}
        >
          <img src={logo} className="form-image" alt="img" />
          <div>&nbsp;&nbsp;</div>
          <div className="form-gap" alt=""></div>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-mail address"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="checkbox">Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="regi">
              Forgot password
            </a>
          </Form.Item>
          {/* <Form.Item>
          <a className="errtext">
          Password or user name incorrect!
          </a>
        </Form.Item> */}

          <Form.Item>
            <button type="submit" className="login-form-button">
              Sign in
            </button>
            <Link to="/login" className="m-2">
              Already user login here
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
