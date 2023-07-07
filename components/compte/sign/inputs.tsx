import axios from 'axios'
import TextField from '@mui/material/TextField'
import { Controller, Resolver } from "react-hook-form";
import { boolean, object, string, ref } from "yup";
import { useState, useCallback } from "react";
import { yupResolver} from "@hookform/resolvers/yup" 
import { useRouter } from "next/navigation"


import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import Alert from '@mui/material/Alert'


const schema = object({
    name: string()
    .required("please enter a name")
    .trim(),
    email: string()
    .required('please enter your email.')
    .email('Invalid email address.')
    .trim(),
    password: string()
    .required("please enter a password")
    .min(9, "Must be between 9 and 26 characters")
    .max(26, 'Must be between 9 and 26 characters')
    .trim(),
    confirmPassword: string()
    .required("please re enter a password")
    .oneOf([ref("password"), null], "Password don't match")
    .trim(),
}).required();


export default function Inputs() {
    const router = useRouter()

    const [ error, setError ] = useState({})

    const { 
        register,
        control, 
        handleSubmit, 
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: yupResolver( schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        axios.post('api/register', data)
            .then(() => {
                router.push("/login")
            })
            .catch((error) => {
                <Alert severity="error">{error}</Alert>    
            })
    }

    return (
        <form className='mt-10' onSubmit={handleSubmit(onSubmit)}>
            <Controller 
                name="name" 
                control={control} 
                defaultValue="" 
                render={( { field }) => (
                    <TextField 
                        {...field} 
                        id="name" 
                        type="text" 
                        variant="standard" 
                        label="Your username :" 
                        placeholder="Your username :"
                        className="w-full"
                        helperText={errors?.name ? errors?.name.message: ""}
                        error={errors?.name ? Boolean(true) : Boolean(false)}
                        autoComplete="off"
                    />
                )}
            />
            <Controller 
                name="email" 
                control={control} 
                defaultValue="" 
                render={( { field }) => (
                    <TextField 
                        {...field} 
                        id="email" 
                        type="email" 
                        variant="standard" 
                        label="Your email :" 
                        placeholder="Your email :"
                        className="w-full"
                        helperText={errors?.email ? errors?.email.message: ""}
                        error={errors?.email ? Boolean(true) : Boolean(false)}
                        autoComplete="off"
                    />
                )}
            />
            <Controller 
                name="password" 
                control={control} 
                defaultValue="" 
                render={( { field }) => (
                    <TextField 
                        {...field} 
                        id="password" 
                        type="password" 
                        variant="standard" 
                        label="Choose a password :" 
                        placeholder="Choose a password :"
                        className="w-full"
                        helperText={errors?.password ? errors?.password.message: ""}
                        error={errors?.password ? Boolean(true) : Boolean(false)}
                    />
                )}
            />              
            <Controller 
                name="confirmPassword" 
                control={control} 
                defaultValue="" 
                render={( { field }) => (
                    <TextField 
                        {...field} 
                        id="confirmPassword" 
                        type="password" 
                        variant="standard" 
                        label="Confirm your password :" 
                        placeholder="Confirm your password :" 
                        className="w-full"
                        helperText={errors?.confirmPassword ? errors?.confirmPassword.message: ""}
                        error={errors?.confirmPassword ? Boolean(true) : Boolean(false)}
                    />
                )}
            />
        <div className="flex flex-col w-full items-center mt-7">
            <button type="submit" className="w-2/3 h-8 rounded-lg">
                Register
            </button>
        </div>
    </form> 
    )
}
