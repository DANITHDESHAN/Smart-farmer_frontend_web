import React from "react";
import "../Css/register.css";
import { Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import logo from "../Img/smartfarmer.png";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div>
      {/* <h1 class="text-center">Login Page</h1> */}
      <div className="form-container">
        <Form
          className="form-wrapper"
          name="register-user"
          onFinish={onfinishHandler}
          initialValues={{
            remember: true,
          }}
        >
          <img src={logo} className="form-image" alt="img" />
          <div className="form-gap" alt=""></div>
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

          <Form.Item>
            <button type="submit" className="login-form-button">
              Sign up
            </button>
            {/* <button className="login-form-button" type="submit">
            Register
          </button> */}
            <Link to="/register" className="m-2">
              Don't have an account Sign in
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
