import React from 'react';
import roomImage from '../assets/images/roomImage.jpg';
import { Room } from '../types/room';
import { Hotel } from '../types/hotel';
import { SearchParams } from '../types/searchParams';
import { useNavigate } from 'react-router-dom';

interface RoomProps {
    room: Room & {hotel?: Hotel}
    searchParams: SearchParams
}

const RoomCard: React.FC<RoomProps> = ({ room, searchParams }) => {
    const navigate = useNavigate();
    const handleBookNow= (roomId: string, hotelId: string) => {
        navigate(`/booking/hotel/${hotelId}/room/${roomId}`);
    }
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl">
            {/* Image Section */}
            <div className="relative">
                <img
                    src={roomImage}
                    alt="Room"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded">
                    View
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Room Type */}
                <h2 className="text-xl font-semibold text-gray-800">{room?.type}</h2>

                {/* Room Details */}
                <p className="text-gray-500 mt-2">
                    <span className="font-medium text-gray-700">Hotel</span> {room?.hotel?.name} 
                </p>
                { !searchParams?.country &&
                    <p className="text-gray-500 mt-2">
                        <span className="font-medium text-gray-700">Country</span> {room?.hotel?.country?.name} 
                    </p>
                }
                <p className="text-gray-500 mt-2">
                    <span className="font-medium text-gray-700">Price:</span> {room?.basePrice} USD
                </p>
                {/* beds */}
                <p className="text-gray-500">
                    <span className="font-medium text-gray-700">Beds:</span> {room?.bedrooms}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-end items-center mt-4">
                    
                    <button
                        onClick={() => handleBookNow(room.id, room?.hotel?.id ?? '')}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition">
                        Book now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
