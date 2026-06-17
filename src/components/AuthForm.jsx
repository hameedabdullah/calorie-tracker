import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import leftBanner from "../assets/left-banner.jpg";




const loginSchema = z.object({
    email: z.string().min(1,"Email is required").email("invalid email address"),
    password: z.string().nonempty("password is required").min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
    username: z.string().nonempty("username is required").min(4,"Username must be at least 5 characters"),
    email: z.string().min(1,"Email is required").email("invalid email address"),
    password: z.string().nonempty("password is required").min(6, "Password must be at least 6 characters"),
});





const AuthForm = ({type,title,subtitle,buttonText,onSubmit,footerText,footerLinkText,footerLinkTo}) => {

    const schema = type === "signup" ? signupSchema : loginSchema

    const {register,handleSubmit,formState:{errors},} = useForm({resolver:zodResolver(schema)})

    const onFormSubmit = (data)=>{
        onSubmit(data);
    }
     
    console.log("rerender")

    const handleForgotClick = (event) => {
        event.preventDefault();

        alert("Forgot password clicked! this feauture is coming soon");
    };





    return (

        <div className="auth-card">



            <div className="auth-banner">

                <img src={leftBanner} alt="Sunset background" className="banner-image" />
                <div className="banner-overlay"></div>

                <div className="banner-content">
                    <h2 className="banner-title">Track Calories ,Transform Life.</h2>
                    <p className="banner-subtitle"> Stay Consistent Always , Consistency Creates Success.</p>
                </div>

            </div>




            <div className="auth-form-panel">

                <div className="form-container">

                    <div className="form-header">
                        <h1 className="form-title"> {title}</h1>
                        <p className="form-subtitle"> {subtitle}.</p>
                    </div>



                    <form onSubmit={handleSubmit(onFormSubmit)} className="auth-form">

                        {type === "signup" && (

                            <div className="form-group">
                                <label htmlFor="username"> Username </label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Your username"
                                    {...register("username")}
                                />
                                {errors.username && <span className="error-text">{errors.username.message}</span>}
                            </div>

                        )}


                        <div className="form-group">
                            <label htmlFor="email"> Email address </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email address"
                                {...register("email")}/>
                                {errors.email && <span className="error-text">{errors.email.message}</span>}
                        </div>




                        <div className="form-group">

                            <div className="form-label-row">
                                <label htmlFor="password">Password</label>
                                <a href="#forgot" className="forgot-link" onClick={handleForgotClick}> Forgot password?</a>
                            </div>

                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                 {...register("password")} />
                                {errors.password && <span className="error-text">{errors.password.message}</span>}
                        </div>
                        


                        <button type="submit" className="btn-primary">{buttonText}</button>
                    </form>

                    <div className="divider">
                        <span className="divider-text">OR</span>
                    </div>

                    <div className="social-grid">
                        <button className="btn-social" type="button"> <GitHubIcon /> GitHub </button>
                        <button className="btn-social" type="button"> <GoogleIcon /> Google </button>
                    </div>

                    <div className="form-footer">
                        <span>{footerText}</span>
                        <Link to={footerLinkTo} className="footer-link" >{footerLinkText}</Link>
                    </div>


                </div>




            </div>





        </div>
    )
};

const GitHubIcon = () => {

    return (

        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="social-icon">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
    )

}



const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" className="social-icon">
        <path
            fill="#EA4335"
            d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.47 15 0 12 0 7.35 0 3.37 2.67 1.46 6.57l3.92 3.04C6.35 7.15 8.94 5.04 12 5.04z"
        />
        <path
            fill="#4285F4"
            d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.67-5.02 3.67-8.66z"
        />
        <path
            fill="#FBBC05"
            d="M5.38 14.65c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.46 7.03C.53 8.9.01 10.99.01 13.2s.52 4.3 1.45 6.17l3.92-3.72z"
        />
        <path
            fill="#34A853"
            d="M12 24c3.24 0 5.97-1.07 7.96-2.91l-3.76-2.91c-1.1.74-2.52 1.18-4.2 1.18-3.06 0-5.65-2.11-6.62-4.97L1.46 18.13C3.37 22.03 7.35 24 12 24z"
        />
    </svg>
);



export default AuthForm;



