// import { takeLatest, put, call } from 'redux-saga/effects';
// import { setUserName } from '../actions'; // Asegúrate de que la ruta es correcta

// // Simula una llamada API o cualquier tarea asíncrona
// function* fetchUserName(action) {
//   try {
//     // Aquí podrías hacer una llamada API, por ejemplo:
//     // const response = yield call(api.fetchUserName, action.payload);

//     // Simulando un retraso
//     yield call(delay, 1000);

//     // Despacha la acción para establecer el nombre del usuario
//     yield put(setUserName(action.payload));
//   } catch (e) {
//     console.error(e);
//     // Aquí podrías manejar errores si es necesario
//   }
// }

// // Delay simulado para efectos de ejemplo
// const delay = (ms) => new Promise(res => setTimeout(res, ms));

// // Watcher saga
// export function* watchFetchUser() {
//   yield takeLatest('SET_USER_NAME', fetchUserName);
// }
