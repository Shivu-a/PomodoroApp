import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Settings = () => {
  const navigate = useNavigate();

  const [userTimers, setUserTimers] = useState([]);

  const getUserTimers = async () => {
    const timer = await window.electron.requestTimers('Requesting user timers');
    setUserTimers(await timer);
  };

  useEffect(() => {
    getUserTimers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let selectedOption = e.target.children[0].value;
    let userSelection = selectedOption.split('/');
    window.electron.setUserSelectedTimer(userSelection, userSelection);
  };

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

      <form
        className="flex flex-col gap-1 w-full items-center"
        onSubmit={handleSubmit}
      >
        <select
          className="w-2/4 p-2 rounded-sm focus-visible:outline-none focus:outline-none"
          name="timer"
          id="timer"
        >
          <optgroup label="Preset Timers">
            <option className="p-4 " value="20/5">
              20/5
            </option>
            <option className="p-4 " value="30/10">
              30/10
            </option>
            <option className="p-4 " value="40/20">
              40/20
            </option>
          </optgroup>

          {userTimers && (
            <optgroup label="User Timers">
              <option
                value={userTimers}
              >{`${userTimers[0]}/${userTimers[1]}`}</option>
            </optgroup>
          )}
        </select>

        <button
          type="submit"
          className="p-4 px-8 bg-green-400 rounded-md font-semibold"
        >
          Set
        </button>
      </form>

      <Link
        className="p-4 px-8 bg-slate-900  text-white rounded-lg"
        to={'/configure'}
      >
        Configure
      </Link>
    </div>
  );
};
