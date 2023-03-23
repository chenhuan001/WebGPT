import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import '../login/login.css'
import React from 'react';
import { useState, useRef } from 'react'
import apis from '../util/api/api'

import { useNavigate } from 'react-router-dom'

const App = () => {
    const [form] = Form.useForm();
    const loginForm = useRef(null)
    const registerForm = useRef(null)
    const history = useNavigate();
    const login = (values) => {
        // apis.login(values).then(res=>{
        //     // if(res.data.code == 200){

        //     // }
        // })
        history('/home')
    };
    const register = (values) => {
        apis.register(values).then(res=>{

        })
    };
    let [loginOrRegister, setloginOrRegister] = useState(0);
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    return (
        <div className='login'>
            {loginOrRegister == 0 ? (
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={login}
                    ref={loginForm}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        <span className='or'>Or</span> <span className='register' onClick={() => { setloginOrRegister(1); loginForm.current.resetFields() }}>注册</span>
                    </Form.Item>
                </Form>) : (
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={register}
                    ref={registerForm}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                            {
                                type: 'email',
                                message: '邮箱格式有误!',
                            },
                            {
                                required: true,
                                message: '请输入邮箱!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="nickname"
                        label="用户名"
                        tooltip="你希望别人用什么名字来称呼你?"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                        <Button className='margin-l' type="primary" onClick={() => { setloginOrRegister(0); registerForm.current.resetFields() }}>
                            返回
                        </Button>
                    </Form.Item>
                </Form>)}

        </div>
    );
};
export default App;