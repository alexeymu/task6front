import React, {useState, useEffect, useCallback, memo} from 'react';
import {List, Empty} from 'antd';
import VirtualList from 'rc-virtual-list';
import {Message} from "../Message";

const ContainerHeight = 400;
const loadMessagesInterval = 5000;

export const MessageList = memo((props) => {
    const {username} = props;
    const [messages, setMessages] = useState([]);

    const loadMessages = useCallback(() => {
        fetch(process.env.REACT_APP_API + '/messages/list', {
            method: 'POST',
            body: JSON.stringify({recipient: username}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((messages) => {
                console.log(messages)
                setMessages(messages)
            })
            .catch((e) => {
                alert('Error when fetch messages list', e)
            })
    }, [username])

    useEffect(() => {
        loadMessages()

        const interval = setInterval(loadMessages, loadMessagesInterval)

        return () => {
            interval && clearInterval(interval)
        }
    }, [loadMessages])

    if (messages.length === 0) {
        return <Empty description={'No messages'}/>
    }

    return (
        <List>
            <VirtualList
                data={messages}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="_id"
            >
                {(item) => (
                    <List.Item key={item.email}>
                        <Message {...item} />
                    </List.Item>
                )}
            </VirtualList>
        </List>
    )
})
