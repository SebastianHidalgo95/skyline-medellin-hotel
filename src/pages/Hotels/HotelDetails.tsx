import "react-country-state-city/dist/react-country-state-city.css";
import TabPanel from '../../components/Tables/TabPanel';
import RoomsContent from './HotelRoomsContent';
import DetailsContent from './HotelDetailsContent';
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const DetailHotel = () => {
    
    

    // get the id from the url
    const { hotelId } = useParams<{ hotelId: string }>();
    // find the hotel by id from the hotels array in redux store
    const hotel = useSelector((state: RootState) => state.hotels.hotels.find(hotel => hotel.id === hotelId));
    if (!hotel) {
        return <div>Hotel not found</div>;
      }
    return (
        <div>
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <TabPanel
                        tabs={[
                            { label: 'Details', content: <DetailsContent hotel={hotel}/>},
                            { label: 'Rooms', content: <RoomsContent hotel={hotel}/>},
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailHotel;