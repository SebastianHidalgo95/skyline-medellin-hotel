import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import RoomCard from '../../components/RoomCard';
import SimpleButton from '../../components/Buttons/SimpleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
            console.log('aqui', room)
            return (room?.status == 'enabled' && room?.hotel?.status == 'enabled')
        })
        ?.filter(room => {
            console.log('aqui 2', room)
            // Filtrar por país si existe en los parámetros de búsqueda
            if (searchParams?.country?.id) {
                return (room?.hotel?.country?.id === searchParams?.country?.id);
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
                <SimpleButton onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back
                </SimpleButton>
                <h1 className="text-2xl font-bold text-gray-800 ml-12">Available Rooms</h1>
            </div>

            {/* Room Cards Grid */}
            {filteredRooms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredRooms.map(room => (
                        <RoomCard key={room.id} room={room} searchParams={searchParams} />
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
