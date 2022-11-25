import React, {memo} from 'react';
import {format} from 'date-fns'
import styles from './index.module.css';
import { Collapse } from 'antd';

const { Panel } = Collapse;



export const Message = memo((props) => {
    const {username, title, message, dateCreate} = props;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <span className={styles.sectionTitle}>
                        Sender:
                    </span>
                    {' '}
                    {username}
                </div>
                <div>
                    <span className={styles.sectionTitle}>
                        Date create:
                    </span>
                    {' '}
                    {format(new Date(dateCreate), 'dd.MM.yyyy HH:mm:ss')}
                </div>
            </div>
            <div className={styles.title}>
                <Collapse defaultActiveKey={['1']} ghost>
                    <Panel 
                        header={
                            <div>
                                <span className={styles.sectionTitle}>
                                    Title:
                                </span>
                                {' '}
                                {title}
                            </div>
                        }
                    > 
                        <div className={styles.message}>
                            <span className={styles.sectionTitle}>
                                Message:
                            </span>
                            {' '}
                            {message}
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
})
