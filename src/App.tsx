import History from './components/History';
import Login from './components/Login';
import Register from './components/Register';
import Setting from './components/Setting';
import Timer from './components/Timer';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="flex justify-center items-center h-screen text-text">
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
