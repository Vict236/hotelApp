import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { Space, Layout, Col, Row } from 'antd';
import home from "../images/home.png"
import RoomCarousel from "../components/RoomCarousel"
import check from '../images/check.png'
import CheckOut from "../components/CheckOut";
import CheckIn from "../components/CheckIn";


function SingleRoomPage() {

    const logged = localStorage.getItem("logged");

    const rooms = useSelector(state => state.rooms.rooms)

    const location = useLocation()
    const roomId = location.pathname.replace('/rooms/', '')


    return (
        <>
            <Layout className="layout">
            {logged === 'false' && <Navigate to="/login" />}
            {logged === null && <Navigate to="/login" />}
            
                <Header />

                <Space style={{
                    margin: 20,
                    display: 'flex'
                }}>

                    < Link to={`/`} className="home-button">
                        <img src={home} alt="home" />
                        <h3>Back home</h3>
                    </Link>
                </Space>

                <Row gutter={[25, 8]} style={{
                    marginLeft: 37.5,
                    marginRight: 37.5,
                    height: '500px',
                }}>

                    {Object.keys(rooms).length > 0 && <Col span={12}>
                        <RoomCarousel />
                    </Col>}

                    {Object.keys(rooms).length > 0 && <Col span={5} >
                        <h1 className="roomData-h1">Room {rooms[roomId].number}</h1>
                        <div className="roomData-h3">
                            <h3>Type :</h3><p>{rooms[roomId].type.charAt(0).toUpperCase()}{rooms[roomId].type.slice(1)}</p>
                        </div>
                        <div className="roomData-h3">
                            <h3>Occupancy :</h3><p>{rooms[roomId].occupancy}</p>
                        </div>
                        <div className="roomData-h3">
                            <h3>Price :</h3><p>{rooms[roomId].price}</p>
                        </div>
                        <div className="roomData-h3">
                            <h3>Guest :</h3><p>{rooms[roomId].guest}</p>
                        </div>
                    </Col>}


                    {Object.keys(rooms).length > 0 && <Col span={7}>

                        <Space className="checkIn-checkOut">
                            <CheckIn />
                            <CheckOut />
                        </Space>

                        <div className="roomFeatures">
                            <h3>Features :</h3>
                            <div className="features">
                                {rooms[roomId].features.map(feature =>
                                    <div key={feature} className="feature-item">
                                        <p><img src={check} /> {feature}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </Col>}
                </Row>

                {Object.keys(rooms).length > 0 && <div className="roomData-h3 description">
                    <h3>Description:</h3><p>{rooms[roomId].description}</p>
                </div>}


            </Layout>

        </>
    )
}

export default SingleRoomPage