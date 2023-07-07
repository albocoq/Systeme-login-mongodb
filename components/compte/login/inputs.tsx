import { useState, useCallback } from "react";
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react'

import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'


import { object, string, ref } from "yup";
import { yupResolver} from "@hookform/resolvers/yup" 
import { Controller, Resolver } from "react-hook-form";
import TextField from '@mui/material/TextField'


const schema = object({
    email: string()
    .required('please enter your email.')
    .email('Invalid email address.')
    .trim(),
    password: string()
    .required("please enter a password")
    .trim(),
}).required();


export default function Inputs() {
    const router = useRouter()
    const [isopen, setIsOpen] = useState(false);

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

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            if (callback?.ok) {
                alert('success message')
                router.refresh()
                router.push('/')
            }
            console.log(callback);
            
        })
        .catch((error) => {
            console.log(error);
        })
    }


    return (
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
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
                        label="Enter your Username/Email :" 
                        placeholder="Enter your Username/Email :"
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
                        label="Enter your password :" 
                        placeholder="Enter your password :" 
                        className="w-full"
                        helperText={errors?.password ? errors?.password.message: ""}
                        error={errors?.password ? Boolean(true) : Boolean(false)}
                    />
                )}
            />
            <div className="flex flex-col w-full items-center mt-7">
                <button type='submit' className="w-2/3 h-8 rounded-lg">
                    Register
                </button>
            </div>
        </form> 
    )
}
