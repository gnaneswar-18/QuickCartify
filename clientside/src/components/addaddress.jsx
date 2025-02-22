import React, { useState } from 'react';
import AxiosToastError from '../utils/AxiosToastError';
import summaryapi from '../common/summaryapi';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';

const Addaddress = ({ close }) => {
    const [newAddress, setNewAddress] = useState({
        address_line: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        mobile: '',
    });

    const handleChange = (e) => {
        setNewAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...summaryapi.addaddress,
                data: newAddress
            });
                if (response.data.success) {
                toast.success('Address added successfully');
                setNewAddress({ address_line: '', city: '', state: '', pincode: '', country: '', mobile: '' });
                close()
            } 
            
        } catch (error) {
            console.log(error);
            AxiosToastError(error)
        }       
      
    };

    return (
        <section>
            <form onSubmit={handleSubmit} className="mt-2">
                {['address_line', 'city', 'state', 'pincode', 'country', 'mobile'].map((field, index) => (
                    <input
                        key={index}
                        type="text"
                        name={field}
                        placeholder={field.replace('_', ' ').toUpperCase()}
                        className="w-full p-2 border rounded-lg mb-2"
                        value={newAddress[field]}
                        onChange={handleChange}
                        required
                    />
                ))}
                <button type="submit" className="mt-2 bg-green-500 text-white px-3 py-1 rounded-lg">
                    Save Address
                </button>
            </form>
        </section>
    );
};

export default Addaddress;
