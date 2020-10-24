import React from 'react';
import { Table } from 'antd';

const MeetingTable = ({ meetings }) => {
    console.log(meetings);
    const columns = [
        {
            title: 'Person',
            dataIndex: 'person',
        },

        {
            title: 'Date',
            dataIndex: 'date',
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <Table columns={columns} dataSource={meetings} onChange={onChange} />
    );
};

export default MeetingTable;