import React from "react";
import { useNavigate } from "react-router";

const Welcome: React.FC = () => {
    const navigate = useNavigate()
    const handleBookingClick = () => {
        navigate('/search')
        // Navigate to the booking page or handle booking logic
    };

    const handleManagementClick = () => {
        navigate('/hotels')
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">Welcome</h1>
            <div className="flex space-x-4">
                <button
                    onClick={handleBookingClick}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Booking
                </button>
                <button
                    onClick={handleManagementClick}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Management
                </button>
            </div>
        </div>
    );
};

export default Welcome;
