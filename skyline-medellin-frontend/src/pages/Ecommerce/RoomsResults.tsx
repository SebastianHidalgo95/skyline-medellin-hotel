import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import RoomCard from '../../components/RoomCard';

const RoomsResults = () => {
    const navigate = useNavigate();
    const searchParams = useSelector((state: RootState) => state.reservation.searchParams);
    const rooms = useSelector((state: RootState) => state.rooms.rooms);
    const hotels = useSelector((state: RootState) => state.hotels.hotels);

    // Add hotel information to each room
    const roomsWithHotel = rooms.map(room => {
        const hotel = hotels.find(hotel => hotel.id === room.hotelId);
        return {
            ...room,
            hotel,
        };
    });

    // Filter rooms by search params
    const filteredRooms = roomsWithHotel
    ?.filter(room => {
        // Filtrar por país si existe en los parámetros de búsqueda
        if (searchParams?.country?.id) {
            return room?.hotel?.country?.id === searchParams?.country.id;
        }
        return true;
    })
    ?.filter(room => {
        // Filtrar por número de huéspedes si está definido en los parámetros de búsqueda
        if (searchParams?.guests && room?.guests) {
            return room?.guests >= searchParams?.guests;
        }
        return true;
    });

    return (
        <div className="container mx-auto py-8 px-4">
            {/* Header Section */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition"
                >
                    Back
                </button>
                <h1 className="text-2xl font-bold text-gray-800 ml-12">Available Rooms</h1>
            </div>

            {/* Room Cards Grid */}
            {filteredRooms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredRooms.map(room => (
                        <RoomCard key={room.id} room={room} searchParams={searchParams}/>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center mt-10">
                    No rooms match your search criteria. Please try again.
                </p>
            )}
        </div>
    );
};

export default RoomsResults;
