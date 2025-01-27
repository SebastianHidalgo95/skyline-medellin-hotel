import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { Room } from '../../types/room';
import GuestCard from '../../components/GuestCard';
import { Guest } from '../../types/guest';
import { addReservation } from '../../redux/reservationSlice';
import { sendEmailService } from '../../services/emailService';
interface EmergencyContact {
    fullName: string;
    phone: string;
}

const BookingForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { roomId, hotelId } = useParams<{ hotelId: string, roomId: string }>();
    const currentRoom = useSelector((state: RootState) => state.rooms.rooms.find((room: Room) => room.id === roomId));
    const [guests, setGuests] = useState<Guest[]>(() => {
        return Array.from({ length: currentRoom?.guests || 0 }, () => ({
            firstName: '',
            lastName: '',
            dob: '',
            gender: '',
            docType: '',
            docNumber: '',
            email: '',
            phone: ''
        }));
    });
    const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>({ fullName: '', phone: '' });
    const searchParams = useSelector((state: RootState) => state.reservation.searchParams);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //
        const reservationCode = Math.floor(Math.random() * 900000)
        const reservation = {
            guests,
            hotelId,
            roomId,
            checkOutDate: searchParams.checkOutDate,
            checkInDate: searchParams.checkInDate,
            reservationCode
        }
        dispatch(addReservation(reservation))
        guests.forEach(guest => {
            if (guest?.email) {
                console.log(guest)
                const templateParams = {
                    to_email: guest?.email,
                    subject: 'Hotel Reservation',
                    message: `Room reservation Info.`,
                    guest_name: guest?.firstName,
                    check_in_date: searchParams?.checkInDate ?? '',
                    check_out_date: searchParams?.checkOutDate ?? '',
                    room_type: currentRoom?.type ?? '',
                    guest: currentRoom?.guests ?? ''
                };
                sendEmailService(templateParams as Record<string, string>)
            }
        });

        navigate('/confirmation');
    };

    const handleGuestChange = (index: number, field: string, value: string) => {
        const updatedGuests = [...guests];
        updatedGuests[index][field as keyof Guest] = value;
        setGuests(updatedGuests);
    };


    const handleEmergencyContactChange = (field: keyof EmergencyContact, value: string) => {
        setEmergencyContact({ ...emergencyContact, [field]: value });
    };
    const [activeTab, setActiveTab] = useState<number>(0); // Mantener la pestaña activa

    const handleTabChange = (index: number) => {
        setActiveTab(index);
    };


    return (
        <div className="flex w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            {/* Lado izquierdo: Pestañas */}
            <div className="w-1/4 border-r border-gray-300 pr-4">
                <h3 className="text-xl font-semibold mb-4">Huéspedes</h3>
                <div className="flex flex-col space-y-2">
                    {guests.map((_, index) => (
                        <button
                            type="button"
                            key={index}
                            className={`py-2 px-4 text-left w-full ${activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                            onClick={() => handleTabChange(index)}
                        >
                            Huésped {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Lado derecho: Formulario */}
            <div className="w-3/4 pl-6">
                <h2 className="text-2xl font-semibold mb-6 text-center">Formulario de Reserva</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Formulario de Huésped */}
                    {guests.map((guest, index) => (
                        <GuestCard
                            index={index}
                            guest={guest}
                            activeTab={activeTab}
                            handleGuestChange={handleGuestChange}
                            key={index}
                        />
                    ))}

                    {/* Información de Contacto de Emergencia */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Contacto de Emergencia</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Nombres completos"
                                value={emergencyContact.fullName}
                                onChange={(e) => handleEmergencyContactChange('fullName', e.target.value)}
                                className="border border-gray-300 p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Teléfono de contacto"
                                value={emergencyContact.phone}
                                onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                                className="border border-gray-300 p-2 rounded"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
                        Finalizar Reserva
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
