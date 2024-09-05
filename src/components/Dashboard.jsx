import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import UsersTabel from "./UsersTabel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Retrieve user data from localStorage and parse it
    const userData = JSON.parse(localStorage.getItem("userData"));

    // useEffect hook to redirect user to the home page if no user data is found
    useEffect(() => {
        // If userData is not available, navigate to the home page
        if (!userData) {
            navigate("/");
        }
    }, [userData, navigate]); // Dependencies array: effect will run when userData or navigate changes

    // Function to handle user logout
    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem("userData");
        // Navigate to the home page
        navigate("/");
    };

    // If userData is not available, render nothing or a loading indicator until redirect happens
    if (!userData) {
        return null;
    }

    return (
        <div className="flex w-full">
            {/* Sidebar component */}
            <Sidebar />
            <div className="w-full md:w-3/4 min-h-screen">
                {/* Welcome message with user's name and logout button */}
                <h1 className="text-4xl text-left font-semibold mb-12 px-8 pt-12 flex justify-between w-full">
                    Welcome {userData.name}
                    {/* Logout button with icon */}
                    <span
                        className="text-lg flex items-center text-red-500 gap-1 cursor-pointer select-none"
                        onClick={handleLogout}
                    >
                        Logout
                        <ArrowRightOnRectangleIcon className="w-8 h-8" />
                    </span>
                </h1>
                {/* UsersTabel component to display the user table */}
                <UsersTabel />
            </div>
        </div>
    );
}

export default Dashboard;
