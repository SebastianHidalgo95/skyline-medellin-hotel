import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ReservationSuccess: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 w-16 h-16 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Reservation Successful!</h2>
                <p className="text-gray-600 mb-4">
                    Your reservation has been completed. Please check your email for confirmation details.
                </p>
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                    onClick={() => navigate('/')}
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default ReservationSuccess;