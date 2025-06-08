import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { discountprice } from '../utils/discountprice';
import currency from '../utils/currency';
import Divider from '../components/divider';
import Addaddress from '../components/addaddress';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import summaryapi from '../common/summaryapi';
import { setcartitems } from '../store/cartslice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js'
const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.cartitems);
    const addresses = useSelector(state => state.address.addresslist);
    const [cartSize, setCartSize] = useState(0);
    const [discountTotal, setDiscountTotal] = useState(0);
    const [originalTotal, setOriginalTotal] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState(addresses[0] || {});
    const [addingNew, setAddingNew] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');

    useEffect(() => {
        const discountedPrice = cartItems.reduce((prev, curr) =>
            prev + (discountprice(curr.productId.price, curr.productId.discount) * curr.quantity), 0);
        setDiscountTotal(discountedPrice);

        const totalPrice = cartItems.reduce((prev, curr) =>
            prev + (curr.productId.price * curr.quantity), 0);
        setOriginalTotal(totalPrice);

        const size = cartItems.reduce((prev, curr) => prev + curr.quantity, 0);
        setCartSize(size);
    }, [cartItems]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!selectedAddress._id) {
                return toast.error("Please select an address before proceeding.");
            }
    
            if (paymentMethod === 'cod') {
                // Cash on Delivery API Call
                const res = await Axios({
                    ...summaryapi.cashondelivery,
                    data: {
                        list: cartItems,
                        quantity: cartSize,
                        subtotalamt: discountTotal,
                        totalamt: discountTotal,
                        addressid: selectedAddress._id
                    }
                });
    
                if (res.data.success) {
                    toast.success(res.data.message);
                    dispatch(setcartitems([]));
                    navigate('/');
                } else {
                    toast.error("Failed to place COD order.");
                }
    
            } else {
                
                const stripePublicKey = "pk_test_51R1meuJCKhh6YSV0CrFWJIB5GQ5dRUjvZx6I235vMxpJxYoqYFU9gwXq15DgWwVG6KH8tbQXMaSHQqC5rSLZPffr00DOIj5wDp";
                const stripe = await loadStripe(stripePublicKey);
    
                if (!stripe) {
                    return toast.error("Failed to load Stripe. Please try again.");
                }
    
                const res = await Axios({
                    ...summaryapi.payonline,
                    data: {
                        list: cartItems,
                        quantity: cartSize,
                        subtotalamt: discountTotal,
                        totalamt: discountTotal,
                        addressid: selectedAddress._id
                    }
                });
    
                if (res.data.success && res.data.id) {
                    toast.success("Redirecting to payment...");
                    const result = await stripe.redirectToCheckout({ sessionId: res.id });
    
                    if (result.error) {
                        console.error("Stripe Checkout Error:", result.error);
                        toast.error(result.error.message);
                    } else {
                        dispatch(setcartitems([]));
                    }
                } else {

                    toast.error("Payment initiation failed. Please try again.");
                }
            }
        } catch (error) {
            console.error("Payment Error:", error);
            AxiosToastError(error);
        }
    };
    

    return (
        <section className='max-h-screen grid grid-cols-2 p-6 gap-6'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h2 className='text-xl font-semibold mb-4'>Select Address</h2>
                <div className='border border-gray-300 rounded-lg p-3'>
                    {addresses.length === 0 ? (
                        <p className='text-gray-500'>No addresses found</p>
                    ) : (
                        addresses.map((address, index) => (
                            <label
                                key={index}
                                className='flex flex-col space-y-1 p-2 cursor-pointer hover:bg-gray-100 rounded-lg'
                            >
                                <div className='flex items-center space-x-2'>
                                    <input
                                        type='radio'
                                        name='address'
                                        className='w-5 h-5 accent-blue-500'
                                        checked={selectedAddress?.address_line === address.address_line}
                                        onChange={() => setSelectedAddress(address)}
                                    />
                                    <span className='text-gray-800 font-semibold'>{address.address_line}</span>
                                </div>
                                <div className='text-gray-600 text-sm pl-7'>
                                    <p>{address.city}, {address.state}, {address.zip_code}</p>
                                    <p>{address.country}</p>
                                    <p>{address.phone}</p>
                                </div>
                            </label>
                        ))
                    )}
                </div>
                <button type='button' className='text-blue-500 text-sm mt-2' onClick={() => setAddingNew(!addingNew)}>
                    {addingNew ? 'Cancel' : 'Add New Address'}
                </button>
                {addingNew && <Addaddress close={() => setAddingNew(false)} />}
            </div>

            <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
                <Divider />
                <div className="p-4">
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
                </div>
                <Divider />

                <h2 className='text-xl font-semibold mb-4'>Select Payment Method</h2>
                <div className='flex gap-4 mb-4'>
                    <button
                        className={`px-4 py-2 rounded-lg transition-all ${paymentMethod === 'card'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => setPaymentMethod('card')}
                    >
                        Card Payment
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg transition-all ${paymentMethod === 'cod'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => setPaymentMethod('cod')}
                    >
                        Cash on Delivery
                    </button>
                </div>


                <button onClick={handleSubmit} className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all mt-4'>
                    Place Order
                </button>
            </div>
        </section>
    );
};

export default Checkout;
