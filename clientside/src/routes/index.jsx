import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home.jsx'
import Searchpage from '../pages/searchpage.jsx'
import Login from '../pages/login.jsx'
import Register from '../pages/register.jsx'
import ForgotPassword from '../pages/forgotpassword.jsx'
import ResetPassword from '../pages/resetpassword.jsx'
import VerifyOtp from '../pages/verifyotp.jsx'
import Dashboard from '../layout/dashboard.jsx'
import Profile from '../pages/profile.jsx'
import Myorders from '../pages/myorders.jsx'
import Address from '../pages/address.jsx'
import Category from '../pages/category.jsx'
import Uploadproduct from '../pages/uploadproduct.jsx'
import Adminpermission from '../layout/adminpermission.jsx'
import ProductAdmin from '../pages/productAdmin.jsx'
import Productlist from '../pages/productlist.jsx'
import Productdisplay from '../pages/Productdisplay.jsx'
import Checkout from '../pages/checkout.jsx'
import CancelOrder from '../pages/cancel.jsx'
import SuccessPage from '../pages/success.jsx'
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[
            {   path:"",
                element:<Home />
            },
            {
                path:"search/",
                element:<Searchpage />
            },{
                path:"login",
                element:<Login />
            },
            {
                path:"register",
                element:<Register />
            },
            {
                path: "forgotpassword",
                element: <ForgotPassword/>
            },{
                path:"verifyotp",
                element:<VerifyOtp/>
            },{
                path: "resetpassword",
                element: <ResetPassword/>
            },{
                path: "dashboard",
                element:<Dashboard></Dashboard>,
                children:[
                    {
                        path:"profile",
                        element:<Profile />
                    },{
                        path:"myorders",
                        element:<Myorders></Myorders>
                    },{
                        path:"address",
                        element:<Address/>
                    },
                    {
                        path:"category",
                        element:<Adminpermission><Category /></Adminpermission>
                    },{
                        path:"upload-product",
                        element:<Adminpermission><Uploadproduct /></Adminpermission>
                    },{
                        path:"product",
                        element:<Adminpermission><ProductAdmin /></Adminpermission>
                    }

                ]
            },{
                path:"/productlist/:id",
                element:<Productlist></Productlist>
            },{
                path:"/product/:id",
                element:<Productdisplay ></Productdisplay>
            },{
                path:'/checkout',
                element:<Checkout/>
            },{
                path:'/cancel',
                element:< CancelOrder/>
            },{
                path:'/success',
                element:< SuccessPage/>
            }


        ]
    }
])
export default router