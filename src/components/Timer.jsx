import { useLocation } from 'react-router-dom';

export const Timer = () => {
  const location = useLocation();

  const timer = location.state.timer;

  console.log(timer);

  return (
    <div className="flex w-full h-screen justify-center items-center bg-teal-900">
      Timer
    </div>
  );
};
