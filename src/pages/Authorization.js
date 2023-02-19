import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const Autorization = () => {

  const [errorMess, setErrorMes] = useState()
  const [remember, setRemember] = useState(true)

  const accounts = useSelector(state => state.accounts.accounts);
  const logged = localStorage.getItem("logged");

  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Success:', values);
    var keys = Object.keys(accounts)
    for (var i = 0; i < keys.length; i++) {
      if (values.username === keys[i] && values.password === accounts[keys[i]].password) {
        console.log("Success autorization!")
        if (remember) {
          localStorage.setItem("username", values.username)
          localStorage.setItem("password", values.password)
        }
        localStorage.setItem("logged", true)
        navigate("/")
      }
    }
    if (logged === 'false' || logged === "null") {
      setErrorMes("Invalid username or password")
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className='autorization-container'>
      {logged === 'true' && <Navigate to="/" />}
      <section className='autorization'>
        <h3 className='autorizationHeader'>Autentification</h3>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className='autorizationForm'
        >
          <Form.Item

            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="small"/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="small"/>
          </Form.Item>

          {errorMess}

          <div className='remember-checkbox'>
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
              <Checkbox onClick={() => setRemember((prevRemember) => { return !prevRemember })}>Remember me</Checkbox>
            </Form.Item>
          </div>

          <Form.Item wrapperCol={{ offset: 9, span: 20 }}>
            <Button type="primary" htmlType="submit" className='autorizationButton'>
              Log in
            </Button>
          </Form.Item>
        </Form>

      </section>
    </div>
  );
};


export default Autorization