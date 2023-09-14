import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return <>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Login">Log in</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
    </>
};

export default Layout;