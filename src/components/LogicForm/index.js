import React, {useCallback} from 'react'
import {Input, Form, Button} from 'antd'

export const LogicForm = (props) => {
    const {submitName, logout, disabled} = props;

    const onFinish = useCallback((values) => {
        submitName(values.username)
    }, [submitName])

    return (
        <Form onFinish={onFinish}>
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input placeholder="Username" disabled={disabled}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={disabled}>Submit</Button>
                <Button type="primary" disabled={!disabled} onClick={logout}>Logout</Button>
            </Form.Item>
        </Form>
    )
}
