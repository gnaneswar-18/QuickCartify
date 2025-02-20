import Axios from '../utils/Axios.jsx'
import summaryapi from '../common/summaryapi.js'

const fecthUserDetails=async()=>{
    try {
        const response=await Axios({
            ...summaryapi.userDetails
        })
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default fecthUserDetails