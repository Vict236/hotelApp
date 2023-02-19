import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, DatePicker } from 'antd';
import { useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../store/roomsSlice';


function CheckIn() {
    const location = useLocation()
    const roomId = location.pathname.replace('/rooms/', '')
    const rooms = useSelector(state => state.rooms.rooms)

    const dispatch = useDispatch();

    const isCheckedIn = rooms[roomId].isCheckedIn
    const [disabledRoom, setDisabledRoom] = useState('')
    const [checkInDate, setCheckInDate] = useState('')

    useEffect(() => {
        setDisabledRoom(isCheckedIn ? 'disabled' : '')
    }, [isCheckedIn])

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const onChange = (date, dateString) => {
        setCheckInDate(dateString);
    };

    const onFinish = (values) => {
        const guest = values.guestname;
        dispatch(logIn({ roomId, checkInDate, guest }))

        setTimeout(() => {
            setOpen(false);
        }, 1000);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal} className='check-button' disabled={disabledRoom}>
                Check In
            </Button>
            <Modal
                open={open}
                title="Check In"
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item className='checkIn-titles'
                        label="Please, enter the guest's name:"
                        name="guestname"
                        rules={[{ required: true, message: 'Please enter guest name!' }]}
                    >
                        <Input placeholder="Guest's name" prefix={<UserOutlined />} />
                    </Form.Item>

                    <br />

                    <Form.Item className='checkIn-titles'
                        label="Please, enter the approximate date of guest checkout:"
                    >
                        <DatePicker onChange={onChange} />
                    </Form.Item>

                    <Form.Item className='cneckIn-buttons'
                        wrapperCol={{
                            offset: 17,
                            span: 16,
                        }}
                    >
                        
                        <br />
                        <Button key="back" onClick={handleCancel} className='cancel-button'>
                            Cancel
                        </Button>,
                        <Button htmlType="submit" type="primary" className='check-button'>
                            Check In
                        </Button>,

                    </Form.Item>
                </Form>
            </Modal >
        </>);
}

export default CheckIn