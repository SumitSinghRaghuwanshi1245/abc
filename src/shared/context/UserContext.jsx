import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axiosInstance from "../axios_API/axios";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const response = await axiosInstance.get("/user/get-account");
            if (response.status === 200) {
                console.log(response.data.data)
                return setUser(response.data.data);
            }
        } catch (error) {
            console.log(error)
            const token = localStorage.getItem("userToken");
            if (error.response.status === 401 && token) {
                return toast.error("session is expired !");
            }
        }
    }

    const validateAction = (updatedDetails) => {
        const keys = ["firstName", "lastName", "dob", "gender", "email"]
        const error = keys.map(key => {
            if (!updatedDetails[key]) {
                return `${key} is required to perform update action`;
            }
            return null;
        }).filter(message => message)

        return error;
    }

    const updateUserprofile = async (tempraryUser) => {
        try {
            const { phoneNumber, ...rest } = tempraryUser
            const requestPayload = {
                ...rest
            }
            const response = await axiosInstance.put("/user/update-profile", requestPayload)
            switch (response.status) {
                case 200:
                    return { success: true, message: response?.data?.message }
                default:
                    return { success: false, message: response?.data?.message }
            }

        } catch (error) {
            return { success: false, message: error?.message || error?.response?.data?.message }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("userToken");

        if (token) {
            getUser();
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, updateUserprofile, validateAction }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);