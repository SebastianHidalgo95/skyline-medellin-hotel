import SimpleButton from "../../components/Buttons/SimpleButton";
import { Room } from "../../types/room";
import ItemsActionsTable from "../../components/Tables/ItemsActionsTable";
import { useNavigate } from "react-router-dom";
import { Hotel } from "../../types/hotel";
import { toast } from "react-toastify";
import ConfirmToast from "../../components/ConfirmToast";
import { useDispatch, useSelector } from "react-redux";
import { updateRoomStatus } from "../../redux/roomsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleCheck, faCircleXmark, faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../redux/store";

interface RoomsContentProps {
    hotel: Hotel;
}
const RoomsContent = ({hotel}: RoomsContentProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const roomsList = useSelector((state: RootState) => state.rooms.rooms);
    const roomsInCurrentHotelData = roomsList.filter(room => room.hotelId === hotel?.id);
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
    const handleCreateRoom = () => {
        navigate(`/rooms/create/${hotel?.id}`);
    }
    const getActions = (room: Room) => [
        {
            label: room.status === 'enable' ? 'Disable' : 'Enable',
            onClick: (room: Room) => {
                const newStatus = room.status === 'enable' ? 'disable' : 'enable';
                // Crear un ID único para el toast de confirmación
                const confirmToastId = toast(
                    <ConfirmToast
                        message={`Are you sure you want to ${room.status === 'enable' ? 'disable' : 'enable'} this Room?`}
                        onConfirm={() => {
                            // Actualizar el estado del hotel
                            dispatch(updateRoomStatus({ id: room.id, status: newStatus }));

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
    return(
        <>
            <div className="flex flex-end justify-end mb-4">
                <SimpleButton onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back
                </SimpleButton>
                <div className="ml-auto">
                    <SimpleButton onClick={handleCreateRoom}>
                        <FontAwesomeIcon icon={faPlus} className="mr-2"/>
                        Create Room
                    </SimpleButton>
                </div>
            </div>
            <ItemsActionsTable 
                data={roomsInCurrentHotelData}
                headers={headers}
                parsed={parsedRooms}
                actions={getActions}
            />
        </>
    )
};

export default RoomsContent;