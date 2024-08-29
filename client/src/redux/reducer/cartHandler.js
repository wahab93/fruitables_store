const initialState = {
    cart: [],
    stock: {},
    origninalStock: {}
};

const cartHandler = (state = initialState, action) => {
    const product = action.payload;
    console.log('what is in the Redux', product)
    switch (action.type) {
        case 'SET_REMAINING_STOCK':
            return {
                ...state,
                origninalStock: {
                    ...state.origninalStock,
                    [action.payload.productId]: action.payload.remainingStock,
                },
            };
        case "ADDITEM":
            // check if product is already exist
            const exist = state.cart.find((item) => item._id === product._id)
            if (exist) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item._id === product._id
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    ),
                    stock: {
                        ...state.stock,
                        [product._id]: state.stock[product._id] - 1,
                    },
                };
            } else {
                return {
                    ...state,
                    cart: [
                        ...state.cart,
                        {
                            ...product,
                            qty: 1,
                        },
                    ],
                    stock: {
                        ...state.stock,
                        [product._id]: state.stock[product._id] - 1,
                    },
                };
            }
        case "DELITEM":
            const itemToDel = state.cart.find((item) => item._id === product._id);
            if (itemToDel.qty === 1) {
                return {
                    ...state,
                    cart: state.cart.filter((item) => item._id !== itemToDel._id),
                    stock: {
                        ...state.stock,
                        [product._id]: (state.stock[product._id] || 0) + 1,
                    },
                };
            } else {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item._id === product._id
                            ? { ...item, qty: item.qty - 1 }
                            : item
                    ),
                    stock: {
                        ...state.stock,
                        [product._id]: (state.stock[product._id] || 0) + 1,
                    },
                };
            }
        case "DELETE_PRODUCT_FROM_CART":
            const { _id } = product;
            // Remove the product from both stock and originalStock
            const { [_id]: removedStock, ...remainingStock } = state.stock;
            const { [_id]: removedOriginalStock, ...remainingOriginalStock } = state.origninalStock;
            return {
                ...state,
                cart: state.cart.filter((item) => item._id !== _id),
                stock: remainingStock, // Update stock to remove the deleted product
                origninalStock: remainingOriginalStock, // Update originalStock to remove the deleted product
            };

        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
                stock: {
                    ...state.stock,
                    ...state.cart.reduce((acc, item) => {
                        acc[item._id] = (state.stock[item._id] || 0) + item.qty;
                        return acc;
                    }, {}),
                },
                origninalStock: {
                    ...state.origninalStock,
                },
            };
        case "ADJUST_QTY_ON_STOCK_LIMIT":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item._id === action.payload.productId
                        ? {
                            ...item,
                            qty: Math.min(item.qty, state.origninalStock[item._id] || item.qty),
                        }
                        : item
                ),
                stock: {
                    ...state.stock,
                    [action.payload.productId]: Math.max(
                        (state.origninalStock[action.payload.productId] || 0) - action.payload.qty,
                        0
                    ),
                },
            };
        default:
            return state
    }
}

export default cartHandler;