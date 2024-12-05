'use client'

import { useFieldArray, useFormContext } from 'react-hook-form'

const ThirdStep = () => {
  return (
    <div className='flex flex-col gap-4 text-sm font-normal text-[#1b1b1b]'>
        <div className='text-[#1B1B1B] text-xl font-extrabold'>Thông tin đăng ký</div>
        <FixedForm />
        <DynamicForm />
    </div>
  )
}

const FixedForm = () => {
    const { register, control, formState: { errors } } = useFormContext()
    const { fields } = useFieldArray({
      name: 'fixed_questions',
      control,
    })
    return (
      <div className='flex flex-col gap-4'>
        {fields.map((fixed, fixedIndex) => {
          return (
            <div
              className='px-6 py-2 border-2 border-[#219ce4] rounded-lg flex flex-col gap-4'
              key={fixed.id}
            >
                <div className='flex justify-between items-center'>
                    {fixed.question === "name" && (
                        <div className='text-base font-bold'>Họ và tên</div>
                    )}
                    {fixed.question === "mail" && (
                        <div className='text-base font-bold'>Email</div>
                    )}
                    {fixed.question === "phone" && (
                        <div className='text-base font-bold'>Điện thoại</div>
                    )}
                    {fixed.question === "address" && (
                        <div className='text-base font-bold'>Địa chỉ</div>
                    )}
                    <div className='flex gap-8'>
                        <label className="cursor-pointer gap-4 flex items-center">
                            <input
                                className='w-3 h-3'
                                type="radio"
                                id="false"
                                name="optional"
                                value={false}
                                {...register(`fixed_questions.${fixedIndex}.optional`)}
                                />
                            Yêu cầu
                        </label>
                        <label className="cursor-pointer gap-4 flex items-center">
                            <input
                                className='w-3 h-3'
                                type="radio"
                                id="true"
                                name="optional"
                                value={true}
                                {...register(`fixed_questions.${fixedIndex}.optional`)}
                            />
                            Không yêu cầu
                        </label>
                    </div>
                </div>
            </div>
          )
        })}
      </div>
    )
}

const DynamicForm = () => {
  const { register, control, watch, formState: { errors } } = useFormContext()
  const { append, remove, fields } = useFieldArray({
    name: 'dynamic_questions',
    control,
  })
  const handleAddDynamic = () => {
    append({ type: "text", answer: ['Nhập lựa chọn', 'Nhập lựa chọn'] })
  }
  const watchedTypes = watch('dynamic_questions')
  return (
    <div className='flex flex-col gap-4'>
      {fields.map((dynamic, dynamicIndex) => {
        const currentType = watchedTypes[dynamicIndex]?.type || "text";
        return (
          <div
            className='px-6 py-2 border-2 border-[#219ce4] rounded-lg flex flex-col gap-4'
            key={dynamic.id}
          >
            <div className='flex items-center justify-between'>
                <div className='text-base font-bold'>Thông tin câu hỏi #{dynamicIndex + 1}</div>
              <div
                onClick={() => {
                    remove(dynamicIndex)
                }}
                className='text-center rounded-lg font-bold text-[#FAFAFA] bg-[#ff4d4f] py-1 px-3 cursor-pointer hover:bg-red-600'
              >
                X
              </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex-1'>
                    <div className="mb-2 font-semibold">Câu hỏi</div>
                    <input
                        type='text'
                        className='w-full p-2 border border-[#219ce4] rounded-lg text-[#1b1b1b]'
                        {...register(`dynamic_questions.${dynamicIndex}.question`, {required: 'Câu hỏi là bắt buộc'})}
                    />
                    <p className="text-red-500 text-sm">{errors?.dynamic_questions?.[dynamicIndex]?.question?.message}</p>
                </div>
                <div className='flex gap-4'>
                    <div className='flex flex-col flex-1'>
                        <div className="flex mb-2 font-semibold">Dạng</div>
                        <div className='flex flex-col gap-1'>
                            <label className="cursor-pointer gap-4 flex items-center">
                                <input
                                    className='w-3 h-3'
                                    type="radio"
                                    id="text"
                                    name="typeOption"
                                    value="text"
                                    {...register(`dynamic_questions.${dynamicIndex}.type`)}
                                    />
                                Văn bản
                            </label>
                            <label className="cursor-pointer gap-4 flex items-center">
                                <input
                                    className='w-3 h-3'
                                    type="radio"
                                    id="radio"
                                    name="typeOption"
                                    value="radio"
                                    {...register(`dynamic_questions.${dynamicIndex}.type`)}
                                />
                                Chọn 1 câu trả lời
                            </label>
                            <label className="cursor-pointer gap-4 flex items-center">
                                <input
                                    className='w-3 h-3'
                                    type="radio"
                                    id="select"
                                    name="typeOption"
                                    value="select"
                                    {...register(`dynamic_questions.${dynamicIndex}.type`)}
                                />
                                Chọn nhiều câu trả lời
                            </label>
                        </div>
                    </div>
                    {(currentType !== 'text') && (
                      <DynamicAnswer dynamicIndex={dynamicIndex} />
                    )}
                </div>
            </div>
          </div>
        )
      })}
      <div 
        className="flex gap-2 items-center cursor-pointer justify-center text-base font-semibold text-[#B2BCC2] hover:text-gray-800"
        onClick={handleAddDynamic}
      >
        <img src="/assets/icons/plus.svg" alt="plus" />
        <span>Thêm câu hỏi</span>
      </div>
    </div>
  )
}

const DynamicAnswer = ({ dynamicIndex }) => {
  const { register, control, formState: { errors } } = useFormContext()
  const { append, remove, fields } = useFieldArray({
    name: `dynamic_questions.${dynamicIndex}.answer`,
    control,
  })
  const handleAddAnswer = () => {
    append('Nhập lựa chọn')
  }
  return (
    <div className='flex flex-[2] flex-col gap-4'>
      {fields.map((answer, answerIndex) => {  
        return (
          <div key={answer.id}>
            <div className='flex gap-4'>
                <div className='flex items-center'>
                    <div
                        onClick={() => {
                            remove(answerIndex)
                        }}
                        className='flex justify-center items-center cursor-pointer'
                    >
                        <img className='' src="/assets/icons/minus.svg" alt="minus" />
                    </div>
                </div>
                <div className='flex-1'>
                    <input
                      className='w-full p-2 rounded-lg border border-[#219ce4]'
                      {...register(`dynamic_questions.${dynamicIndex}.answer.${answerIndex}`, {
                          required: 'Lựa chọn là bắt buộc'
                      })}
                    />
                    <p className="text-red-500 text-sm">{errors?.dynamic_questions?.[dynamicIndex]?.answer?.[answerIndex]?.message}</p>
                </div>
            </div>
          </div>
        )
      })}
    <div className='text-[#219ce4] flex items-center justify-center'>
        <div
            className='w-full underline underline-offset-4 text-center cursor-pointer hover:text-sky-300'
            onClick={handleAddAnswer}
        >
            Thêm lựa chọn
        </div>
    </div>
    </div>
  )
}

export default ThirdStep