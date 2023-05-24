import { useState } from "react"

export const useValidators = () => {
    /* username */
    const [usernamevalid, setUsernamevalid] = useState('hidden');

    const usernameChecker = (username: String) => {
        if (username.length < 7) {
            setUsernamevalid('block')
        }
        else {
            setUsernamevalid('hidden')
        }
    }


    /* Email */
    const [emailvalid, setEmailvalid] = useState('hidden')
    const emailChecker = (email: string) => {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setEmailvalid('block')
        }
        else {
            setEmailvalid('hidden')
        }
    }


    /* Password */
    const [passwordvalid, setPasswordvalid] = useState('hidden')
    function passwordChecker(password: string) {
        // small + Capital + special character + in the range of (6,16);
        var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;;
        if (!re.test(password)) {
            setPasswordvalid('block')
        }
        else {
            setPasswordvalid('hidden')
        }
    }

    /* Confirm Password : checks whether cpassword field matches that with that password one or not*/
    const [cpasswordvalid, setCpasswordvalid] = useState('hidden')
    function CpasswordChecker(password: string) {
        // small + Capital + special character + in the range of (6,16);
        var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;;
        if (!re.test(password)) {
            setPasswordvalid('block')
        }
        else {
            setPasswordvalid('hidden')
        }
    }

    return {
        usernamevalid, setUsernamevalid, usernameChecker,
        emailvalid, setEmailvalid, emailChecker,
        passwordvalid, setPasswordvalid, passwordChecker,
        cpasswordvalid, setCpasswordvalid, CpasswordChecker
    };
};
