import { Link, useNavigate } from 'react-router-dom';

export const InitialPage = () => {
  const navigate = useNavigate();

  const handleStart = async () => {
    const selectedTimer = await window.electron.getUserSelectedTimer();

    navigate('/timer', {
      replace: true,
      state: { timer: await selectedTimer },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-zinc-900">
      <Link to="/settings">
        <img
          className="h-12 aspect-square fixed top-1 right-1"
          src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png"
        />
      </Link>

      <button
        onClick={handleStart}
        className="bg-red-600 p-4 h-1/4 aspect-square text-slate-200 rounded-full relative transition-all ease-in-out font-bold border-b-8 border-black active:translate-y-1 active:border-transparent"
      >
        Start
      </button>
    </div>
  );
};
