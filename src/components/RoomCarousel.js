import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const contentStyle = {
    width: '900px',
    maxHeight: '500px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
};

function RoomCarousel() {
    const rooms = useSelector(state => state.rooms.rooms)
    const [gallery, setGallery] = useState([])


    const location = useLocation()

    useEffect(() => {
        const id = location.pathname.replace('/rooms/', '');
        setGallery(rooms[id].gallery)

    }, [location])

    return (
        <Carousel autoplay>
            {gallery.map(item => <div key={item}>
                <img style={contentStyle} src={item} alt='room-slide' />
            </div>)}
        </Carousel>
    )
}

export default RoomCarousel;