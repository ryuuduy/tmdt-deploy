import { useEffect, useState } from "react"
import { fetchDistricts, fetchProvinces, fetchWards } from "../controllers/provinceController"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { addUser, fetchUser } from "../controllers/userController"
import Form from "./ui/change-info/form"
import Footer from "./ui/shared/footer"
import { updateUser } from "../models/User"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const SubmitButton = ({ isFormChanged, initialUser }) => {
    const { handleSubmit } = useFormContext()
    const navigate = useNavigate()
    const handleClick = async (dataForm) => {
        try {
            const isConfirmed = window.confirm("Bạn có chắc chắn muốn lưu thay đổi?")
            if(isConfirmed) {
                if(initialUser) {
                    await updateUser(dataForm)
                }
                else {
                    await addUser(dataForm)
                }
                navigate("/")
                toast.info('Thông tin đã được cập nhật!', {
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
        }
    }
    return (
        <button
            className={`p-2 mt-3 rounded-lg font-medium ${
                isFormChanged ?
                    'bg-[#219ce4] text-[#FAFAFA] cursor-pointer hover:bg-sky-400'
                    : 'bg-[#F3F3F3] text-[#B2BCC2] cursor-not-allowed'
            }`}
            onClick={handleSubmit(handleClick)}
            disabled={!isFormChanged}
        >
            Hoàn tất chỉnh sửa
        </button>
    )
}

export default function ChangeInfo() {
    const [user, setUser] = useState({
        province: '',
        district: '',
        ward: '',
    })
    const [session, setSession] = useState(false)
    const [initialUser, setInitialUser] = useState(null)
    const [isFormChanged, setIsFormChanged] = useState(false)
    
    const [locations, setLocations] = useState({
    provinces: [],
    districts: [],
    wards: [],
    })
    const methods = useForm({
        defaultValues: user
    })
    const formValues = methods.watch()
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
        if (user.province) {
        const fetchDistrictsData = async () => {
            const districtsData = await fetchDistricts(user.province)
            setLocations((prev) => ({
            ...prev,
            districts: districtsData,
            }))
        }
        fetchDistrictsData()
        }
    }, [user.province])

    // Lấy danh sách phường/xã khi chọn quận/huyện
    useEffect(() => {
        if (user.district) {
        const fetchWardsData = async () => {
            const wardsData = await fetchWards(user.district)
            setLocations((prev) => ({
            ...prev,
            wards: wardsData,
            }))
        }
        fetchWardsData()
        }
    }, [user.district])

    useEffect(() => {
        const fetchUserData = async () => {
            const { userData, sessionStatus } = await fetchUser()
            if(sessionStatus) {
                if(userData) {
                    Object.keys(userData).forEach((key) => {
                        methods.setValue(key, userData[key]);
                    });
                    setUser((prevUser) => ({
                        ...prevUser,
                        province: userData.province || '',
                        district: userData.district || '',
                        ward: userData.ward || '',
                    }));
                    setInitialUser(userData)
                }
                else {
                    methods.setValue('role', 'customer')
                    methods.setValue('email', sessionStatus?.user?.email)
                }
                setSession(true)
            }
        }
        fetchUserData()
    }, [])

    useEffect(() => {
        if(session) {
            const current = methods.getValues()
            if (initialUser) {
                const isChanged = Object.keys(current).some((key) => {
                    return current[key] !== initialUser[key];
                });
        
                setIsFormChanged(isChanged)
            }
            else {
                const isFormValid = Object.keys(current).some((key) => {
                    return key !== "email" && key !== "role" && current[key] !== "";
                });
        
                setIsFormChanged(isFormValid);
            }
        }
    }, [formValues, initialUser]);

    if(!session) {
        return <div className="text-black">User not found</div>
    }

    return (
        <div className='flex flex-col w-full font-sans text-center bg-[#F3F3F3]'>
            <div className='flex flex-col items-center justify-between h-full py-6'>
                <div className="w-8/12 bg-[#FAFAFA] rounded-2xl p-8 flex flex-col gap-4">
                    <div className="text-xl font-bold text-[#1b1b1b]">Thông tin cá nhân</div>
                    <FormProvider {...methods}>
                        <Form
                            setUser={setUser}
                            locations={locations}
                            setLocations={setLocations}
                        />
                        <SubmitButton isFormChanged={isFormChanged} initialUser={initialUser}/>
                    </FormProvider>
                </div>
            </div>
            <Footer/>
        </div>
    )
}