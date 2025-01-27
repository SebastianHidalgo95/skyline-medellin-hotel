import { Outlet } from 'react-router-dom';

const ECommerceLayout = () => {
    return (
        <div className="container mx-auto p-4">
            <header className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
                <h1 className="text-2xl font-semibold">Booking</h1>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default ECommerceLayout;