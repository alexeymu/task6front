import React, {useCallback, useState} from "react";
import {SendMessage} from "./components/SendMessage";
import {LogicForm} from "./components/LogicForm";
import {MessageList} from "./components/MessageList";
import {Col, Row, Divider} from 'antd';

const SPAN_COL = 8;
const OFFSET_COL = 10;

export default function App() {
    const [username, setUsername] = useState('')

    const handleSetName = useCallback((username) => {
        setUsername(username)

        fetch(process.env.REACT_APP_API + '/users', {
            method: 'POST',
            body: JSON.stringify({username}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const handleLogout = useCallback(() => {
        setUsername('')
    }, [])

    return (
        <div>
            <Row>
                <Col span={SPAN_COL} offset={OFFSET_COL}>
                    <h1>Task 6 - Nikolaev</h1>
                </Col>
            </Row>
            <Row>
                <Col span={SPAN_COL} offset={OFFSET_COL}>
                    <LogicForm submitName={handleSetName} logout={handleLogout} disabled={!!username}/>
                </Col>
            </Row>

            {username && (
                <>
                    <Divider/>
                    <Row>
                        <Col span={SPAN_COL} offset={OFFSET_COL}>
                            <SendMessage username={username}/>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={SPAN_COL} offset={OFFSET_COL}>
                            <h1>Messages:</h1>
                            <MessageList username={username}/>
                        </Col>
                    </Row>
                </>
            )}

        </div>
    );
}
