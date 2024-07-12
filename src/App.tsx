import History from './components/History';
import Login from './components/Login';
import Register from './components/Register';
import Setting from './components/Setting';
import Timer from './components/Timer';

function App() {
  // justify-center untuk x-axis, items-center untuk y-axis
  return (
    <div className="flex justify-center items-center h-screen text-text">
      <Register />
    </div>
  );
}

export default App;
