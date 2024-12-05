import React, { useEffect, useState } from "react"
import { fetchDistricts, fetchProvinces, fetchWards } from "../../../controllers/provinceController";
import { useFormContext } from "react-hook-form";

const FirstStep = ({ selectedLocation, setSelectedLocation, handleEventPreviewChange, bannerPreview, logoPreview }) => {
  const { register, setValue, formState: { errors } } = useFormContext()
  const [locations, setLocations] = useState({
    provinces: [],
    districts: [],
    wards: [],
  })
  // Lấy danh sách tỉnh/thành
  useEffect(() => {
    const fetchProvincesData = async () => {
      const provincesData = await fetchProvinces()
      setLocations((prev) => ({
        ...prev,
        provinces: provincesData,
      }))
    }
    fetchProvincesData()
  }, [])

  // Lấy danh sách quận/huyện khi chọn tỉnh/thành
  useEffect(() => {
    if (selectedLocation.province) {
      const fetchDistrictsData = async () => {
        const districtsData = await fetchDistricts(selectedLocation.province)
        setLocations((prev) => ({
          ...prev,
          districts: districtsData,
        }))
      }
      fetchDistrictsData()
    }
  }, [selectedLocation.province])

  // Lấy danh sách phường/xã khi chọn quận/huyện
  useEffect(() => {
    if (selectedLocation.district) {
      const fetchWardsData = async () => {
        const wardsData = await fetchWards(selectedLocation.district)
        setLocations((prev) => ({
          ...prev,
          wards: wardsData,
        }))
      }
      fetchWardsData()
    }
  }, [selectedLocation.district])

  return (
    <div className='flex flex-col gap-4 text-sm font-normal text-[#1b1b1b]'>
      <div className='text-[#1B1B1B] text-xl font-extrabold'>Thông tin sự kiện</div>
      {/* Banner Upload */}
      <div>
        <div className="flex gap-2 mb-2 font-semibold">
          <span className="text-red-500">*</span>
          <span>Banner sự kiện</span>
        </div>
        <div className="relative flex flex-col items-center justify-center border border-[#219ce4] rounded-lg w-full h-56 p-2">
          {bannerPreview?.url ? (
            <img
              src={bannerPreview.url}
              alt="Banner Preview"
              className="object-contain w-full h-full"
            />
          ) : (
            <label className="flex flex-col gap-1 items-center cursor-pointer">
              <img src="/assets/icons/plus.svg" alt="plus" />
              <span className="text-base font-semibold text-[#B2BCC2]">Thêm ảnh nền sự kiện</span>
            </label>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleEventPreviewChange(e, "banner")}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
      
      {/* Title */}
      <div>
        <div className="flex gap-2 mb-2 font-semibold">
          <span className="text-red-500">*</span>
          <span>Tên sự kiện</span>
        </div>
        <input
          type='text'
          className='w-full p-2 border border-[#219ce4] rounded-lg'
          {...register("title", {required: 'Tên sự kiện là bắt buộc'})}
        />
        <p className="text-red-500 text-sm">{errors?.title?.message}</p>
      </div>

      {/* Location */}
      <div>
        <div className="flex gap-2 mb-2 font-semibold">
          <span className="text-red-500">*</span>
          <span>Tên địa điểm</span>
        </div>
        <input
          type='text'
          className='w-full p-2 border border-[#219ce4] rounded-lg'
          {...register("location.name", {required: 'Tên địa điểm là bắt buộc'})}
        />
        <p className="text-red-500 text-sm">{errors?.location?.name?.message}</p>
      </div>
      <div className="flex gap-6">
        <div className='flex-1'>
          <div className="flex gap-2 mb-2 font-semibold">
            <span className="text-red-500">*</span>
            <span>Tỉnh/thành</span>
          </div>
          <select
            className='w-full p-2 border border-[#219ce4] rounded-lg'
            disabled={locations.provinces.length === 0}
            {...register('location.province', {
              required: 'Tỉnh/Thành là bắt buộc',
              onChange: (e) => {
                const selectedProvince = locations.provinces.find(
                  (province) => province.name === e.target.value
                )
                setValue('location.district', '')
                setValue('location.ward', '')
                setLocations(prev => ({ ...prev, wards: [] }))
                setSelectedLocation(prev => ({ ...prev, province: selectedProvince.code }))
              },
            })}
          >
            <option value="" disabled></option>
            {locations.provinces.map((province) => (
              <option key={province.code} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors?.location?.province?.message}</p>
        </div>
        <div className='flex-1'>
          <div className="flex gap-2 mb-2 font-semibold">
            <span className="text-red-500">*</span>
            <span>Quận/huyện</span>
          </div>
          <select
            className='w-full p-2 border border-[#219ce4] rounded-lg'
            disabled={locations.districts.length === 0}
            {...register('location.district', {
              required: 'Quận/Huyện là bắt buộc',
              onChange: (e) => {
                const selectedDistrict = locations.districts.find(
                  (district) => district.name === e.target.value
                )
                setValue('location.ward', '')
                setSelectedLocation(prev => ({ ...prev, district: selectedDistrict.code }))
              },
            })}
          >
            <option value="" disabled></option>
            {locations.districts.map((district) => (
              <option key={district.code} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors?.location?.district?.message}</p>
        </div>
      </div>
      <div className="flex gap-6">
        <div className='flex-1'>
          <div className="flex gap-2 mb-2 font-semibold">
            <span className="text-red-500">*</span>
            <span>Phường/xã</span>
          </div>
          <select
            className='w-full p-2 border border-[#219ce4] rounded-lg'
            disabled={locations.wards.length === 0}
            {...register('location.ward', {
              required: 'Phường/Xã là bắt buộc',
              onChange: (e) => {
                const selectedWard = locations.wards.find(
                (ward) => ward.name === e.target.value
                )
                setSelectedLocation(prev => ({ ...prev, ward: selectedWard.code }))
              },
            })}
          >
            <option value="" disabled></option>
            {locations.wards.map((ward) => (
              <option key={ward.code} value={ward.name}>
                {ward.name}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors?.location?.ward?.message}</p>
        </div>
        <div className='flex-1'>
          <div className='font-semibold mb-2'>Địa chỉ</div>
          <input
            className='w-full p-2 border border-[#219ce4] rounded-lg'
            {...register('location.address', {required: 'Địa chỉ là bắt buộc'})}
            type="text"
          />
          <p className="text-red-500 text-sm">{errors?.location?.address?.message}</p>
        </div>
      </div>

      {/* Category */}
      <div>
        <div className="flex gap-2 mb-2 font-semibold">
          <span className="text-red-500">*</span>
          <span>Thể loại sự kiện</span>
        </div>
        <select
          className='w-full p-2 border border-[#219ce4] rounded-lg'
          {...register('category', {
            required: 'Thể loại là bắt buộc',
          })}
        >
          <option value="Âm nhạc">Âm nhạc</option>
          <option value="Thể thao">Thể thao</option>
          <option value="Seminar">Seminar</option>
          <option value="Khác">Khác</option>
        </select>
        <p className="text-red-500 text-sm">{errors?.category?.message}</p>
      </div>

      {/* Description */}
      <div>
        <div className="flex gap-2 mb-2 font-semibold">
          <span className="text-red-500">*</span>
          <span>Thông tin sự kiện</span>
        </div>
        <textarea
          className='w-full p-2 border border-[#219ce4] rounded-lg min-h-40'
          {...register("description", {required: 'Thông tin sự kiện là bắt buộc'})}
        />
        <p className="text-red-500 text-sm">{errors?.description?.message}</p>
      </div>

      <div className='text-[#1B1B1B] text-xl font-extrabold'>Ban tổ chức</div>
      {/* Organizer */}
      <div className="flex gap-4">
        <div className="flex-[1]">
          <div className="flex gap-2 mb-2 font-semibold">
            <span className="text-red-500">*</span>
            <span>Logo</span>
          </div>
          <div className="relative flex flex-col items-center justify-center border border-[#219ce4] rounded-lg w-full h-64 p-2">
            {logoPreview?.url ? (
              <img
                src={logoPreview?.url}
                alt="Logo Preview"
                className="object-contain w-full h-full"
              />
            ) : (
              <label className="flex flex-col gap-1 items-center cursor-pointer">
                <img src="/assets/icons/plus.svg" alt="plus" />
                <span className="text-base font-semibold text-[#B2BCC2]">Thêm logo ban tổ chức</span>
              </label>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleEventPreviewChange(e, "logo")}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 flex-[2]">
          <div>
            <div className="flex gap-2 mb-2 font-semibold">
              <span className="text-red-500">*</span>
              <span>Tên ban tổ chức</span>
            </div>
            <input
              type="text"
              className='w-full p-2 border border-[#219ce4] rounded-lg'
              {...register("organizer.name", {required: 'Tên ban tổ chức là bắt buộc'})}
            />
            <p className="text-red-500 text-sm">{errors?.organizer?.name?.message}</p>
          </div>
          <div className="flex flex-col flex-grow">
            <div className="flex gap-2 mb-2 font-semibold">
              <span className="text-red-500">*</span>
              <span>Thông tin ban tổ chức</span>
            </div>
            <textarea
              className='w-full p-2 border border-[#219ce4] rounded-lg flex-grow'
              {...register("organizer.info", {required: 'Thông tin ban tổ chức là bắt buộc'})}
            />
            <p className="text-red-500 text-sm">{errors?.organizer?.info?.message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FirstStep