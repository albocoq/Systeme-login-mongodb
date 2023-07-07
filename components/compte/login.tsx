"use client"
import { signIn } from 'next-auth/react'
import Image from 'next/image';
import Button from '@mui/material/Button'
import styles from '@/styles/compte/sign.module.scss'
import Inputs from './login/inputs';




export default function Sign() {

    
    return (
        <div className={styles.loginForm}>
            <div className={styles.card}>
                    <h5>Log into your account</h5>
                    <div className={styles.container}>
                        <Inputs />
                        <p className={styles.login}>
                            Don&apos;t have a account ? <a href={"./sign"}>Sign</a>
                        </p>                        
                    </div>
                </div>      
        </div>
    )
}
