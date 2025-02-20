import React, { useState } from 'react'
import Editproductadmin from './editproductadmin'
import Axios from '../utils/Axios'
import summaryapi from '../common/summaryapi'

const Productcardadmin = ({ product }) => {
    const [edit, setedit] = useState(false)
    const handledelete = async (id) => {
        try {
           const res=await Axios({
            ...summaryapi.deleteproduct,
            data:{id}
           })
            if(res.data.success) {
                toastr.success("Successfully deleted")
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div
            key={product._id}
            className=" w-56 min-h-66  rounded-lg shadow-md hover:shadow-lg border border-gray-200 p-4 flex flex-col justify-between"
        >

            <img
                src={product.image[0].url}
                className="w-auto h-[60%] rounded-md object-scale-down "
            />
            <div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-500 text-sm">Price: {product.price} Rs</p>

            </div>
            <div className="flex gap-2 mt-2 justify-between">
                <div className="font-medium px-3 py-1 bg-blue-200 text-blue-700 rounded cursor-pointer"
                    onClick={() => setedit(true)}                >
                    EDIT
                </div>
                <div className="text-sm px-3 py-1 bg-red-200 text-red-700 rounded " onClick={()=>handledelete(product._id)}>
                    DELETE
                </div>
            </div>
            {edit && <Editproductadmin product={product} close={() => setedit(false)}></Editproductadmin>}
        </div>
    )
}

export default Productcardadmin
