import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeClosed } from "lucide-react";

const Signup = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [viewPassword, setViewPassword] = useState(false)
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`,
                { name, username, password },
            );
            if (!res) { return toast.error("Error signing up. Please try again!") }
            localStorage.setItem("token", res.data.token);
            toast.success("Account created succesfully, please login!")
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err: any) {
            if (err.response.status === 409) {
                toast.error('Admin credentials already exists');
                return console.log('Admin credentials already exists');
            }
            toast.error("Error creating account - frontend!",)
            setError("Signup failed");
            setName('');
            setUsername('');
            setPassword('');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="flex flex-col items-center mb-4">
                    <Link to={'/'}>
                        <img
                            src="/Images/gbu_logo.png"
                            alt="University Logo"
                            className="h-16 mb-2"
                        />
                    </Link>
                    <h2 className="text-2xl mb-3 font-semibold">Signup</h2>
                    <p className="text-gray-500 text-zsm">Sign up to continue to Admin Dashboard</p>
                </div>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <form onSubmit={handleLogin}>
                    <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none"
                    />
                    <input
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        maxLength={9}
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none"
                    />
                    <div className="flex justify-between items-center border rounded-lg mb-2">
                        <input
                            required
                            value={password}
                            maxLength={10}
                            onChange={(e) => setPassword(e.target.value)}
                            type={!viewPassword ? 'password' : 'text'}
                            placeholder="Password"
                            className="w-[90%] px-4 py-2 focus:outline-none"
                        />
                        <button className='cursor-pointer mr-3' type='button' onClick={() => setViewPassword(!viewPassword)}>
                            {viewPassword
                                ? <Eye />
                                : <EyeClosed />
                            }
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                        Signup
                    </button>
                </form>

                {/* <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">Register</a>
                </p> */}

                <p className="text-center text-sm mt-4">
                    Contact Admin - <a href="https://nishantchauhan.me/" target="_blank" className="text-blue-500 hover:underline">Nishant Chauhan</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;