import { useState, useEffect } from '../../imports/Reactimports'
import { Dispatch } from 'react';
import { EditIcon, IconButton, CrossIcon } from '../../imports/Muiimports';
import { updateUserInfo, useUtils } from '../..';
import { useMutation } from '@tanstack/react-query';
import { useValidators } from '../../Authentication/validators';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface MyComponentProps {
    name: string;
    email: string;
    setOpen?: Dispatch<React.SetStateAction<boolean>>;
}
const EditProfileEditor: React.FC<MyComponentProps> = ({ name, email, setOpen }) => {


    const [userinfo, setUserinfo] = useState<MyComponentProps>({ name: name, email: email });

    let { usernamevalid, usernameChecker, emailChecker, emailvalid } = useValidators();

    const [changeEmail, setChangeEmail] = useState<Boolean>(false);
    const [changeName, setChangeName] = useState<Boolean>(false);
    const utils = useUtils();
    const queryClient = useQueryClient();

    /* handle input changes */
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserinfo({ ...userinfo, [e.target.name]: e.target.value })
    }

    /* Save Profile Mutation */
    const handleEditMutation = useMutation({
        mutationFn: (mutationData: { name: string; email: string }) => updateUserInfo(mutationData.name, mutationData.email),
        mutationKey: ['saveProfile'],
        onSuccess: () => {
            queryClient.invalidateQueries(["userinfo"]);
            queryClient.invalidateQueries(["alluserposts"]);
            utils?.setLoading(false);
            if (setOpen) setOpen(false);
        },
        onError: (error) => {
            const errormessage = utils?.GetErrorMessage(error as AxiosError);
            utils?.errornotify(errormessage as string);
        }
    })

    useEffect(() => {

        if (userinfo.name) {
            usernameChecker(userinfo.name);
        }

        if (userinfo.email) {
            emailChecker(userinfo.email)
        }

    }, [userinfo.name, userinfo.email, setOpen])


    const handleEditProfile = async (e: any) => {
        e.preventDefault();
        if (setOpen) setOpen(false);
        handleEditMutation.mutate({ name: userinfo.name, email: userinfo.email });
    }

    useEffect(() => {
        const { status, isLoading } = handleEditMutation;

        console.log({ status, isLoading });

        utils?.setLoading(isLoading);

    }, [handleEditMutation.status])



    return (
        <div>
            <div className='bg-black flex flex-col justify-center items-center p-8 rounded-md' >

                <IconButton sx={{ mb: 2 }}>
                    <CrossIcon onClick={() => { if (setOpen) { setOpen(false) } }} />
                </IconButton>

                <form onSubmit={handleEditProfile}>

                    <div className="mb-6  flex items-center">
                        <div className="text-white text-left ml-2 mr-3 mt-3  text-xl mb-[0.8rem]">
                            Name
                        </div>

                        <div>

                            <input

                                className={`form-control block xl:w-96 px-4 py-2 text-xl font-normal  bg-AuthInput bg-clip-padding rounded-full transition ease-in-out m-0  focus:bg-gray-800 focus:outline-none border-none ${changeName ? 'text-white' : 'text-gray-400'} `}

                                placeholder="Name"

                                value={userinfo.name}
                                onChange={handleOnChange}
                                name='name'
                                type="name"

                                disabled={!changeName}

                            />
                            <div className={`${usernamevalid} text-sm text-red-500 text-left`}>
                                * Must Contain at least 7 letters.
                            </div>
                        </div>


                        <IconButton>
                            <EditIcon onClick={() => setChangeName(!changeName)} />
                        </IconButton>
                    </div>


                    <div className="mb-8 flex items-center">
                        <div className="text-white text-left ml-2  mr-3 mt-4 text-xl mb-[0.8rem]">
                            Email
                        </div>
                        <div>

                            <input
                                className={`form-control block xl:w-96 px-4 py-2 text-xl font-normal  bg-AuthInput bg-clip-padding rounded-full transition ease-in-out m-0  focus:bg-gray-800 focus:outline-none border-none ${changeEmail ? 'text-white' : 'text-gray-400'} `}

                                placeholder="Email"
                                value={userinfo.email}
                                name="email"
                                onChange={handleOnChange}
                                type="email"

                                disabled={!changeEmail}
                            />

                            <div className={`${emailvalid} text-sm text-red-500 text-left`}>
                                * Not a Valid Email
                            </div>
                        </div>



                        <IconButton>
                            <EditIcon onClick={() => setChangeEmail(!changeEmail)} />
                        </IconButton>


                    </div>

                    <div className="mb-10  border-black text-left">
                        <a href="#!" className=" border-green-700 text-white ml-4 ">Update Password</a>
                    </div>

                    <div className="text-center lg:text-left">
                        <button
                            className="inline-block px-7 py-3 bg-AuthButton text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"

                            // onClick={() => { mutate({ name: userinfo.name, email: userinfo.email }) }}
                            onClick={handleEditProfile}
                        >
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default EditProfileEditor