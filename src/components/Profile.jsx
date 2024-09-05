import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect } from "react";

function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state;

    // Redirect to home if user data is not available
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        const isAuthenticated = localStorage.getItem("userData");
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [user, navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    // Navigate back to the dashboard
    const handleBackToDashboard = () => {
        navigate("/users");
    };

    return (
        <div className="flex w-full">
            <Sidebar />
            <div className="w-full md:w-3/4 min-h-screen p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">
                        Profile of {user.firstName} {user.lastName}
                    </h1>
                    <button
                        className="text-lg text-white bg-indigo-600 px-4 py-2 rounded"
                        onClick={handleBackToDashboard}
                    >
                        Back to Dashboard
                    </button>
                </div>
                <div className="flex flex-col md:flex-row items-start mb-8">
                    <img
                        src={user.image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8"
                    />
                    <div>
                        <p className="text-lg">
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p className="text-lg">
                            <strong>Phone:</strong> {user.phone}
                        </p>
                        <p className="text-lg">
                            <strong>Address:</strong> {user.address.address},{" "}
                            {user.address.city}, {user.address.state},{" "}
                            {user.address.country}
                        </p>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold mb-4">
                    Additional Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p>
                        <strong>Gender:</strong> {user.gender}
                    </p>
                    <p>
                        <strong>Age:</strong> {user.age}
                    </p>
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>
                    <p>
                        <strong>Birth Date:</strong> {user.birthDate}
                    </p>
                    <p>
                        <strong>Blood Group:</strong> {user.bloodGroup}
                    </p>
                    <p>
                        <strong>Height:</strong> {user.height}
                    </p>
                    <p>
                        <strong>Weight:</strong> {user.weight}
                    </p>
                    <p>
                        <strong>Eye Color:</strong> {user.eyeColor}
                    </p>
                    <p>
                        <strong>Hair:</strong> {user.hair.color},{" "}
                        {user.hair.type}
                    </p>
                    <p>
                        <strong>IP Address:</strong> {user.ip}
                    </p>
                    <p>
                        <strong>MAC Address:</strong> {user.macAddress}
                    </p>
                    <p>
                        <strong>University:</strong> {user.university}
                    </p>
                    <p>
                        <strong>Bank Details:</strong> {user.bank.cardNumber} (
                        {user.bank.cardType})
                    </p>
                    <p>
                        <strong>Company:</strong> {user.company.name},{" "}
                        {user.company.department}, {user.company.title}
                    </p>
                    <p>
                        <strong>EIN:</strong> {user.ein}
                    </p>
                    <p>
                        <strong>SSN:</strong> {user.ssn}
                    </p>
                    <p>
                        <strong>User Agent:</strong> {user.userAgent}
                    </p>
                    <p>
                        <strong>Crypto Wallet:</strong> {user.crypto.wallet} (
                        {user.crypto.coin} on {user.crypto.network})
                    </p>
                    <p>
                        <strong>Role:</strong> {user.role}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
