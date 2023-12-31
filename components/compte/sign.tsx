"use client"
import { useState, useCallback } from "react";
import Image from "next/image"
import Link from "next/link"
import { signIn } from 'next-auth/react';


import styles from '@/styles/compte/sign.module.scss'
import Inputs from './sign/inputs'


export default function Sign() {


    return (
        <div className={styles.loginForm}>
            <div className={styles.card}>
                    <h5>Create your account</h5>
                    <div className={styles.container}>
                        <Inputs />   
                        <p className={styles.login}>
                            Already have a account ?  <a href={"./login"}> Login </a>
                        </p>
                    </div>
                </div>      
        </div>
    )
}
