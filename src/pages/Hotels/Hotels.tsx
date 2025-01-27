import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SimpleButton from '../../components/Buttons/SimpleButton';
import ItemsActionsTable from '../../components/Tables/ItemsActionsTable';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { Hotel } from '../../types/hotel';
import { updateHotelStatus } from '../../redux/hotelsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import ConfirmToast from '../../components/ConfirmToast';

const Hotels = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleCreateHotel = () => {
        navigate('/hotels/create-hotel');
    };
    const hotels = useSelector((state: RootState) => state.hotels.hotels);
    const parsedHotels = (hotel: Hotel) => {
        return {
            id: hotel?.id,
            name: hotel.name,
            address: hotel.address,
            country: hotel?.country?.name,
            state: hotel?.state?.name,
            city: hotel?.city?.name,
            email: hotel?.email,
            status: hotel?.status,
        };
    }
    console.log(hotels)
    const headers = [
        { key: 'name', title: 'Name' },
        { key: 'country', title: 'Country' },
        { key: 'state', title: 'State' },
        { key: 'city', title: 'City' },
        { key: 'email', title: 'Email' },
        { key: 'status', title: 'Status' },
    ]
    const getActions = (hotel: Hotel) => [
        {
            label: hotel.status === 'enable' ? 'Disable' : 'Enable',
            onClick: (hotel: Hotel) => {
                const newStatus = hotel.status === 'enable' ? 'disable' : 'enable';
                // This toas is used for confirm and trigger a process on each decition
                const confirmToastId = toast(
                    <ConfirmToast
                        message={`Are you sure you want to ${hotel.status === 'enable' ? 'disable' : 'enable'} this hotel?`}
                        onConfirm={() => {
                            // Update the current hotel status
                            dispatch(updateHotelStatus({ id: hotel.id, status: newStatus }));
                            toast.success(`Hotel ${hotel.name} is now ${newStatus}`, {
                                autoClose: 2000, 
                            });
                            toast.dismiss(confirmToastId);
                        }}
                        onCancel={() => {
                            toast.dismiss(confirmToastId);
                        }}
                    />,
                    {
                        position: "top-center",
                        autoClose: false, 
                        closeOnClick: false,
                        draggable: false,
                    }
                );
            },
            icon: <FontAwesomeIcon icon={hotel.status === 'enable' ? faCircleXmark : faCircleCheck} />,
        },
        {
            label: 'Details',
            onClick: (hotel: any) => {
                navigate(`/hotels/details/${hotel?.id}`);
            },
            icon: <FontAwesomeIcon icon={faInfoCircle} />,
        }
    ];
    return (
        <>
            <Breadcrumb pageName="Hotels" />
            <div className="flex justify-end mb-4">
                <SimpleButton onClick={handleCreateHotel}>
                    <FontAwesomeIcon icon={faPlus} className='mr-2'/>
                    Create Hotel
                </SimpleButton>
            </div>
            <ItemsActionsTable
                data={hotels}
                parsed={parsedHotels}
                headers={headers}
                actions={getActions}
            />
        </>
    );
};

export default Hotels;
