import { call, put } from 'redux-saga/effects'
import { database } from '../firebase'
import { onValue, ref } from "firebase/database";
import { getDataAccounts, setErrorAccounts } from '../store/accountsSlice';


function* accountsSaga() {
    try {
        var accountsRef = ref(database, 'Accounts/');
        var accounts = yield call(function () {
            return new Promise(function (resolve) {
                onValue(accountsRef, (snapshot) => {
                    var data = snapshot.val()
                    resolve(data)
                })
            })
        })
        yield put(getDataAccounts({accounts: accounts}))
    }

    catch (error) {
        yield put(setErrorAccounts({error: "Error loading Accounts collection data from Realtime Database"}));
    }
}

export default accountsSaga