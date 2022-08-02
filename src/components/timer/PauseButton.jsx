export const PauseButton = ({ texto, evento }) => {
  return (
    <button
      className={`p-4 aspect-square w-max bg-rose-900 text-warmGray-300 font-bold rounded-full`}
      onClick={evento}
    >
      {texto}
    </button>
  );
};
