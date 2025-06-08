import Addaddress from "../components/addaddress.jsx"

export const baseUrl = "http://localhost:8080"
const summaryapi = {
    register: {
        url: '/api/user/register',
        method: "POST"
    },
    login: {
        url: '/api/user/login',
        method: "POST"
    },
    forgotpassword: {
        url: '/api/user/forget-password',
        method: "PUT"
    },
    verifyotp:{
        url: '/api/user/verify-forget-password-otp',
        method: "PUT"
    },
    resetpassword:{
        url: '/api/user/reset-password',
        method: "PUT"
    },
    refreshtoken:{
        url:'/api/user/refresh-token',
        method:"POST"

    },
    userDetails:{
        url:'/api/user/user-details',
        method:"GET"
    },
    logout:{
        url:'/api/user/logout',
        method:"GET"
    },
    uploadavatar:{
        url:'/api/user/upload-avatar',
        method:"PUT"
    },
    addcategory:{
        url:'/api/category/add-category',
        method:"POST"
    },
    uploadimage:{
        url:'/api/file/upload',
        method:"POST"
    },
    getcategory:{
        url:'/api/category/get',
        method:"get"
    },
    updatecategory:{
        url:'/api/category/update',
        method:"put"
    },
    deletecategory:{
        url:'/api/category/delete',
        method:"delete"
    },
    addproduct:{
        url:'/api/product/create',
        method:"post"
    },
    getproduct:{
        url:'/api/product/get',
        method:"get"
    },
    getproductbycategory:{
        url:'/api/product/get-product-by-category',
        method:"post"
    },
     getproductbyid:{
        url:'/api/product/get-product-details',
        method:"post"
    },
    updateproduct:{
        url:'/api/product/update',
        method:"put"
    },
    deleteproduct:{
        url:'/api/product/delete',
        method:"delete"
    },
    searchproduct:{
       url:'/api/product/search',
        method:"post"
    },
    addtocart:{
        url:'/api/cart/create',
        method:"post"
    },
    getcartitems:{
        url:'/api/cart/get',
        method:"get"
    },
    updatecartitem:{
        url:'/api/cart/update',
        method:"put"
    },
    deletecartitem:{
        url:'/api/cart/delete',
        method:"delete"
    },
    clearcartitem:{
        url:'/api/cart/clear',
        method:"delete"
    },
    addaddress:{
          url:'/api/address/add',
          method:"post"
    },
    getaddress:{
        url:'/api/address/get',
        method:"get"
    },
    deleteaddress:{
        url:'/api/address/delete',
        method:"delete"
    },
    cashondelivery:{
        url:'/api/order/cash',
        method:"post"
    }, 
    payonline:{
        url:'/api/order/pay',
        method:"post"
    }

}


export default summaryapi