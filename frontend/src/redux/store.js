const { configureStore } = require("@reduxjs/toolkit");
const { default: authSlice } = require("./auth/authSlice");

const store = configureStore({
    reducer: {
        auth: authSlice,
    }
})


export default store;