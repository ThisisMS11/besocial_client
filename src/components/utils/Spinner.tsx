import './Spinner.css'
import { useUtils } from '../context/Utils'
import { useEffect } from 'react';

const Spinner = () => {

    const utils = useUtils();

    return (
        <>
            {utils?.loading ?
                (<div className='w-full h-full  absolute z-10 bg-black bg-opacity-40'>
                    <div className="custom-loader">
                    </div>
                </div>) : null
            }


        </>
    )
}

export default Spinner