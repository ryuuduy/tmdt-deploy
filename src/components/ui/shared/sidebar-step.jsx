import React from 'react'

const SidebarStep = ({ currentStep, steps }) => {
  return (
    <div className="w-[20%] p-4 max-w-72 bg-[#FAFAFA] space-y-4">
      {steps?.map((step, index) => (
        <div
          key={index}
          className={`flex justify-start items-center p-2 rounded-xl gap-4 cursor-pointer text-sm font-semibold ${
            index === currentStep ? 'bg-[#1B1B1B] text-[#FAFAFA]' : index < currentStep ? 'text-[#1B1B1B]' : 'text-[#B2BCC2]'
          }`}
        >
          {index < currentStep ? (
            <img src="/assets/icons/check.svg" alt="check" />
            ) : (
              <span 
                className={`flex justify-center items-center w-8 h-8 rounded-lg font-extrabold ${
                  index === currentStep && 'bg-[#219CE4]'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            )
          }
          {step}
        </div>
      ))}
    </div>
  )
}

export default SidebarStep
