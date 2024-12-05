import { useFormContext } from "react-hook-form"

const Form = ({ setUser, locations, setLocations }) => {
    const { register, setValue, formState: { errors } } = useFormContext()
    return (
        <div className="flex flex-col gap-4 text-[#1B1B1B] text-sm text-start">
            <div>
                <div className='font-semibold mb-2'>Họ và tên</div>
                <input
                className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                {...register('name', { required: 'Họ và tên là bắt buộc' })}
                type="text"
                />
                <p className="text-red-500 text-sm">{errors?.name?.message}</p>
            </div>
            <div className="flex gap-6">
                <div className='flex-1'>
                    <div className='font-semibold mb-2'>Email</div>
                    <input
                        disabled
                        className='w-full p-2 border border-[#1B1B1B] rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed'
                        {...register('email', {required: 'Email là bắt buộc'})}
                        type="email"
                    />
                    <p className="text-red-500 text-sm">{errors?.email?.message}</p>
                </div>
                <div className='flex-1'>
                    <div className='font-semibold mb-2'>Điện thoại</div>
                    <input
                        className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                        {...register('phone', {required: 'Số điện thoại là bắt buộc'})}
                        type="text"
                    />
                    <p className="text-red-500 text-sm">{errors?.phone?.message}</p>
                </div>
            </div>
            <>
            <div className="flex gap-6">
              <div className='flex-1'>
                <div className='font-semibold mb-2'>Tỉnh/thành</div>
                <select
                  className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                  disabled={locations.provinces.length === 0}
                  {...register('province', {
                    required: 'Tỉnh/Thành là bắt buộc',
                    onChange: (e) => {
                      // const selectedProvince = locations.provinces.find(
                      //   (province) => province.name === e.target.value
                      // )
                      setValue('district', '')
                      setValue('ward', '')
                      setLocations(prev => ({ ...prev, wards: [] }))
                      setUser(prev => ({ ...prev, province: e.target.value }))
                    },
                  })}
                >
                  <option value="" disabled></option>
                  {locations.provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-sm">{errors?.province?.message}</p>
              </div>
              <div className='flex-1'>
                <div className='font-semibold mb-2'>Quận/huyện</div>
                <select
                  className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                  disabled={locations.districts.length === 0}
                  {...register('district', {
                    required: 'Quận/Huyện là bắt buộc',
                    onChange: (e) => {
                      // const selectedDistrict = locations.districts.find(
                      //   (district) => district.name === e.target.value
                      // )
                      setValue('ward', '')
                      setUser(prev => ({ ...prev, district: e.target.value }))
                    },
                  })}
                >
                  <option value="" disabled></option>
                  {locations.districts.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-sm">{errors?.district?.message}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className='flex-1'>
                <div className='font-semibold mb-2'>Phường/xã</div>
                <select
                  className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                  disabled={locations.wards.length === 0}
                  {...register('ward', {
                    required: 'Phường/Xã là bắt buộc',
                    onChange: (e) => {
                      // const selectedWard = locations.wards.find(
                      // (ward) => ward.name === e.target.value
                      // )
                      setUser(prev => ({ ...prev, ward: e.target.value }))
                    },
                  })}
                >
                  <option value="" disabled></option>
                  {locations.wards.map((ward) => (
                    <option key={ward.code} value={ward.code}>
                      {ward.name}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-sm">{errors?.ward?.message}</p>
              </div>
              <div className='flex-1'>
                <div className='font-semibold mb-2'>Địa chỉ</div>
                <input
                  className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                  {...register('address', {required: 'Địa chỉ là bắt buộc'})}
                  type="text"
                />
                <p className="text-red-500 text-sm">{errors?.address?.message}</p>
              </div>
            </div>
            </>
        </div>
    )
}

export default Form