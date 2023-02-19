import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button, Space, Table, Checkbox, Layout } from 'antd';
import Header from '../components/Header';
import { Link, Outlet } from "react-router-dom";

const RoomsTablePage = () => {

    const { Content } = Layout;

    const logged = localStorage.getItem("logged");
    console.log(logged)
    const guests = useSelector(state => state.rooms.guests)
    const [data, setData] = useState([])
    const [checked, setChecked] = useState(false)

    const rooms = useSelector(state => state.rooms.rooms)
    const roomKeys = Object.keys(rooms)

    const freeRooms = Object.values(rooms).filter(room => room.guest.length === 0)

    useEffect(() => {
        setData(
            checked ? freeRooms : Object.values(rooms)
            )
        }, [checked, rooms])


    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const onChange = () => {
        setChecked(prevChecked => !prevChecked)
    };


    const columns = [
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
            ellipsis: true,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            filters: [
                {
                    text: 'standard',
                    value: 'standard',
                },
                {
                    text: 'suite',
                    value: 'suite',
                },
                {
                    text: 'deluxe',
                    value: 'deluxe',
                },
            ],
            filteredValue: filteredInfo.type || null,
            onFilter: (value, record) => record.type.includes(value),
            ellipsis: true,
        },
        {
            title: 'Occupancy',
            dataIndex: 'occupancy',
            key: 'occupancy',
            filters: [
                {
                    text: '1',
                    value: 1,
                },
                {
                    text: '2',
                    value: 2,
                },
                {
                    text: '3',
                    value: 3,
                },
                {
                    text: '4',
                    value: 4,
                },
            ],
            filteredValue: filteredInfo.occupancy || null,
            onFilter: (value, record) => record.occupancy.includes(value),
            ellipsis: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price.replace('$', '') - b.price.replace('$', ''),
            sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Guest',
            dataIndex: 'guest',
            key: 'guest',
            filters: guests,
            filteredValue: filteredInfo.guest || null,
            onFilter: (value, record) => record.guest.includes(value),
            ellipsis: true,
        },
        {
            title: '',
            dataIndex: 'number',
            key: 'number',
            render: (keys) => < Link to={`/rooms/${roomKeys[keys - 1]}`}
                className="table-button"
            >
                More information
            </Link>
        },
    ];

    return (
        <Layout className="layout">
            {logged === 'false' && <Navigate to="/login" />}
            {logged === null && <Navigate to="/login" />}
            <Header />

            <Content>

                <Space
                    style={{
                        margin: "15px 50px",
                        display: 'flex'
                    }}
                >
                    <Button onClick={clearFilters} className='table-button'>Clear all filters</Button>
                    <Checkbox onChange={onChange}>Free rooms only</Checkbox>
                </Space>
                <Table columns={columns} dataSource={data} pagination={{
                    position: ["bottomCenter"],
                }} onChange={handleChange} rowKey="number" />

            </Content>

            <Outlet />
        </Layout>
    )
};

export default RoomsTablePage;