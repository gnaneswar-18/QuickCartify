import React, { useEffect, useState } from 'react';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import summaryapi from '../common/summaryapi';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setcartitems } from '../store/cartslice';
import Loading from '../components/loading.jsx';

const AddToCartButton = ({ data }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [qty, setQty] = useState(1);
    const [cartItemDetails, setCartItemDetails] = useState(null);
    const userCart = useSelector(state => state.cart.cartitems);

    const fetchCartDetails = async () => {
        try {
            const response = await Axios({ ...summaryapi.getcartitems });
            if (response?.data?.success) {
                dispatch(setcartitems(response.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            setLoading(true);
            const response = await Axios({
                ...summaryapi.addtocart,
                data: { productId: data._id }
            });
            if (response.data.success) {
                await fetchCartDetails();
                toast.success("Added to cart");
            }
        } catch (error) {
            console.log(error);
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const updateCartItem = async (updatedQty) => {
        if (!cartItemDetails || !cartItemDetails._id) return;

        try {
            const response = await Axios({
                ...summaryapi.updatecartitem,
                data: {
                    id: cartItemDetails._id,
                    qty: updatedQty
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchCartDetails();
            }
        } catch (error) {
            AxiosToastError(error.message);
        }
    };
    const deletecart=async(cartid)=>{
        try{
            const response=await Axios({
                ...summaryapi.deletecartitem,
                data:{id: cartid}
            });
            if(response.data.success){
                toast.success(response.data.message)
                await fetchCartDetails();
            }
        }catch(error){
            AxiosToastError(error)
        }
    }

    useEffect(() => {
        const product = userCart.find(item => item.productId._id === data._id);
        if (product) {
            setIsInCart(true);
            setCartItemDetails(product);
            setQty(product.quantity );
        } else {
            setIsInCart(false);
            setCartItemDetails(null);
            setQty(1);
        }
    }, [data, userCart]);

    const increaseQty = async (e) => {
        e.preventDefault();
        const newQty = qty + 1;
        setQty(newQty);
        updateCartItem(newQty);
    };

    const decreaseQty = async (e) => { 
        e.preventDefault();
        if (qty > 1) {
            const newQty = qty - 1;
            setQty(newQty);
            updateCartItem(newQty);
        }
        else{
            await deletecart(cartItemDetails._id)
            await fetchCartDetails();
        }
    };

    return (
        isInCart ? (
            <div className="flex items-center gap-2">
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={decreaseQty}>-</button>
                <p>{qty}</p>
                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={increaseQty}>+</button>
            </div>
        ) : (
            <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-800" onClick={handleCart}>
                {loading ? <Loading /> : "ADD"}
            </button>
        )
    );
};

export default AddToCartButton;
