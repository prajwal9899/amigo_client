import { Link, Outlet, Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import NavBar from "../components/NavBar/NavBar";
import InfoBox from "../components/Analytics/InfoBox";

const DashboardLayout = () => {
    return (
        <>
            <Sidebar />
            <section id="content">
                <NavBar />
                <main>
                    <Outlet />
                </main>
            </section>
        </>
    )
}

export default DashboardLayout