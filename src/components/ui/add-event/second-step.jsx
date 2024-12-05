'use client'

import { useFieldArray, useFormContext } from 'react-hook-form'
import Button from '../shared/button'

const SecondStep = ({ shows, setShows, showsPreview, setShowsPreview, handleShowsPreviewChange }) => {
  return (
    <div className='flex flex-col gap-4 text-sm font-normal text-[#1b1b1b]'>
        <div className='text-[#1B1B1B] text-xl font-extrabold'>Thời gian & loại vé</div>
        <ManageShows
          shows={shows}
          setShows={setShows}
          showsPreview={showsPreview}
          setShowsPreview={setShowsPreview}
          handleShowsPreviewChange={handleShowsPreviewChange}
        />
    </div>
  )
}

const ManageShows = ({ shows, setShows, showsPreview, setShowsPreview, handleShowsPreviewChange }) => {
  const { register, control, formState: { errors } } = useFormContext()
  const { append, remove, fields } = useFieldArray({
    name: 'shows',
    control,
  })
  const handleRemoveAllShow = () => {
    setShows((prev) => ({ ...prev, show_counter: 0 }))
    remove()
    setShowsPreview([])
  }
  const handleAddShow = () => {
    append({ show_id: shows.show_current_id, ticket_types: [] })
    setShows((prev) => ({
      ...prev,
      show_counter: prev.show_counter + 1,
      show_current_id: prev.show_current_id + 1
    }))
    setShowsPreview((prev) => [...prev, null])
  }
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <div className="flex gap-2 mb-2 font-semibold">
          <span className="text-red-500">*</span>
          <span>Yêu cầu hủy vé</span>
        </div>
        <select
          className='w-full p-2 border border-[#219ce4] rounded-lg'
          {...register('cancel_request', {
            required: 'Chọn 1 hình thức',
          })}
        >
          <option value="0">Không cho phép hủy vé</option>
          <option value="2">Cho phép hủy trong vòng 2 giờ sau khi mua</option>
        </select>
      </div>
      <div className='flex items-center justify-between'>
          <div className='text-base font-bold'>Tổng buổi diễn: {shows.show_counter}</div>
          <div className='flex gap-6 items-center'>
              {fields.length > 0 && (
              <div className='flex gap-6 items-center'>
                <div
                    onClick={handleRemoveAllShow}
                    className='text-center text-[#ff4d4f] underline underline-offset-4 cursor-pointer hover:text-red-300'
                >
                    Xoá tất cả
                </div>
                <div className='text-base'>|</div>
              </div>
              )}
              <div
                onClick={handleAddShow}
                className='text-center text-[#219ce4] underline underline-offset-4 cursor-pointer hover:text-sky-300'
              >
                Thêm buổi diễn
              </div>
          </div>
      </div>
      {fields.map((show, showIndex) => {
        return (
          <div
            className='px-6 py-2 border-2 border-[#219ce4] rounded-lg flex flex-col gap-4'
            key={show.id}
          >
            <div className='flex items-center justify-between'>
              <div className='text-base font-bold'>Thông tin suất diễn #{showIndex + 1}</div>
              <div
                onClick={() => {
                    // Remove: show index
                    remove(showIndex)
                    setShows((prev) => ({
                      ...prev,
                      show_counter: prev.show_counter - 1,
                    }))
                    setShowsPreview((prev) => prev.filter((_, i) => i !== showIndex))
                }}
                className='text-center rounded-lg font-bold text-[#FAFAFA] bg-[#ff4d4f] py-1 px-3 cursor-pointer hover:bg-red-600'
              >
                X
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='flex flex-1 flex-col gap-4'>
                <div className='flex gap-4'>
                    <div className='flex-1'>
                        <div className="flex gap-2 mb-2 font-semibold">
                            <span className="text-red-500">*</span>
                            <span>Thời gian bắt đầu</span>
                        </div>
                        <input
                            type='time'
                            className='w-full p-2 border border-[#219ce4] rounded-lg text-[#1b1b1b]'
                            {...register(`shows.${showIndex}.start_time`, {required: 'Thời gian bắt đầu là bắt buộc'})}
                        />
                        <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.start_time?.message}</p>
                    </div>
                    <div className='flex-1'>
                        <div className="flex gap-2 mb-2 font-semibold">
                            <span className="text-red-500">*</span>
                            <span>Ngày bắt đầu</span>
                        </div>
                        <input
                            type='date'
                            className='w-full p-2 border border-[#219ce4] rounded-lg text-[#1b1b1b]'
                            {...register(`shows.${showIndex}.start_date`, {required: 'Ngày bắt đầu là bắt buộc'})}
                        />
                        <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.start_date?.message}</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <div className="flex gap-2 mb-2 font-semibold">
                        <span className="text-red-500">*</span>
                        <span>Thời gian kết thúc</span>
                    </div>
                    <input
                        type='time'
                        className='w-full p-2 border border-[#219ce4] rounded-lg text-[#1b1b1b]'
                        {...register(`shows.${showIndex}.end_time`, {required: 'Thời gian kết thúc là bắt buộc'})}
                    />
                    <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.end_time?.message}</p>
                  </div>
                  <div className='flex-1'>
                    <div className="flex gap-2 mb-2 font-semibold">
                        <span className="text-red-500">*</span>
                        <span>Ngày kết thúc</span>
                    </div>
                    <input
                        type='date'
                        className='w-full p-2 border border-[#219ce4] rounded-lg text-[#1b1b1b]'
                        {...register(`shows.${showIndex}.end_date`, {required: 'Ngày kết thúc là bắt buộc'})}
                    />
                    <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.end_date?.message}</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-1 flex-col flex-grow'>
                  <div className="flex gap-2 mb-2 font-semibold">
                      <span className="text-red-500">*</span>
                      <span>Thông tin thêm</span>
                  </div>
                  <textarea
                      className='w-full p-2 border border-[#219ce4] rounded-lg flex-grow'
                      {...register(`shows.${showIndex}.description`, {required: 'Thông tin thêm là bắt buộc'})}
                  />
                  <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.description?.message}</p>
              </div>
            </div>
            <div>
              <div className="flex gap-2 mb-2 font-semibold">
                <span className="text-red-500">*</span>
                <span>Sơ đồ chỗ ngồi</span>
              </div>
              <div className="relative flex flex-col items-center justify-center border border-[#219ce4] rounded-lg w-full h-56 p-2">
                {showsPreview[showIndex]?.url ? (
                  <img
                    src={showsPreview[showIndex].url}
                    alt="Show Preview"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <label className="flex flex-col gap-1 items-center cursor-pointer">
                    <img src="/assets/icons/plus.svg" alt="plus" />
                    <span className="text-base font-semibold text-[#B2BCC2]">Thêm ảnh sơ đồ chỗ ngồi</span>
                  </label>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleShowsPreviewChange(e, showIndex)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <ManageTickets showIndex={showIndex} shows={shows} setShows={setShows} />
          </div>
        )
      })}
    </div>
  )
}

const ManageTickets = ({ showIndex, shows, setShows }) => {
  const { register, control, setValue, formState: { errors } } = useFormContext()
  const { append, remove, fields } = useFieldArray({
    name: `shows.${showIndex}.ticket_types`,
    control,
  })
  const handleRemoveAllTicket = () => {
    remove()
  }
  const handleAddTicket = () => {
    append({ticket_id: shows.ticket_current_id})
    setShows((prev) => ({
      ...prev,
      ticket_current_id: prev.ticket_current_id + 1
    }))
  }
  return (
    <div className='flex flex-col gap-2'>
      {fields.map((ticket, ticketIndex) => {
        return (
          <div key={ticket.id} className='bg-[#1b1b1b] px-6 py-2 rounded-2xl text-[#219ce4]'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                    <div className='text-base font-bold'>Thông tin vé #{ticketIndex + 1}</div>
                    <div
                    onClick={() => {
                      remove(ticketIndex)
                    }}
                    className='text-[#ff4d4f] bg-[#1b1b1b] text-xs text-center underline underline-offset-2 cursor-pointer hover:text-red-300'
                    >
                      Xóa vé
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='flex-1'>
                        <div className="flex gap-2 mb-2 font-semibold">
                            <span className="text-red-500">*</span>
                            <span>Tên vé</span>
                        </div>
                        <input
                            type='text'
                            className='w-full p-2 rounded-lg text-[#1b1b1b]'
                            {...register(`shows.${showIndex}.ticket_types.${ticketIndex}.name`, {
                                required: 'Tên vé là bắt buộc'
                            })}
                        />
                        <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.ticket_types?.[ticketIndex]?.name?.message}</p>
                    </div>
                    <div className='flex-1'>
                        <div className="flex gap-2 mb-2 font-semibold">
                            <span className="text-red-500">*</span>
                            <span>Giá vé</span>
                        </div>
                        <input
                            type='number'
                            className='w-full p-2 rounded-lg text-[#1b1b1b]'
                            {...register(`shows.${showIndex}.ticket_types.${ticketIndex}.price`, {
                                required: 'Giá vé là bắt buộc'
                            })}
                        />
                        <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.ticket_types?.[ticketIndex]?.price?.message}</p>
                    </div>
                    <div className='flex-1'>
                        <div className="flex gap-2 mb-2 font-semibold">
                            <span className="text-red-500">*</span>
                            <span>Số lượng vé</span>
                        </div>
                        <input
                            type='number'
                            className='w-full p-2 rounded-lg text-[#1b1b1b]'
                            {...register(`shows.${showIndex}.ticket_types.${ticketIndex}.quantity`, {
                                required: 'Số lượng vé là bắt buộc',
                                onChange: (e) => {
                                  setValue(`shows.${showIndex}.ticket_types.${ticketIndex}.amount`, e.target.value)
                                }
                            })}
                        />
                        <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.ticket_types?.[ticketIndex]?.quantity?.message}</p>
                    </div>
                </div>
                <div>
                    <div className="flex gap-2 mb-2 font-semibold">
                        <span className="text-red-500">*</span>
                        <span>Mô tả vé</span>
                    </div>
                    <textarea
                        className='w-full p-2 rounded-lg min-h-20 text-[#1b1b1b]'
                        {...register(`shows.${showIndex}.ticket_types.${ticketIndex}.description`, {
                            required: 'Mô tả vé là bắt buộc'
                        })}
                    />
                    <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.ticket_types?.[ticketIndex]?.description?.message}</p>
                </div>
                <div className='text-red-600'>
                </div>
            </div>
          </div>
        )
      })}
        <div className='text-[#FAFAFA] flex w-full items-center justify-center gap-4'>
            <Button title={'Thêm loại vé'} bgColor={'#219ce4'} textColor={'#fafafa'} icon={'add-circle'} isActive onClick={handleAddTicket} style={'flex-1 w-full'}/>
            {fields.length > 0 && (
              <Button title={'Xóa tất cả vé'} bgColor={'#ff4d4f'} textColor={'#fafafa'} icon={'remove-circle'} isActive onClick={handleRemoveAllTicket} style={'flex-1 w-full'}/>
            )}
        </div>
    </div>
  )
}

export default SecondStep