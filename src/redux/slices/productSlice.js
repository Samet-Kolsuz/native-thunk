import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('https://fakestoreapi.com/products')

        console.log(response.data)
        return response.data
    }
)

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        favorites: [],
        isLoading: false,
        error: null
    },
    // Define reducers and extraReducers if needed
    reducers:{
        toggleFavorite:(state, action)=>{
            const id = action.payload;

            if(!state.favorites.includes(id)){
                state.favorites.push(id);
            }
            else{
                state.favorites = state.favorites.filter(productId => productId !== id);
            }
        }

    },
    // You can add async thunks or other actions here
    extraReducers: (builder) => {

        // isteğimin yükleniyor olması durumunda
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                console.log("Şuanda api isteği atılıyor.")
            })
            // başarısız olması durumunu yakala
            .addCase(fetchProducts.rejected, (state)=>{
                state.isLoading = false;
                state.error = "Hata oluştu."
                console.log("Api isteğinde hata oluştu!!!")
            })
            // başarılı olması durumunu yakala
            .addCase(fetchProducts.fulfilled, (state,action)=>{
                state.items = action.payload
                state.isLoading = false;
                console.log("Api isteği başarıyla atıldı ve cevap alındı.")
            })
    }
 
})



export const { toggleFavorite } = productSlice.actions;
export default productSlice.reducer;