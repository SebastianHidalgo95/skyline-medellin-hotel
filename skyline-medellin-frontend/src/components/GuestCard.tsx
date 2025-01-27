
import React from 'react';

interface GuestCardProps {
    index: number;
    guest: {
        firstName: string;
        lastName: string;
        dob: string;
        gender: string;
        docType: string;
        docNumber: string;
        email: string;
        phone: string;
    };
    activeTab: number;
    handleGuestChange: (index: number, field: string, value: string) => void;
}

const GuestCard: React.FC<GuestCardProps> = ({ index, guest, activeTab, handleGuestChange }) => {
    return (
        <div key={index} className={activeTab === index ? 'block' : 'hidden'}>
            <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={guest.firstName}
                        onChange={(e) => handleGuestChange(index, 'firstName', e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        value={guest.lastName}
                        onChange={(e) => handleGuestChange(index, 'lastName', e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="date"
                        placeholder="Fecha de Nacimiento"
                        value={guest.dob}
                        onChange={(e) => handleGuestChange(index, 'dob', e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                    />
                    <select
                        value={guest.gender}
                        onChange={(e) => handleGuestChange(index, 'gender', e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                    >
                        <option value="">Seleccionar Género</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Tipo de Documento"
                        value={guest.docType}
                        onChange={(e) => handleGuestChange(index, 'docType', e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Número de Documento"
                        value={guest.docNumber}
                        onChange={(e) => handleGuestChange(index, 'docNumber', e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={guest.email}
                        onChange={(e) => handleGuestChange(index, 'email', e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Teléfono de Contacto"
                        value={guest.phone}
                        onChange={(e) => handleGuestChange(index, 'phone', e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>
            </div>
        </div>
    );
};

export default GuestCard;