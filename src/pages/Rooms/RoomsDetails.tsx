import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Room } from '../../types/room';
import SimpleButton from '../../components/Buttons/SimpleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const RoomDetails: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    const room = useSelector((state: RootState) => state.rooms.rooms.find((room: Room) => room.id === roomId));
    const handleEditRoom = () => {
        navigate(`/rooms/edit/${room?.id}`);
    }
    if (!room) {
        return <div>Room not found</div>;
    }
    console.log(room);
    return (
        <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="p-6.5">
                    
                    <div className="flex mb-4.5">
                        <SimpleButton onClick={() => navigate(-1)}>
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                            Back
                        </SimpleButton>
                        <div className="ml-auto">
                        <SimpleButton onClick={handleEditRoom}>Edit Room</SimpleButton>
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Room Type
                            </label>
                            <div className="w-full font-bold rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:text-white">
                                {room.type}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Hotel Name
                            </label>
                            <div className="w-full font-bold rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:text-white">
                                {room.hotelName}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Status
                            </label>
                            <div className="w-full font-bold rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:text-white">
                                {room.status}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Bedrooms
                            </label>
                            <div className="w-full font-bold rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:text-white">
                                {room.bedrooms}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Guests
                            </label>
                            <div className="w-full font-bold rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:text-white">
                                {room.guests}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Base Price
                            </label>
                            <div className="w-full font-bold rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:text-white">
                                {'$' +(room.basePrice ?? '-') }
                            </div>
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Taxes
                            </label>
                            <div className="w-full font-bold rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:text-white">
                                {room.taxes ? `${room.taxes} %` : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;