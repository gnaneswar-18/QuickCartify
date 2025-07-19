import toast from 'react-hot-toast'
const AxiosToastError = (err)=>{
  toast.error(err?.response?.data?.message|| "Something went wrong")
}
export default AxiosToastError