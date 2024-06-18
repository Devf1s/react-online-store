import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: localStorage.getItem('basket') !== null
	? JSON.parse(localStorage.getItem('basket')) : []
}

const saveProducts = (state) => {
	localStorage.setItem('basket', JSON.stringify(state));
};

const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		addProduct: (state, action) => {
			state.products.push(action.payload);
			saveProducts(state.products.map(product => product));
		},
		removeProduct: (state, action) => {
			state.products = state.products.filter(product => product.id !== action.payload);
			saveProducts(state.products.map(product => product));
		}
	}
});

export const { addProduct, removeProduct } = basketSlice.actions;
export default basketSlice.reducer;