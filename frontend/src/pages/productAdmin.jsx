import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
// import { FaArrowLeft } from "react-icons/fa";
// import { FaArrowRight } from "react-icons/fa";
import Loading from '../components/loading.jsx';
import { useSelector } from 'react-redux';
import Productcardadmin from '../components/productcardadmin.jsx';

const ProductAdmin = () => {
    const [productdata, setProductData] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredProductData, setFilteredProductData] = useState([]);
    const allproducts =useSelector(state=>state.product.allproduct);
    useEffect(() => {
        setProductData(allproducts);
    }, [allproducts]);


    const handleFilter = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearch(e.target.value);
        setFilteredProductData(
            productdata.filter(item => item.name.toLowerCase().includes(searchValue))
        );
    };

    const displayedProducts = search ? filteredProductData : productdata;

    return (
        <section className=" overflow-y-auto " style={{ maxHeight: "80vh" }}>
            <div className="z-100 p-3 bg-white shadow flex justify-between items-center sticky top-0   ">
                <h2 className="text-lg font-semibold">PRODUCTS</h2>
                <div className="flex items-center gap-4  border-2 border-gray-300 rounded focus-within:border-primary-light p-2 ">
                <IoSearch size={20} />
                <input
                    type="text"
                    placeholder="Search product here..."
                    value={search}
                    className='outline-none'
                    onChange={handleFilter}
                />
            </div>
            </div>
            
            <div>
                { displayedProducts.length === 0 ? (
                    <p className="p-4 text-center text-gray-500">No products found.</p>
                ) : (
                <div className="flex flex-wrap overflow-y-hidden gap-6 m-5 ">
                    {displayedProducts.map((product,index) => (
                     <Productcardadmin product={product}></Productcardadmin>
                    ))}
                  </div>
                )}
            </div>

           
        </section>
    );
};

export default ProductAdmin;
