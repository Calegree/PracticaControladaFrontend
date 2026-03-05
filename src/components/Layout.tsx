import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AIChatBot from './AIChatBot';

const Layout = () => {
    return (
        <div className="flex h-screen bg-background-dark overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-y-auto w-full relative bg-background-dark">
                <main className="flex-1 w-full mx-auto relative h-full">
                    <Outlet />
                </main>
            </div>
            <AIChatBot />
        </div>
    );
};

export default Layout;
