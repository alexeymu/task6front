import React, {useEffect, useState, useMemo, memo, useCallback} from 'react'
import {AutoComplete, Form, Input, Button} from 'antd'

export const SendMessage = memo((props) => {
    const {username} = props
    const [users, setUsers] = useState([])
    const form = React.useRef();

    useEffect(() => {
        fetch(process.env.REACT_APP_API + '/users', {method: 'GET'})
            .then(res => res.json())
            .then((usersList) => {
                setUsers(usersList)
            })
            .catch((e) => {
                alert('Error when fetch users list', e)
            })
    }, [])


    const usersListOptions = useMemo(() => {
        return users.map(({username}) => ({
            label: username,
            value: username
        }))
    }, [users])

    const handleSubmit = useCallback((values) => {
        const {recipient} = values;
        const recipientFromList = users.find((u) => (u.username === recipient))

        if (!recipientFromList) {
            form.current.setFields([
                {
                    name: 'recipient',
                    errors: ['Recipient name not from list'],
                },
            ]);
            return;
        }

        fetch(process.env.REACT_APP_API + '/messages', {
            method: 'POST',
            body: JSON.stringify({
                ...values,
                username
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch((e) => {
                console.log(e)
                alert('Error when add message')
            })

        form.current.resetFields();
    }, [form, username, users])

    return (
        <Form
            onFinish={handleSubmit}
            ref={form}
        >
            <Form.Item
                rules={
                    [{
                        required: true,
                        message: 'Please select recipient',
                    }]}
                name={'recipient'}
            >
                <AutoComplete
                    options={usersListOptions}
                    style={{width: 200}}
                    filterOption={(inputValue, option) => {
                        if (option.value) {
                            return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    }}
                    placeholder="Recipient"
                />
            </Form.Item>
            <Form.Item
                rules={
                    [{
                        required: true,
                        message: 'Please input title',
                    }]
                }
                name='title'
            >
                <Input placeholder="Title"/>
            </Form.Item>
            <Form.Item
                rules={
                    [{
                        required: true,
                        message: 'Please input message',
                    }]
                }
                name='message'
            >
                <Input.TextArea placeholder="Title"/>
            </Form.Item>
            <Form.Item>
                <Button type={'primary'} htmlType={'submit'}>Send</Button>
            </Form.Item>
        </Form>
    )
})
