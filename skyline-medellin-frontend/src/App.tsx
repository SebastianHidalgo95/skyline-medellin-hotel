import { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Hotels from './pages/Hotels/Hotels';
import DefaultLayout from './layout/DefaultLayout';
import CreateHotel from './pages/Hotels/HotelForm';
import DetailHotel from './pages/Hotels/HotelDetails';
import RoomsForm from './pages/Rooms/RoomsForm';
import Rooms from './pages/Rooms/Rooms';
import RoomDetails from './pages/Rooms/RoomsDetails';
import ECommerceLayout from './layout/EcommerceLayout';
import HotelSearch from './pages/Ecommerce/HotelSearch';
import RoomsResults from './pages/Ecommerce/RoomsResults';
import BookingForm from './pages/Ecommerce/BookRoom';
import ReservationSuccess from './pages/Ecommerce/SuccessReservation';

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const { pathname } = useLocation();

    // Ensure that the page scrolls to the top when the route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <Routes>
            <Route element={
                <DefaultLayout>
                    <Outlet />
                </DefaultLayout>}>
                
                <Route
                    path="/rooms"
                    element={
                        <>
                            <PageTitle title="Skyline | Hotels" />
                            <Rooms />
                        </>
                    }
                />
                <Route
                    path='/rooms/create/:hotelId?'
                    element={
                        <>
                            <PageTitle title="Skyline | Create Room" />
                            <RoomsForm />
                        </>
                    }
                />
                <Route
                    path='/rooms/details/:roomId?'
                    element={
                        <>
                            <PageTitle title="Skyline | Room" />
                            <RoomDetails />
                        </>
                    }
                />
                <Route
                    path='/rooms/edit/:roomId?'
                    element={
                        <>
                            <PageTitle title="Skyline | Update Room" />
                            <RoomsForm />
                        </>
                    }
                />
                <Route
                    path="/hotels"
                    element={
                        <>
                            <PageTitle title="Skyline | Hotels" />
                            <Hotels />
                        </>
                    }
                />
                <Route
                    path="/hotels/create-hotel"
                    element={
                        <>
                            <PageTitle title="Skyline | Create Hotel" />
                            <CreateHotel />
                        </>
                    }
                />
                <Route
                    path="/hotels/details/:hotelId"
                    element={
                        <>
                            <PageTitle title="Skyline | Hotel Details" />
                            <DetailHotel />
                        </>
                    }
                />
                <Route
                    path="/hotels/edit/:hotelId"
                    element={
                        <>
                            <PageTitle title="Skyline | Edit Hotel" />
                            <CreateHotel />
                        </>
                    }
                />
            </Route>
            <Route element={<ECommerceLayout />}>
                <Route
                    path="/"
                    element={
                        <>
                            <PageTitle title="Skyline | Hotel Search" />
                            <HotelSearch />
                        </>
                    }
                />
                <Route
                    path="/rooms/results"
                    element={
                        <>
                            <PageTitle title="Skyline | Rooms Results" />
                            <RoomsResults />
                        </>
                    }
                />
                <Route
                    path="/booking/hotel/:hotelId/room/:roomId"
                    element={
                        <>
                            <PageTitle title="Skyline | Booking" />
                            <BookingForm />
                        </>
                    }
                />
                <Route
                    path="/confirmation"
                    element={
                        <>
                            <PageTitle title="Skyline | Confirmation" />
                            <ReservationSuccess />
                        </>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
