import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/UserSlice";
import storeSlice from "./Slice/StoreSlice";
import MerchantsSlice from "./Slice/MerchantsSlice";


const store = configureStore({
    reducer: {
        user: userSlice,
        store:storeSlice,
        merchant:MerchantsSlice,
      },
});

export default store;