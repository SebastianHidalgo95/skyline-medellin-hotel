import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import { RootState } from '../../redux/store';
import { Room } from '../../types/room';
import { addRoom, updateRoom } from '../../redux/roomsSlice';

import Select from 'react-select';
import { useState } from 'react';
import { Hotel } from '../../types/hotel';
import SimpleButton from '../../components/Buttons/SimpleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const RoomsForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // get the id from the url
    const { roomId, hotelId } = useParams<{ hotelId: string, roomId: string }>();
    const hotels = useSelector((state: RootState) => state.hotels.hotels) ?? [];
    const roomUpdate = useSelector((state: RootState) => state.rooms.rooms.find((room: Room)=> room?.id === roomId));
    const [selectedHotel, setSelectedHotel] = useState<Hotel|undefined>(
        hotels.find((hotel) => hotel.id === (hotelId ?? roomUpdate?.hotelId))
    );
    // TODO: if hotelId is not provided, redirect to hotels page
    const initialValues: Room = roomUpdate ? roomUpdate : {
        id: '',
        status: 'enabled',
        hotelId: hotelId ?? '',
        hotelName: selectedHotel?.name ?? '',
        type: 'basic',
        bedrooms: 1,
        guests: 1,
    };
    const { form: roomForm, setForm:setRoomForm } = useForm<Room>({ initialValues });
    
    const handleSubmitHotel = () => {
        
        const id = roomId ?? Date.now().toString();
        roomId 
            ? dispatch(updateRoom(roomForm))
            : dispatch(addRoom({
                ...roomForm,
                id,
            }));
        navigate(-1);
    };
    
    const parseOptionalNumberInput = (value: string|number) => {
        if ( typeof value === 'number') {
            return value;
        }
        return isNaN(parseInt(value)) ? undefined : parseInt(value);
    }
    const parseOptionalFloatInput = (value: string|number) => {
        if ( typeof value === 'number') {
            return value;
        }
        return isNaN(parseFloat(value)) ? undefined : parseFloat(value);
    }
    return (
        <div>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b text-center border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            {roomId ? 'Room Edition' : 'Room Creation'}
                        </h3>
                        <div className="flex">
                            <SimpleButton onClick={() => navigate(-1)}>
                                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                                Back
                            </SimpleButton>
                        </div>
                    </div>
                    <div>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Hotel
                                </label>
                                {/* add select */}
                                <Select
                                    options={hotels.map((hotel) => ({ value: hotel.id, label: hotel.name })) ?? []}
                                    onChange={(e) => setRoomForm(
                                        (prev) => ({...prev, hotelId: e?.value, hotelName: e?.label}) as Room
                                    )}
                                    value={selectedHotel ? { value: selectedHotel.id, label: selectedHotel.name } : undefined }
                                    isDisabled= {!!hotelId ? true : false}
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Type
                                </label>
                                {/* add select */}
                                <Select
                                    options={[
                                        { value: 'basic', label: 'Basic' },
                                        { value: 'deluxe', label: 'Deluxe' },
                                        { value: 'suite', label: 'Suite' },
                                    ]}
                                    onChange={(e) => {
                                        setRoomForm({ type: e?.value })
                                        setSelectedHotel(hotels.find((hotel) => hotel.id === e?.value))
                                    }}
                                    value={{ value: roomForm?.type, label: roomForm?.type }}
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Bedrooms 
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter room bedrooms"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={(e) => setRoomForm({bedrooms: parseOptionalNumberInput(e.target.value)})}
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Guests 
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter total guests"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={(e) => setRoomForm({
                                        guests: isNaN(parseInt(e.target.value)) ? undefined : parseOptionalNumberInput(e.target.value)
                                    })}
                                    value={roomForm?.guests ?? ''}
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Base Price 
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter base price"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={(e) => setRoomForm({basePrice :parseOptionalFloatInput(e.target.value)})}
                                    value={roomForm?.basePrice ?? ''}
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Taxes
                                </label>
                                <input
                                    max={100}
                                    type="number"
                                    placeholder="Enter base price"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={(e) => setRoomForm({taxes :parseOptionalFloatInput(e.target.value)})}
                                    value={roomForm?.taxes}
                                />
                            </div>
                            <button onClick={handleSubmitHotel} className="flex w-1/3 mx-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                {roomId ? 'Update': 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomsForm;