import AuthForm from "./AuthForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const handleSubmit = async (data) => {

    try{

    const response = await fetch("http://localhost:5000/signup", {
      method: "POST", headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    //parse panrom

    const result = await response.json()

    if(response.ok){

      toast.success(result.message || "signup succesfully")
      navigate("/login")

    }else{
      toast.error(result.error || "Signup failed")
    }


    //backend connect aagala or backend run aagala naa

  } catch(error){
     console.error("Signup error:", error);
      toast.error("Could not connect to the backend server.");
  }



  };

  return (
    <AuthForm
      type="signup"
      title=" Create an account "
      subtitle="  Enter your details below to get started.."
      buttonText="Create account"
      onSubmit={handleSubmit}
      footerText="Already have an account? "
      footerLinkText="Sign in"
      footerLinkTo="/login"
    />
  );
};

export default Signup;
