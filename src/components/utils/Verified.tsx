import { useNavigate, useSearchParams } from "react-router-dom";
const Verified = () => {

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    if (token) {
        localStorage.setItem('token', token);
        navigate('/verify');
    }

    const navigateToDashboard = () => {
        navigate('/');
    }

    return (
        <div className="h-[100vh] flex flex-col items-center justify-center">
            <div className="text-4xl">Email Verified Successfully</div>

            <button className="p-4 my-4 bg-blue-700 text-white rounded-lg" onClick={navigateToDashboard}>
                Redirect me to Dashboard
            </button>
        </div>

    )
}

export default Verified