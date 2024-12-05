import React from "react"
import { useFormContext } from "react-hook-form"
import PayPalButon from "../../payment"
import { addOrder } from "../../../controllers/orderController"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const FourthStep = () => {
  const { getValues, handleSubmit } = useFormContext()
  const navigate = useNavigate()
  const method = getValues('payment_method')
  const total = getValues('total_price')
  const handleBooking = async (dataForm) => {
    try {
        const convertedData = {
        ...dataForm,
        event_id: parseInt(dataForm.event_id),
        show_id: parseInt(dataForm.show_id),
        }
        await addOrder(convertedData)
        navigate('/')
        toast.success('Mua vé thành công!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    } catch (error) {
        console.log(error)
        toast.error('Lỗi', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    }
  }
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <div className="text-[#1B1B1B] text-xl font-extrabold">Hoàn tất</div>
        <div className="text-[#AEAEAE] text-base font-normal">
          Vui lòng hoàn tất thanh toán!
        </div>
      </div>
      {method == 'paypal' ? (
        <PayPalButon total={total} onSuccess={handleSubmit(handleBooking)}/>
      ) : (
        <></>
      )}
    </div>
  )
}

export default FourthStep