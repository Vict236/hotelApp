import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/roomsSlice';

function CheckOut() {
    const location = useLocation()
    const roomId = location.pathname.replace('/rooms/', '')
    const rooms = useSelector(state => state.rooms.rooms)
    
    const dispatch = useDispatch();

    const isCheckedIn = rooms[roomId].isCheckedIn
    const [disabledRoom, setDisabledRoom] = useState('')
    useEffect(() => {
        setDisabledRoom(isCheckedIn ? '' : 'disabled')
    }, [isCheckedIn])

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        dispatch(logOut({ roomId }))

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 2000);
        
    };
    const handleCancel = () => {
        setOpen(false);
    };


    return (
        <>
            <Button type="primary" onClick={showModal} className='check-button' disabled={disabledRoom}>
                Check Out
            </Button>
            <Modal 
                open={open}
                title="Check Out"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel} className='cancel-button'>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk} className='check-button'>
                        Confirm
                    </Button>,
                ]
                }
            >
                <p className='checOut-content'>Do you confirm the check-out Room{rooms[roomId].number}?</p>
                <br />
            </Modal >
        </>);
}

export default CheckOut