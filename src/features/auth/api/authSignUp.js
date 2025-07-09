// import { createAxiosInstance } from "../../../shared/axios_API/axios";

// export const signUpAPI = {
//     sendOTP: async (mobileNumber) => {
//         const token = localStorage.getItem("userToken");
//         const api = createAxiosInstance(token);
//         return await api.post('/user/register', {}, { params: { phoneNumber: mobileNumber } });
//     },

//     verifyOTP: async (mobileNumber, userOTP, userId, expireTime) => {
//         const token = localStorage.getItem("userToken");
//         const api = createAxiosInstance(token);
//         return await api.post('/user/verify-otp',
//             { userId: userId, expire: expireTime },
//             { params: { phoneNumber: mobileNumber, otp: userOTP, login: false } });
//     },

//     createProfile: async (profile) => {
//         const token = localStorage.getItem("userToken");
//         const api = createAxiosInstance(token);
//         return await api.post('/user/create-profile', profile);
//     }
// };