export const PauseButton = ({ texto, evento }) => {
  return (
    <button
      className={`p-4 aspect-square w-max bg-slate-900 text-warmGray-300 font-bold rounded-md`}
      onClick={evento}
    >
      {texto}
    </button>
  );
};
