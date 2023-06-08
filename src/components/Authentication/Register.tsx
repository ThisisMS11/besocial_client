import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import { useStyles } from '../styles/Register';
import axios from 'axios';
/*Import React FilePond */
import { FilePond, registerPlugin } from 'react-filepond'

/* Import FilePond styles */
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'


import { useValidators } from './validators'
import { useUtils } from '..';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageResize);

const Register = () => {

    const classes = useStyles();


    //Custom hook for user authentication

    const utils = useUtils();

    const [newuserinfo, setNewuserinfo] = useState({ username: "", email: "", password: "", confirmpassword: "" });
    const [stateSignUp, setStateSignUp] = useState(true);

    /* Form Validators */
    let { usernamevalid, usernameChecker,
        emailvalid, emailChecker,
        passwordvalid, passwordChecker,
        cpasswordvalid, setCpasswordvalid } = useValidators();


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewuserinfo({ ...newuserinfo, [e.target.name]: e.target.value })
    }

    const [files, setFiles] = useState<any[]>();


    /* Handle the Sign Up procedure */
    const handleRegister = async () => {
        /* Registration form data */
        const Userform = new FormData();
        if (newuserinfo.username)
            Userform.append('username', newuserinfo.username)
        if (newuserinfo.email)
            Userform.append('email', newuserinfo.email);
        if (newuserinfo.password)
            Userform.append('password', newuserinfo.password);

        if (files) {
            Userform.append('profilePic', files[0].file);
        }

        /* Making Axios Call */
        // const RequestUrl: string = (process.env.REACT_APP_URL_LOCAL as string) || "http://localhost:5173";

        utils?.setLoading(true);

        const RegisterRes = await axios.post(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/register`, Userform);
        console.log('Registration Response :', RegisterRes.data);

        if (RegisterRes.data.success) {
            utils?.setAlertState(true);
            utils?.setAlertmessage("Please check your email for verification");
            utils?.setSeverity("success");
            utils?.setLoading(false);
        }
    }


    useEffect(() => {
        // we are using useEffect to get the latest updated values from our usestate.
        if (newuserinfo.username) {
            usernameChecker(newuserinfo.username);
        }

        if (newuserinfo.email) {
            emailChecker(newuserinfo.email)
        }

        if (newuserinfo.password) {
            passwordChecker(newuserinfo.password);
        }

        if (newuserinfo.confirmpassword) {
            if (newuserinfo.confirmpassword !== newuserinfo.password) {
                setCpasswordvalid('block')
            }
            else {
                setCpasswordvalid('hidden')
            }
        }

        if (usernamevalid == 'hidden' && passwordvalid == 'hidden' && emailvalid == "hidden") {
            setStateSignUp(false);
        }
        else {
            setStateSignUp(true);
        }

    }, [newuserinfo.username, newuserinfo.email, newuserinfo.password, stateSignUp, newuserinfo.confirmpassword])



    return (
        <>
            <div className='bg-AuthBackground font-sans font-light '>



                <section className="h-screen px-16 mx-12  ">
                    <div className="px-6 h-full text-gray-800  text-center flex items-center justify-center ">
                        <div
                            className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-fit w-2/3 g-6 flex-col rounded-2xl text-white bg-AuthForm px-4"
                        >
                            <h1 className='text-center font-light mt-2 text-3xl  border-red-400 ' >Signup</h1>

                            <div className="mb-0 md:mb-0   mx-auto p-8 w-full">

                                <div>


                                    <Grid container >
                                        <Grid item md={6} >
                                            <div className="mb-[0.92rem]  ">
                                                <div className="text-white text-left ml-2 text-xl mb-[0.8rem]">
                                                    Name
                                                </div>


                                                <input

                                                    className={`form-control block  px-4 py-2 text-xl font-normal text-white bg-AuthInput bg-clip-padding rounded-full transition ease-in-out m-0  focus:bg-gray-800 focus:outline-none border-none`}

                                                    placeholder="Full Name"
                                                    value={newuserinfo.username}
                                                    name="username"
                                                    onChange={handleOnChange}
                                                    type="text"
                                                />
                                                <div className={`${usernamevalid} text-sm text-red-500 text-left`}>
                                                    * Must Contain at least 7 letters.
                                                </div>
                                            </div>


                                            <div className="mb-[0.92rem]  ">
                                                <div className="text-white text-left ml-2 text-xl mb-[0.8rem]">
                                                    Email
                                                </div>
                                                <input

                                                    className="form-control block  px-4 py-2 text-xl font-normal text-white bg-AuthInput bg-clip-padding rounded-full transition ease-in-out m-0  focus:bg-gray-800 focus:outline-none border-none"

                                                    placeholder="Email"
                                                    name='email'
                                                    value={newuserinfo.email}
                                                    onChange={handleOnChange}
                                                    type="email"

                                                />
                                                <div className={`${emailvalid} text-sm text-red-500 text-left`}>
                                                    * Not a Valid Email
                                                </div>


                                            </div>

                                            <div className="mb-[0.92rem]">
                                                <div className="text-white text-left ml-2 text-xl mb-[0.8rem]">
                                                    Password
                                                </div>
                                                <input
                                                    className="form-control block  px-4 py-2 text-xl font-normal text-white bg-AuthInput bg-clip-padding  transition ease-in-out m-0  focus:bg-gray-800  focus:outline-none rounded-full border-none"

                                                    placeholder="Password"
                                                    name='password'
                                                    value={newuserinfo.password}
                                                    onChange={handleOnChange}
                                                    type="password" />

                                                <div className={`${passwordvalid} text-sm text-red-500 text-left `}>
                                                    * Password must contain at least one UpperCase,
                                                    lowerCase,special character with
                                                    minumum of 6 characters.
                                                </div>


                                            </div>

                                            <div className="mb-6">
                                                <div className="text-white text-left ml-2 text-xl mb-[0.8rem]">
                                                    Confirm Password
                                                </div>
                                                <input
                                                    className="form-control block  px-4 py-2 text-xl font-normal text-white bg-AuthInput bg-clip-padding  transition ease-in-out m-0  focus:bg-gray-800  focus:outline-none rounded-full border-none"

                                                    placeholder="Confirm Password"
                                                    name='confirmpassword'
                                                    value={newuserinfo.confirmpassword}
                                                    onChange={handleOnChange}
                                                    type="password" />

                                                <div className={`${cpasswordvalid} text-sm text-red-500 text-left`}>
                                                    * Password do not match
                                                </div>
                                            </div>

                                        </Grid>


                                        <Grid item md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                            <div>
                                                <div>
                                                    <FilePond
                                                        files={files}

                                                        onupdatefiles={setFiles}

                                                        allowMultiple={false}
                                                        maxFiles={1}
                                                        name="files"
                                                        labelIdle='Drag & Drop your profile photo or <span class="filepond--label-action">Browse</span>'

                                                        className={classes.FilePond}

                                                    />
                                                </div>


                                                <button  >Upload Now</button>

                                            </div>
                                        </Grid>

                                    </Grid>



                                    <div className="text-center lg:text-left">
                                        <button
                                            type="submit"
                                            className="inline-block px-7 py-3 bg-AuthButton text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out " disabled={stateSignUp}

                                            onClick={handleRegister}

                                        >
                                            Signup
                                        </button>

                                        <span className="text-md font-light mt-2 pt-1 mb-0 flex justify-center items-center   p-4 ">
                                            <div className='mx-4  '>Already a user?</div>
                                            <a
                                                href="/login"
                                                className="text-blue-500 underline hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out mr-6  "
                                            >Login</a
                                            >
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>

    )
}

export default Register