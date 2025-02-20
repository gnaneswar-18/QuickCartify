import summaryapi from '../common/summaryapi.js'
import Axios from './Axios.jsx'
const Uploadimage=async(image)=>{
    try {
        const formdata=new FormData();
        formdata.append('image',image)
        const response = await Axios({
            ...summaryapi.uploadimage,
            data: formdata
        })
        return response.data
    } catch (err) {
        return err;
    }
}
export default Uploadimage;