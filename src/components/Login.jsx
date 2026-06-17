import AuthForm from "./AuthForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();


    const handleSubmit = async (data) => {

        try{

        const response = await fetch("http://localhost:5000/login",{
            method:"POST", headers:{"Content-Type": "application/json",},
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        });


        const result = await response.json();

        if(response.ok){
            toast.success(result.message || "Login successfully")
            localStorage.setItem("user", JSON.stringify(result.user));
            navigate("/dashboard")
        }else{
            toast.error(result.error || "Login failed")
        }

        //backend connect aagala or backend run aagala naa

    }catch(error){
        console.error("Login error:", error);
      toast.error("Could not connect to the backend server.");

    }



    };



    return (
        <AuthForm
            type="login"
            title=" Login "
            subtitle=" Welcome back! Enter your details below."
            buttonText="Login"
            onSubmit={handleSubmit}
            footerText="Don't have an account? "
            footerLinkText="Sign up"
            footerLinkTo="/signup"
        />
    );
};

export default Login;
