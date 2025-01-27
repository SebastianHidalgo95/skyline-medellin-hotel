import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ItemsActionsTable from '../../components/Tables/ItemsActionsTable';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { Reservation } from '../../types/reservation';

const Reservations = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hotels = useSelector((state: RootState) => state.hotels.hotels);
    const rooms = useSelector((state: RootState) => state.rooms.rooms);
    const reservations = useSelector((state: RootState) => state.reservation.reservations)

    const parsedHotels = (reservation: Reservation) => {
        const hotelReservation = hotels.find(hotel => hotel.id == reservation?.hotelId);
        const roomReservation = rooms. find(room => room?.id == reservation?.roomId)
        return {
            code: reservation?.reservationCode,
            checkInDate: reservation?.checkInDate,
            checkOutDate: reservation?.checkOutDate,
            hotelName: hotelReservation?.name,
            room_type: roomReservation?.type
        };
    }
    const headers = [
        { key: 'code', title: 'Reservation Code' },
        { key: 'checkInDate', title: 'Check-in' },
        { key: 'checkOutDate', title: 'Check-out' },
        { key: 'hotelName', title: 'Hotel' },
        { key: 'room_type', title: 'Room type' },
    ]
    const getActions = (reservation: Reservation) => [
        {
            label: 'Details',
            onClick: (reservation: any) => {
                // navigate(`/reservation/details/${reservation?.id}`);
            },
            icon: <FontAwesomeIcon icon={faInfoCircle} />,
        }
    ];
    return (
        <>
            <Breadcrumb pageName="Reservations" />
            <ItemsActionsTable
                data={reservations}
                parsed={parsedHotels}
                headers={headers}
                actions={getActions}
            />
        </>
    );
};

export default Reservations;
