import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AIChatBot from './AIChatBot';

const Layout = () => {
    return (
        <div className="flex h-screen bg-background-dark overflow-hidden">
            <div style={{ zoom: 0.9 }} className="flex-shrink-0">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto w-full relative bg-background-dark">
                <main style={{ zoom: 0.75 }} className="flex-1 w-full mx-auto relative h-full overflow-y-auto">
                    <Outlet />
                </main>
            </div>
            <AIChatBot />
        </div>
    );
};

export default Layout;
