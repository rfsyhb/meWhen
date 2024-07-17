import { Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading.tsx';

function App() {
  const Timer = lazy(() => import('./components/Timer.tsx'));
  const Setting = lazy(() => import('./components/Setting.tsx'));
  const History = lazy(() => import('./components/History.tsx'));
  const Login = lazy(() => import('./components/Login.tsx'));
  const Register = lazy(() => import('./components/Register.tsx'));

  return (
    <div className="flex justify-center items-center h-screen text-text">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Timer />
            </Suspense>
          }
        />
        <Route
          path="/setting"
          element={
            <Suspense fallback={<Loading />}>
              <Setting />
            </Suspense>
          }
        />
        <Route
          path="/history"
          element={
            <Suspense fallback={<Loading />}>
              <History />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
