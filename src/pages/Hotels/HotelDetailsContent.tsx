import React from 'react';
import "react-country-state-city/dist/react-country-state-city.css";
import { Hotel } from '../../types/hotel';
import SimpleButton from '../../components/Buttons/SimpleButton';
import { useNavigate } from 'react-router-dom';

interface DetailsContentProps {
    hotel: Hotel
}
const DetailsContent: React.FC<DetailsContentProps> = ({ hotel }) => {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/hotels/edit/${hotel.id}`);
    }
    return (
        <div className="p-6.5">
            <div className="flex flex-end justify-end">
                <SimpleButton onClick={handleEdit}>Edit Hotel</SimpleButton>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Hotel Name
                    </label>
                    <div className="w-full font-bold rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:text-white">
                        {hotel.name}
                    </div>
                </div>
            </div>
            { hotel?.country && 
                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Country
                    </label>
                    <div className="w-full font-bold rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:text-white">
                        {hotel?.country && hotel?.country.name}
                    </div>
                </div>
            }
            { hotel?.state && <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                    State
                </label>
                <div className="w-full font-bold rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:text-white">
                    {hotel?.state.name}
                </div>
            </div>}
            { hotel?.city && <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                    City
                </label>
                <div className="w-full font-bold rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:text-white">
                    {hotel?.city.name}
                </div>
            </div>}
        </div>
    )
};

export default DetailsContent;