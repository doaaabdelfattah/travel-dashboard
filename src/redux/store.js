import { configureStore } from "@reduxjs/toolkit";
// import productsReducer from "./reducers/productsSlice";
// import categoriesReducer from './reducers/categoriesSlice'
import orderReducer from './reducers/OrderSlice'
import userReducer from './reducers/usersSlice'
import servicesReducer from './reducers/servicesSlice'
import airBalloonReducer from './reducers/airBalloonRidesSlice'
export const store = configureStore({
        reducer: {
                // products: productsReducer,
                // categories: categoriesReducer,
                orders: orderReducer,
                users: userReducer,
                services: servicesReducer,
                rides: airBalloonReducer,
        }
});