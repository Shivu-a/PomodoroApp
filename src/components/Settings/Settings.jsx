import { Link, useNavigate } from 'react-router-dom';

export const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-4 justify-around items-center bg-teal-900 h-screen w-full">
      <div>
        <img
          onClick={() => {
            navigate(-1);
          }}
          className="h-12 aspect-square fixed top-1 left-1 "
          src="https://icons.veryicon.com/png/o/miscellaneous/arrows/go-back-2.png"
        />
      </div>

      <select className="w-2/4 p-2" name="timer" id="timer">
        <option className="p-4 " value="choose">
          Elige una opcion
        </option>
        <option className="p-4 " value="20/5">
          20/5
        </option>
        <option className="p-4 " value="30/10">
          20/5
        </option>
        <option className="p-4 " value="40/20">
          40/20
        </option>
      </select>

      <Link
        className="p-4 bg-slate-900  text-white rounded-lg"
        to={'/configure'}
      >
        Configure
      </Link>
    </div>
  );
};
