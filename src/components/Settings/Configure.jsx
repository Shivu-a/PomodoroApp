import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'components/form/Input';
import { H4Title } from 'components/H4Title';
import { useNavigate } from 'react-router-dom';

export const Configure = () => {
  const navigate = useNavigate();

  const deleteTimer = () => {
    window.electron.deleteUserTimer();
  };

  const addTimer = async (e) => {
    e.preventDefault();
    const [firstValue, secondValue] = e.target.querySelectorAll('input');

    const timeConcentrating = firstValue.value;
    const breakTime = secondValue.value;

    const timer = [timeConcentrating, breakTime];

    window.electron.addUserTimer(timer, timer);
  };

  return (
    <div className="flex justify-center items-center bg-zinc-900 h-screen w-full">
      <div>
        <FontAwesomeIcon
          onClick={() => {
            navigate(-1);
          }}
          className="h-12 aspect-square fixed top-4 left-2 text-white"
          icon={faChevronLeft}
        />
      </div>

      <div className="flex justify-center items-center flex-col h-2/3 aspect-square">
        <form
          onSubmit={addTimer}
          action=""
          className="flex justify-center items-center flex-col"
        >
          <H4Title title="Time concentrating" />
          <Input />

          <H4Title title="Break Time" />
          <Input />

          <div>
            <button
              type="button"
              onClick={deleteTimer}
              className="p-4 m-2 px-8 bg-red-700 font-bold text-warmGray-200 rounded-md"
            >
              Delete
            </button>
            <button
              type="submit"
              className="p-4 m-2 px-8 bg-green-500 mt-3 rounded-md font-bold text-stone-900 "
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
