 import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { FaUserAlt } from 'react-icons/fa'
import profile from './profile.png'
import { HiOutlineLogout } from 'react-icons/hi'


function Sidebar() {

    const [auth, setAuth] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("Login_Success") === "Done") {
            setAuth(true);
            setName(sessionStorage.getItem(`fullname`));
        }
        else {
            setAuth(false);
        }
    }, [])



    const anvigate = useNavigate()
    const handleLogout = () => {
        const cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            const cookieParts = cookies[i].split("=");
            const cookieName = cookieParts[0];
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }

        localStorage.clear();
        sessionStorage.removeItem("fullname");
        sessionStorage.removeItem("Login_Success");
        anvigate('/')

        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, null, window.location.href);
        };
    }

    return (
        auth ? <>
            <nav className="navbar bg-body-tertiary fixed-top" >
                <div className="container-fluid">
                    <div className="navbar-brand" style={{ fontFamily: "Lucida Handwriting", fontWeight: "900" }}>
                        <i className="bi bi-lightning-charge-fill"></i>
                        EMS
                    </div>
                    <div className='profile-buttn'>
                        <div className="navbar-profile">
                            <div className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle prof" to="/billing" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={profile} alt="" />
                                </div>
                                <div className="dropdown-menu">
                                    <div className="dropdown-item pro-name"> {name}</div>
                                    <hr />
                                    <div className="dropdown-item log-name" onClick={handleLogout}> <HiOutlineLogout className='logbutn' />Logout</div>
                                </div>
                            </div>
                        </div>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>
                    <div
                        className="offcanvas offcanvas-end"
                        tabIndex={-1}
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <div className="offcanvas-header">

                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                                <i className="bi bi-lightning-charge-fill"></i>
                                Energy Management
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/sidebar/dashboard">
                                        <i className="bi bi-house"></i>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/sidebar/realtime">
                                        <i className="bi bi-arrow-clockwise"></i>
                                        Realtime
                                    </Link>
                                    <Link to="/sidebar/graph">
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="/sidebar/report">
                                        <i className="bi bi-clipboard2-data"></i>
                                        Report
                                    </Link>
                                </li> */}
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/sidebar/report" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-currency-rupee"></i>
                                        Report
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/sidebar/report">Report</Link></li>
                                        <li><Link className="dropdown-item" to="/sidebar/reportexcel">Report Excel</Link></li>
                                    </ul>
                                </li>

                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="/billing">
                                        <i className="bi bi-currency-rupee"></i>
                                        Billing
                                    </Link>
                                </li> */}
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/sidebar/billing" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-currency-rupee"></i>
                                        Billing
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/sidebar/billing">Billing</Link></li>
                                        <li><Link className="dropdown-item" to="/sidebar/costev">Cost Evaluation</Link></li>
                                        <li><Link className="dropdown-item" to="/sidebar/assigncost">Assigned Cost</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link dropdown-toggle" to="/sidebar/assignmeter" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-speedometer2"></i>
                                        Assignmeter
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/sidebar/assignmeter">Assignmeter</Link></li>
                                        <li><Link className="dropdown-item" to="/sidebar/listassign">List Assignmeter</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='mx-4'>
                <Outlet />
            </div>
        </>
            : null

    )
}

export default Sidebar
