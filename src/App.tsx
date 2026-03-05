import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import PermitDetail from './pages/PermitDetail';
import Gantt from './pages/Gantt';
import ProjectDetail from './pages/ProjectDetail';
import Commitments from './pages/Commitments';
import Calendar from './pages/Calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path="tracker/:id" element={<PermitDetail />} />
          <Route path="gantt" element={<Gantt />} />
          <Route path="gantt/:id" element={<ProjectDetail />} />
          <Route path="commitments" element={<Commitments />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
