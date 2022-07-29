import { Link } from 'react-router-dom';

export const InitialPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-teal-900">
      <Link to="/settings">
        <img
          className="h-12 aspect-square fixed top-1 right-1"
          src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png"
        />
      </Link>

      <button className="bg-red-600 p-4 h-1/4 aspect-square text-slate-200 rounded-full shadow-md shadow-red-900 transition-all ease-in-out font-bold active:translate-y-1 active:shadow-transparent">
        Start
      </button>
    </div>
  );
};
