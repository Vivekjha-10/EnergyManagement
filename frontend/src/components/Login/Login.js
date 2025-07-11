import { useEffect, useState } from "react";
import './Login.css';
import classnames from "classnames";
import unimesh from "./unimeshfinal.png"
import { FaBolt } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Login = () => {
    const [swapPanel, setSwapPanel] = useState(false);
    const signUpButton = () => {
        setSwapPanel(true);
    };

    const signInButton = () => {
        setSwapPanel(false);
    };
    // const handleClick = () =>{
    //     const nameInput = document.querySelector('#fullname');
    //     const emailInput = document.querySelector('#email');
    //     const passwordInput = document.querySelector('#password');

    //     if (nameInput.value && emailInput.value && passwordInput.value) {
    //         const MySwal = withReactContent(Swal);

    //         MySwal.fire({
    //             title: <strong>User Added Successfully!</strong>,
    //             icon: 'success',
    //             iconColor: '#30a702',
    //         });
    //     } else {
    //         // Handle the case when not all input fields have a value
    //         Swal.fire({
    //             title: 'Please fill all required fields',
    //             icon: 'warning',
    //             iconColor: '#ff9800',
    //         });
    //     }
    // }

    const MySwal = withReactContent(Swal);

    const [isActive, setIsActive] = useState({ id: 'signIn', })
    useEffect(() => { }, [isActive])
    const hideShowDiv = (e) => {
        setIsActive({ id: e.target.id, })
    }

    const [values, setValues] = useState({
        fullname: '',
        email: '',
        password: ''
    })

    const [val, setloginValues] = useState({
        email: '',
        password: ''
    })

      

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:4001/Management/api/v1/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((response) => {
                if (!response.ok) {
                    MySwal.fire({
                        title: <strong>"Invalid response"</strong>,
                        icon: 'error',
                      });
                }
                
                return response.json();
            })
            .then((data) => {
                    if (data.Response.Status.StatusCode === "1") {
                        // Display a Swal notification for the case when the email already exists
                        MySwal.fire({
                          title: <strong>{data.Response.Status.DisplayText}</strong>,
                          icon: 'error',
                        });
                      }
                      if (data.Response.Status.ErrorCode === "005") {
                        // Display a Swal notification for the case when the email already exists
                        MySwal.fire({
                          title: <strong>{data.Response.Status.DisplayText}</strong>,
                          icon: 'warning',
                        });
                    }
                      if (data.Response.Status.ErrorCode === "007") {
                        // Display a Swal notification for the case when the email already exists
                        MySwal.fire({
                          title: <strong>{data.Response.Status.DisplayText}</strong>,
                          icon: 'warning',
                        });
                    }
                      else if (data.Response.Status.StatusCode === "0") {
                        // Customize this part to handle a successful registration, if needed
                        MySwal.fire({
                          title: <strong>User Added Successfully!</strong>,
                          icon: 'success',
                        });
                      }
            })
            .catch((error) => {
                MySwal.fire({
                    title: <strong>Request failed!</strong>,
                    icon: 'error',
                  });
                console.error('Request failed:', error);
            });

        event.target.reset();
    }

    const navigate = useNavigate()
    const handleSub = (event) => {
        event.preventDefault();
        fetch('http://localhost:4001/Management/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(val),
        })

        .then((response) => {
            if (!response.ok) {
                MySwal.fire({
                    title: <strong>"Invalid response"</strong>,
                    icon: 'error',
                  });
            }
            
            return response.json();
        })
            .then((data) => {
                if (data.Response.Status.StatusCode === "0") {
                    localStorage.setItem('x-auth-token', JSON.stringify(data.Response.ResponseData.x_auth_token));
                    sessionStorage.setItem('fullname',(data.Response.ResponseData.fullname));
                    sessionStorage.setItem("Login_Success" , "Done");
                    navigate('/sidebar/dashboard', { replace: true })
                    // alert("login successfully")
                }
                if (data.Response.Status.StatusCode === "1"){
                    MySwal.fire({
                        title: <strong>"User is not verified. Kindly contact System Admin."</strong>,
                        icon: 'warning',
                    });
                }
                if (data.Response.Status.ErrorCode === "008"){
                    MySwal.fire({
                        title: <strong>"Email id doesn't match."</strong>,
                        icon: 'warning',
                    });
                }
                if (data.Response.Status.ErrorCode === "014"){
                    MySwal.fire({
                        title: <strong>"You entered incorrect password."</strong>,
                        icon: 'warning',
                    });
                }
            })
        .catch(err => console.log(err))
    }
    return (
        <div className="sigin">
            <div className={classnames("container", { "right-panel-active": swapPanel })} id="container">
                <div className={isActive.id === 'signUp' ? `signUp` : 'signUp-none'} >
                    <div className="form-container sign-up-container">

                        <form onSubmit={handleSubmit}>
                            <div className="brand" style={{ fontFamily: "Lucida Handwriting", fontWeight: "900" }} >
                                <FaBolt size={'2rem'} />
                                EMS
                            </div>

                            <h6>Enter your credentials to continue</h6>
                            <input type="text" placeholder="Full Name" id="fullname" onChange={e => setValues({ ...values, fullname: e.target.value })} required />
                            <input type="email" placeholder="Email" id="email" onChange={e => setValues({ ...values, email: e.target.value })} required />
                            <input type="password" placeholder="Password" id="password" autoComplete="off" onChange={e => setValues({ ...values, password: e.target.value })} required />
                            <div className="mobile" id="signIn" onClick={(e) => { hideShowDiv(e) }} >Sign In</div>

                            <button type="submit">Sign Up</button>

                            <div className="unim">
                                <div className="uni">
                                    <img src={unimesh} alt="" />
                                    <div className="uniname">
                                        <h2>UniMesh</h2>
                                        <h5>Technologies</h5>
                                    </div>
                                </div>
                                <p>Connecting Future!</p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={isActive.id === 'signIn' ? `signIn` : 'signIn-none'} >
                    <div className="form-container sign-in-container">
                        <form onSubmit={handleSub}>
                            <div className="brand" style={{ fontFamily: "Lucida Handwriting", marginBottom: ".7rem", fontWeight: "900" }} >
                                <FaBolt size={'2rem'} />
                                EMS
                            </div>

                            <h3 style={{ color: "#673AB7" }}>Hi, Welcome Back</h3>
                            <h6>Enter your credentials to continue</h6>

                            <input type="email" onChange={e => setloginValues({ ...val, email: e.target.value })} placeholder="Email" />
                            <input type="password" placeholder="Password" onChange={e => setloginValues({ ...val, password: e.target.value })} autoComplete="off" />

                            <div id="signUp" onClick={(e) => { hideShowDiv(e) }} className="mobile">Sign Up</div>

                            <button type="submit" >Sign In</button>

                            <div className="unim">
                                <div className="uni">
                                    <img src={unimesh} alt="" />
                                    <div className="uniname">
                                        <h2>UniMesh</h2>
                                        <h5>Technologies</h5>
                                    </div>
                                </div>
                                <p>Connecting Future!</p>
                            </div>

                        </form>
                    </div>
                </div>

                <div className="overlay-container">
                    <div className="overlay">

                        <div className="overlay-panel overlay-left">
                            <div className="up">
                                <h1>Hello, user!</h1>
                                <p>
                                    To keep connected with us please login with your personal info
                                </p>

                                <button
                                    type="button"
                                    onClick={signInButton}
                                    className="ghost"
                                    id="signIn"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>

                        <div className="overlay-panel overlay-right">
                            <div className="up">
                                <h1>Get Started!</h1>
                                <p>Enter your personal details and start journey with us</p>

                                <button
                                    type="button"
                                    onClick={signUpButton}
                                    className="ghost"
                                    id="signUp"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Login;
