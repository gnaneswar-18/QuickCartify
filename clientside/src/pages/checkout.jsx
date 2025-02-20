import React, { useState } from 'react';

const Checkout = () => {
  const [addresses, setAddresses] = useState(['123 Main St, City, State, ZIP', '456 Elm St, City, State, ZIP']);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [newAddress, setNewAddress] = useState('');
  const [addingNew, setAddingNew] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <section className='bg-gray-100 min-h-screen flex justify-center items-center p-6'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
        <h1 className='text-2xl font-semibold mb-4 text-center'>Checkout</h1>
        <form className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Full Name</label>
            <input type='text' className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none' placeholder='John Doe'/>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <input type='email' className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none' placeholder='example@mail.com'/>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Address</label>
            <select className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none' value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
              {addresses.map((address, index) => (
                <option key={index} value={address}>{address}</option>
              ))}
            </select>
            <button type='button' className='text-blue-500 text-sm mt-2' onClick={() => setAddingNew(!addingNew)}>
              {addingNew ? 'Cancel' : 'Add New Address'}
            </button>
            {addingNew && (
              <div className='mt-2'>
                <textarea className='w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none' 
                  placeholder='New Address'
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                ></textarea>
                <button type='button' className='mt-2 bg-green-500 text-white px-3 py-1 rounded-lg' onClick={() => {
                  setAddresses([...addresses, newAddress]);
                  setSelectedAddress(newAddress);
                  setNewAddress('');
                  setAddingNew(false);
                }}>
                  Save Address
                </button>
              </div>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Payment Method</label>
            <div className='flex gap-4 mt-2'>
              <label className='flex items-center gap-2'>
                <input 
                  type='radio' 
                  name='payment' 
                  value='card' 
                  checked={paymentMethod === 'card'} 
                  onChange={() => setPaymentMethod('card')} 
                />
                Card Payment
              </label>
              <label className='flex items-center gap-2'>
                <input 
                  type='radio' 
                  name='payment' 
                  value='cod' 
                  checked={paymentMethod === 'cod'} 
                  onChange={() => setPaymentMethod('cod')} 
                />
                Cash on Delivery
              </label>
            </div>
          </div>
          {paymentMethod === 'card' && (
            <div>
              <label className='block text-sm font-medium text-gray-700'>Card Details</label>
              <input type='text' className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none' placeholder='**** **** **** ****'/>
            </div>
          )}
          <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all'>Place Order</button>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
