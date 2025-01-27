import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SimpleButton from '../../components/Buttons/SimpleButton';
import ItemsActionsTable from '../../components/Tables/ItemsActionsTable';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { Room } from '../../types/room';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import ConfirmToast from '../../components/ConfirmToast';
import { toast } from 'react-toastify';
import { updateRoomStatus } from '../../redux/roomsSlice';

const Rooms = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleCreateRoom = () => {
        navigate('/rooms/create');
    };
    const rooms = useSelector((state: RootState) => state.rooms.rooms);
    const parsedRooms = (room: Room) => {
        return {
            id: room?.id,
            type: room.type,
            hotelName: room?.hotelName,
            beds: room?.bedrooms,
            guests: room?.guests,
            status: room?.status ?? '-',
            basePrice: `${room?.basePrice ? '$' + room?.basePrice : '-'} / night`,
        };
    }
    const headers = [
        { key: 'hotelName', title: 'Hotel' },
        { key: 'type', title: 'Type' },
        { key: 'beds', title: 'Beds' },
        { key: 'guests', title: 'Guests' },
        { key: 'status', title: 'Status' },
        { key: 'basePrice', title: 'Base Price' },
    ]
    const getActions = (room: Room) => [
        {
            label: room.status === 'enable' ? 'Disable' : 'Enable',
            onClick: (hotel: Room) => {
                const newStatus = hotel.status === 'enable' ? 'disable' : 'enable';
                // Crear un ID único para el toast de confirmación
                const confirmToastId = toast(
                    <ConfirmToast
                        message={`Are you sure you want to ${room.status === 'enable' ? 'disable' : 'enable'} this Room?`}
                        onConfirm={() => {
                            // Actualizar el estado del hotel
                            dispatch(updateRoomStatus({ id: hotel.id, status: newStatus }));

                            // Mostrar el toast de éxito
                            toast.success(`Room is now ${newStatus}`, {
                                autoClose: 2000, // Duración de 5 segundos
                            });

                            // Cerrar específicamente el toast de confirmación
                            toast.dismiss(confirmToastId);
                        }}
                        onCancel={() => {
                            // Cerrar únicamente el toast de confirmación
                            toast.dismiss(confirmToastId);
                        }}
                    />,
                    {
                        position: "top-center",
                        autoClose: false, // Mantener el toast hasta que se confirme o cancele
                        closeOnClick: false,
                        draggable: false,
                    }
                );
            },
            icon: <FontAwesomeIcon icon={room.status === 'enable' ? faCircleXmark : faCircleCheck} />,
        },
        {
            label: 'Details',
            onClick: (room: Room) => {
                navigate(`/rooms/details/${room?.id}`);
            },
            icon: <FontAwesomeIcon icon={faInfoCircle} />,
        }
    ];
    return (
        <>
            <Breadcrumb pageName="Rooms" />
            <div className="flex justify-end mb-4">
                <SimpleButton onClick={handleCreateRoom}>
                    <FontAwesomeIcon icon={faPlus} />
                    Create Room
                </SimpleButton>
            </div>
            <ItemsActionsTable
                data={rooms}
                parsed={parsedRooms}
                headers={headers}
                actions={getActions}
            />
        </>
    );
};

export default Rooms;
