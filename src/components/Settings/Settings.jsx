import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TimerContext } from 'context/TimerContext';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Settings = () => {
  const navigate = useNavigate();

  const { handleSubmit, setUserTimers, userTimers, getUserTimers } =
    useContext(TimerContext);

  useEffect(() => {
    getUserTimers();
  }, []);

  return (
    <div className="flex flex-col p-4 justify-around items-center bg-zinc-900 h-screen w-full">
      <div>
        <FontAwesomeIcon
          onClick={() => {
            navigate(-1);
          }}
          className="h-12 aspect-square fixed top-4 left-2 text-white"
          icon={faChevronLeft}
        />
      </div>

      <form
        className="flex flex-col gap-1 w-full items-center"
        onSubmit={(e) => handleSubmit(e)}
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
                value={`${userTimers[0]}/${userTimers[1]}`}
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
