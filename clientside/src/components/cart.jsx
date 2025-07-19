import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCartPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { discountprice } from '../utils/discountprice';
import currency from '../utils/currency';
import { setcartitems } from '../store/cartslice';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import summaryapi from '../common/summaryapi';
import { MdDelete } from "react-icons/md";
import Divider from './divider';

const Cart = ({ close }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartitems);
    const user = useSelector(state => state.user)
    const [cartSize, setCartSize] = useState(0);
    const [discountTotal, setDiscountTotal] = useState(0);
    const [originalTotal, setOriginalTotal] = useState(0);

    const clearCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (cartSize === 0) {
            toast.error("Cart is already empty!");
            return;
        }
        try {
            const response = await Axios({ ...summaryapi.clearcartitem });
            if (response?.data?.success) {
                dispatch(setcartitems([]));
                toast.success("Cart cleared successfully!",{position: 'bottom-left'});
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };
    const fetchCartDetails = async () => {
        try {
            const response = await Axios({ ...summaryapi.getcartitems });
            if (response?.data?.success) {
                dispatch(setcartitems(response.data.data));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const deletecartitem = async (cartid) => {
        try {
            const response = await Axios({
                ...summaryapi.deletecartitem,
                data: { id: cartid }
            });
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchCartDetails()
            }
        } catch (error) {
            AxiosToastError(error)
        }

    }
    const handlecheckout = () => {
        if (user._id) navigate('/checkout');
        else toast("Please login to proceed with checkout!")
    }
    useEffect(() => {
        const discountedPrice = (cartItems || []).reduce((prev, curr) =>
            prev + (discountprice(curr.productId.price, curr.productId.discount) * curr.quantity), 0);
        setDiscountTotal(discountedPrice);

        const totalPrice = (cartItems || []).reduce((prev, curr) =>
            prev + (curr.productId.price * curr.quantity), 0);
        setOriginalTotal(totalPrice);

        const size = (cartItems || []).reduce((prev, curr) => prev + curr.quantity, 0);
        setCartSize(size);
    }, [cartItems]);

    return (
        <section className="fixed inset-0 bg-black/50 flex justify-end z-50 ">
            <div className="bg-white w-full max-w-sm h-screen shadow-lg flex flex-col">

                <div className="p-4 flex items-center justify-between border-b">
                    <div className="flex items-center gap-2">
                        <FaCartPlus size={24} className="text-gray-700" />
                        <span className="text-lg font-semibold">{cartSize} Items</span>
                    </div>
                    <IoMdClose size={28} className="cursor-pointer text-gray-700 hover:text-red-500" onClick={close} />
                </div>

                <div className="flex-1 overflow-y-auto p-4 scrollbar">
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <>
                                <div key={item._id} className="flex items-center gap-4 py-3">
                                    <img src={item.productId.image[0].url} alt={item.productId.name} className="w-14 h-14 object-cover rounded" />
                                    <div className="flex-1">
                                        <p className="font-medium">{item.productId.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {currency(discountprice(item.productId.price, item.productId.discount))} x {item.quantity}
                                        </p>
                                    </div>
                                    <p className="font-semibold text-gray-700">
                                        {currency(discountprice(item.productId.price, item.productId.discount) * item.quantity)}
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation()
                                            deletecartitem(item._id)
                                        }}
                                        className="text-gray-700 text-sm ">
                                        <MdDelete size={20} color='red' />
                                    </button>

                                </div>
                                <Divider></Divider>
                            </>

                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
                    )}
                </div>

                <div className="p-4 border-t bg-gray-100">
                    <div className="flex justify-between text-gray-700 text-lg">
                        <span>Items</span>
                        <span>{cartSize}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 text-lg">
                        <span>Original Price:</span>
                        <span className="line-through">{currency(originalTotal)}</span>
                    </div>
                    <div className="flex justify-between text-green-600 text-lg font-semibold">
                        <span>Discounted Price:</span>
                        <span>{currency(discountTotal)}</span>
                    </div>

                    <div className="flex justify-between text-gray-700 text-lg">
                        <span>Delivery charges:</span>
                        <span>Free</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={clearCart}
                            className={`flex-1 py-2 rounded transition ${cartItems.length > 0
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            disabled={cartItems.length === 0}
                        >
                            Clear Cart
                        </button>
                        <button onClick={handlecheckout} className={`flex-1 py-2 rounded transition ${cartItems.length > 0
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            disabled={cartItems.length === 0}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
