import * as yup from 'yup'

export const passwordSchema = yup.object().shape({
    currentPassword: yup.string()
        .required('Current password is required'),
    newPassword: yup.string()
        .min(6, 'New password must be at least 6 characters')
        .required('New password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required')
})