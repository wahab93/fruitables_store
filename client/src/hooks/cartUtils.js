import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../redux/action';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const useAddToCart = () => {
    const stateCart = useSelector((state) => state.cartHandler.cart || []);
    const stateUser = useSelector((state) => state.userHandler);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCart = (product) => {
        if (!stateUser || !stateUser.user) {
            Swal.fire({
                title: 'You need to log in',
                text: 'Do you want to proceed to login?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, login',
                cancelButtonText: 'No, cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.setItem('pendingProduct', JSON.stringify(product));
                    navigate('/login');
                    // Navigate to login with state containing the product ID
                    // navigate('/login', { state: { from: `/products/${productId}` } });
                }
            });
            return;
        }
        dispatch(addCart(product));
        return true;
    };

    const isProductInCart = (productId) => stateCart.some((e) => e._id === productId);

    return { addToCart, isProductInCart, stateUser };
};