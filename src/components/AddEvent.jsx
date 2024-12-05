import { useState, useEffect } from "react"
import SidebarStep from "./ui/shared/sidebar-step"
import Footer from "./ui/shared/footer"
import FirstStep from "./ui/add-event/first-step"
import { FormProvider, useForm } from "react-hook-form"
import SecondStep from "./ui/add-event/second-step"
import ThirdStep from "./ui/add-event/third-step"
import { addEvent, addImage } from "../controllers/eventController"
import FourthStep from "./ui/add-event/fourth-step"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { fetchUser } from "../controllers/userController"
import { toast } from "react-toastify"

const url_storage = "https://hjuljskjtwahvjvbtllb.supabase.co/storage/v1/object/public/test/"

export default function AddEvent() {
    const [currentStep, setCurrentStep] = useState(0)
    const [session, setSession] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({
      province: '',
      district: '',
      ward: '',
    })
    const [shows, setShows] = useState({
      show_counter: 0,
      show_current_id: 0,
      ticket_current_id: 0,
    })
    const navigate = useNavigate()
    const methods = useForm({
      defaultValues: {
        approveStatus: 'pending',
        location: {
          province: '',
          district: '',
          ward: ''
        },
        fixed_questions: [
          {
            "optional": "true",
            "question": "name"
          },
          {
            "optional": "true",
            "question": "mail"
          },
          {
            "optional": "true",
            "question": "phone"
          },
          {
            "optional": "true",
            "question": "address"
          }
        ],
      }
    })

  const [bannerPreview, setBannerPreview] = useState(null);
  const [logoPreview, setlogoPreview] = useState(null);
  const [showsPreview, setShowsPreview] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
        const { sessionStatus } = await fetchUser()
        if(sessionStatus) {
            methods.setValue('email', sessionStatus?.user?.email)
            setSession(true)
        }
    }
    fetchUserData()
  }, [])

  const handleEventPreviewChange = (event, type) => {
    const file = event.target.files?.[0];
    if (file) {
      const id = uuidv4()
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = { file, id, url: reader.result }
        if (type === "banner") {
          setBannerPreview(fileData)
          methods.setValue('image', id)
        }
        if (type === "logo") {
          setlogoPreview(fileData)
          methods.setValue('organizer.logo', id)
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const handleShowsPreviewChange = (event, index) => {
    const file = event.target.files?.[0]
    if (file) {
      const id = uuidv4()
      const reader = new FileReader()
      reader.onload = () => {
        const fileData = { file, id, url: reader.result }
        setShowsPreview((prev) => {
          const updated = [...prev]
          updated[index] = fileData
          return updated
        })
        methods.setValue(`shows.${index}.image`, id)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadAllImages = async (id_folder) => {
    try {
      if (bannerPreview?.file) {
        await addImage(bannerPreview.file, id_folder, bannerPreview.id);
      }
      if (logoPreview?.file) {
        await addImage(logoPreview.file, id_folder, logoPreview.id);
      }
      for (let i = 0; i < showsPreview.length; i++) {
        const preview = showsPreview[i];
        if (preview?.file) {
          await addImage(preview.file, id_folder, preview.id);
        }
      }
  
      console.log("All images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error("Failed to upload images");
    }
  }

    const onSubmit = (data) => {
      window.scrollTo(0, 0);
      console.log("Dữ liệu hợp lệ:", data);
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3))
    };
    
    const onError = (errors) => {
      console.log("Các lỗi trong form:", errors);
    }
    
    const handleAddEvent = async (dataForm) => {
      setIsLoading(true);
      try {
        const id_folder = uuidv4()
        await uploadAllImages(id_folder)
        const convertedData = {
          ...dataForm,
          image: `${url_storage}${id_folder}/${dataForm.image}`,
          cancel_request: parseInt(dataForm.cancel_request) || 0,
          organizer: {
            ...dataForm.organizer,
            logo: `${url_storage}${id_folder}/${dataForm.organizer.logo}`,
          },
          fixed_questions: dataForm.fixed_questions.map(question => ({
            ...question,
            optional: question.optional === "true", // Chuyển thành boolean
          })),
          shows: dataForm.shows.map(show => ({
            ...show,
            image: `${url_storage}${id_folder}/${show.image}`,
            ticket_types: show.ticket_types.map(ticket => ({
              ...ticket,
              price: parseFloat(ticket.price) || 0,
              quantity: parseInt(ticket.quantity) || 0, // Chuyển đổi tại đây
              amount: parseInt(ticket.amount) || 0,
            })),
          })),
        }
        await addEvent(convertedData)
        navigate("/")
        toast.info('Vui lòng chờ quản trị viên duyệt sự kiện!', {
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
      catch (error) {
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
      } finally {
        setIsLoading(false)
      }
    }
    const goToNextStep = async() => {
      methods.handleSubmit(onSubmit, onError)();
    }
    const goToPreviousStep = () => {
      window.scrollTo(0, 0);
      setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
    }
    const Button = () => {
        return (
          <div>
            <div className="flex justify-between text-[#FAFAFA]">
              <div>
                {currentStep > 0 && <div className='text-center bg-[#b2bcc2] p-2 rounded-lg cursor-pointer hover:bg-slate-400 min-w-20' onClick={goToPreviousStep}>Quay lại</div>}
              </div>
              <div>
                {currentStep < 3 ? (
                  <div className='text-center bg-[#219ce4] p-2 rounded-lg cursor-pointer hover:bg-sky-400 min-w-20' onClick={goToNextStep}>Tiếp theo</div>
                ) : (
                  <div
                    className='text-center bg-[#219ce4] p-2 rounded-lg cursor-pointer hover:bg-sky-400 min-w-20'
                    onClick={!isLoading ? methods.handleSubmit(handleAddEvent) : undefined}
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    ) : (
                      "Hoàn tất"
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
    }

    if(!session) {
      return <div className="text-black">User not found</div>
    }
    
    const steps = ["Thông tin sự kiện", "Thời gian & loại vé", "Thông tin đăng ký", "Thông tin thanh toán"]
    return (
        <div className='flex flex-col w-full font-sans text-start'>
            <div className='flex flex-col h-full'>
                <div className='flex flex-1 min-h-0 overflow-auto'>
                <SidebarStep currentStep={currentStep} steps={steps}/>
                <FormProvider {...methods}>
                <div className='w-[80%] min-w-[480px] p-4 bg-[#F3F3F3]'>
                    <div className='flex flex-col gap-8 justify-between h-full min-h-[500px] overflow-y-auto bg-[#FAFAFA] rounded-2xl p-5'>
                    {currentStep == 0 &&
                      <FirstStep 
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                        handleEventPreviewChange={handleEventPreviewChange}
                        bannerPreview={bannerPreview}
                        logoPreview={logoPreview}
                      />
                    }
                    {currentStep == 1 &&
                      <SecondStep
                        shows={shows}
                        setShows={setShows}
                        showsPreview={showsPreview}
                        setShowsPreview={setShowsPreview}
                        handleShowsPreviewChange={handleShowsPreviewChange}
                      />
                    }
                    {currentStep == 2 &&
                      <ThirdStep />
                    }
                    {currentStep == 3 &&
                      <FourthStep />
                    }
                    <Button/>
                    </div>
                </div>
                </FormProvider>
                </div>
            </div>
            <Footer/>
        </div>
    )
}