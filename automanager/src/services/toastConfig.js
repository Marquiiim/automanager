import { toast } from "react-toastify"
import 'react-toastify/ReactToastify.css'

const defaultOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
}

export const showToast = {
    success: (message, options = {}) => {
        toast.success(message, { ...defaultOptions, ...options })
    },

    error: (message, options = {}) => {
        toast.error(message, { ...defaultOptions, ...options })
    },

    warning: (message, options = {}) => {
        toast.warning(message, { ...defaultOptions, ...options })
    },

    info: (message, options = {}) => {
        toast.info(message, { ...defaultOptions, ...options })
    },

    loading: (message, options = {}) => {
        return toast.loading(message, { ...defaultOptions, ...options })
    },

    dismiss: (toastId) => {
        toast.dismiss(toastId)
    }
}

export default defaultOptions