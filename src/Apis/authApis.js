import {apiRequest} from "../services/apiRequest";

export const authApi = {
    login: async (data) =>  await apiRequest('post', "/account/auth/", data),
    signUp: async (data) =>  await apiRequest('post', "/account/register/", data),
    inviteSignUp: async (data) =>  await apiRequest('post', "/account/register/", data),
    forgotPassword: async (email) =>  await apiRequest('post', "/account/forgot-password/",  email),
    resetPassword: async (data) => await apiRequest('patch', `/account/password-reset-confirm/`, data),
    updateUserProfile: async (data) =>  await apiRequest('patch', "/account/profile/", data),
    updatePassword: async (data) =>  await apiRequest('patch', "/account/changePassword/", data),
    logout: async () => await apiRequest('post', "/account/logout/"),
    userDetails: async (data) => await apiRequest('get', "/account/profile/", data),
  };
  