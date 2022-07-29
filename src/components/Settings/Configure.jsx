import { Input } from 'components/form/Input';
import { H4Title } from 'components/H4Title';
import { formSubmit } from 'helpers/formSubmit';
import { useNavigate } from 'react-router-dom';

export const Configure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center bg-teal-900 h-screen w-full">
      <div>
        <img
          onClick={() => {
            navigate(-1);
          }}
          className="h-12 aspect-square fixed top-1 left-1 "
          src="https://icons.veryicon.com/png/o/miscellaneous/arrows/go-back-2.png"
        />
      </div>

      <div className="flex justify-center items-center flex-col h-2/3 aspect-square">
        <form
          onSubmit={formSubmit}
          action=""
          className="flex justify-center items-center flex-col"
        >
          <H4Title title={'Time concentrating'} />
          <Input />

          <H4Title title={'Break Time'} />
          <Input />

          <button className="p-4 px-8 bg-green-500 mt-3 rounded-md text-xl font-bold text-stone-900 ">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
