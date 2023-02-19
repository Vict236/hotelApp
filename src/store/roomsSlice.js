import { createSlice } from '@reduxjs/toolkit';
import { ref, set } from "firebase/database";
import {database } from '../firebase'

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: {},
        error: '',
        guests: [],
    },
    reducers: {
        getDataRooms(state, action) {
            action.payload.rooms.map(room => {
                state.rooms[room.id] = {
                    checkInDate: room.checkInDate,
                    description: room.description,
                    features: room.features,
                    gallery: room.gallery,
                    guest: room.guest,
                    isCheckedIn: room.isCheckedIn,
                    number: room.number,
                    occupancy: room.occupancy.toString(),
                    price: room.price.toString() + '$',
                    type: room.type,
                }
            }),
            action.payload.rooms.filter(room => room.guest.length > 0).map(room => {
                state.guests.push({
                    text: room.guest,
                    value: room.guest,
                })
            })
        },

        setErrorRooms(state, action) {
            state.error = action.payload.error
            console.log(state.error)
        },

        logOut(state, action) {
            state.rooms[action.payload.roomId].isCheckedIn = false
            state.rooms[action.payload.roomId].guest = ''
            delete state.rooms[action.payload.roomId].checkInDate


            const roomKyes = Object.keys(state.rooms)
            const roomIndex = roomKyes.indexOf(action.payload.roomId)
            const stringPrice = state.rooms[action.payload.roomId].price.replace('$', '')
            const stringOccupancy = state.rooms[action.payload.roomId].occupancy.replace('$', '')

            set(ref(database, `Rooms/${roomIndex}`), {
                description: state.rooms[action.payload.roomId].description,
                features: state.rooms[action.payload.roomId].features,
                gallery: state.rooms[action.payload.roomId].gallery,
                guest: '',
                isCheckedIn: false,
                number: state.rooms[action.payload.roomId].number,
                occupancy: Number(stringOccupancy),
                price: Number(stringPrice),
                type: state.rooms[action.payload.roomId].type,
                id: action.payload.roomId,
          });
        },

        logIn(state, action) {
            state.rooms[action.payload.roomId].isCheckedIn = true
            state.rooms[action.payload.roomId].checkInDate = action.payload.checkInDate
            state.rooms[action.payload.roomId].guest = action.payload.guest

            const roomKyes = Object.keys(state.rooms)
            const roomIndex = roomKyes.indexOf(action.payload.roomId)
            const stringPrice = state.rooms[action.payload.roomId].price.replace('$', '')
            const stringOccupancy = state.rooms[action.payload.roomId].occupancy.replace('$', '')

            set(ref(database, `Rooms/${roomIndex}`), {
                checkInDate: action.payload.checkInDate,
                description: state.rooms[action.payload.roomId].description,
                features: state.rooms[action.payload.roomId].features,
                gallery: state.rooms[action.payload.roomId].gallery,
                guest: action.payload.guest,
                isCheckedIn: true,
                number: state.rooms[action.payload.roomId].number,
                occupancy: Number(stringOccupancy),
                price: Number(stringPrice),
                type: state.rooms[action.payload.roomId].type,
                id: action.payload.roomId,
          });
        }
    }
})

export const { getDataRooms, setErrorRooms, logOut, logIn } = roomsSlice.actions;
export default roomsSlice.reducer;