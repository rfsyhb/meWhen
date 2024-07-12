import History from './components/History';
import Setting from './components/Setting';
import Timer from './components/Timer';

function App() {
  // justify-center untuk x-axis, items-center untuk y-axis
  return (
    <div className="flex justify-center items-center h-screen text-text">
      <Timer />
    </div>
  );
}

export default App;
