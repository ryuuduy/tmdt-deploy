import React from "react"
import { useFormContext } from "react-hook-form"

const ThirdStep = () => {
  const { register, watch, formState: { errors } } = useFormContext()
  const discount = watch('discount') || ''
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <div className="text-[#1B1B1B] text-xl font-extrabold">Thanh toán</div>
        <div className="text-[#AEAEAE] text-base font-normal">
          Lưu ý kiểm tra thông tin nhận vé. Nếu có thay đổi, vui lòng cập nhật lại thông tin!
        </div>
      </div>
      <div className='flex flex-col gap-4 text-[#1B1B1B] text-sm'>
        <div>
          <div className='font-semibold mb-2'>Mã giảm giá</div>
          <div className="flex gap-6">
            <div className='flex-[3]'>
            <input
              className='w-full p-2 border border-[#1B1B1B] rounded-lg'
              {...register(`discount`)}
            />
            </div>
            <div className='flex-[1]'>
              <div
                className={`w-full p-2 text-[#FAFAFA] rounded-lg text-center font-medium ${
                  discount.trim() ? 'bg-[#219ce4] cursor-pointer hover:bg-sky-400' : 'bg-[#b2bcc2] cursor-not-allowed'
                }`}>
                Áp dụng
              </div>
            </div>
          </div>
        </div>
        <div className='font-semibold'>Hình thức thanh toán:</div>
        <div className="flex flex-col items-start gap-4 pl-5">
          <label className="cursor-pointer flex gap-4 items-center">
            <input
              className='w-3 h-3'
              type="radio"
              id="momo"
              name="paymentOption"
              value="momo"
              {...register(`payment_method`, { required: 'Vui lòng chọn hình thức thanh toán' })}
            />
            <span>MoMo</span>
            <img
              src="/assets/icons/momo.svg"
              alt="MoMo"
              className="h-6"
            />
          </label>
          <label className="cursor-pointer flex gap-4 items-center">
            <input
              className='w-3 h-3'
              type="radio"
              id="zalo"
              name="paymentOption"
              value="zalo"
              {...register(`payment_method`, { required: 'Vui lòng chọn hình thức thanh toán' })}
            />
            <span>ZaloPay</span>
            <img
              src="/assets/icons/zalo-pay.svg"
              alt="ZaloPay"
              className="h-6"
            />
          </label>
          <label className="cursor-pointer flex gap-4 items-center">
            <input
              className='w-3 h-3'
              type="radio"
              id="paypal"
              name="paymentOption"
              value="paypal"
              {...register(`payment_method`, { required: 'Vui lòng chọn hình thức thanh toán' })}
            />
            <span>PayPal</span>
            <img
              src="/assets/icons/paypal.svg"
              alt="PayPal"
              className="h-6"
            />
          </label>
        </div>
        <p className="text-red-500 text-sm">{errors?.payment_method?.message}</p>
      </div>
    </div>
  )
}

export default ThirdStep