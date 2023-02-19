import { call, put } from 'redux-saga/effects'
import { database } from '../firebase'
import { onValue, ref } from "firebase/database";
import { getDataRooms, setErrorRooms } from '../store/roomsSlice';


function* roomsSaga() {
    try {
        var roomsRef = ref(database, 'Rooms/');
        var rooms = yield call(function () {
            return new Promise(function (resolve) {
                onValue(roomsRef, (snapshot) => {
                    var data = snapshot.val()
                    resolve(data)
                })
            })
        })
        yield put(getDataRooms({rooms: rooms}))
    }

    catch (error) {
        yield put(setErrorRooms({error: "Error loading Rooms collection data from Realtime Database"}));
    }
}

export default roomsSaga