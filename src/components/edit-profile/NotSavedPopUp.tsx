export const NotSavedPopUp = ({
  setIsChangesExist,
  setIsSwitchingTab,
}: {
  setIsChangesExist: Function;
  setIsSwitchingTab: Function;
}) => {
  return (
    <div className="fixed left-[0] top-[0] z-40 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-20">
      <div className=" p-auto relative  m-10 flex flex-col items-center justify-around rounded-2xl bg-white p-10">
        <div className="large-text font-bold ">Changes have not been saved</div>
        <div className="small-text m-6 md:m-8 lg:m-10">
          Do you want to leave this tab without saving?
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-x-5">
          <button
            className="medium-text  in-card-button  bg-[#B3B3B3]  "
            onClick={() => {
              setIsSwitchingTab(false);
              setIsChangesExist(true);
            }}
          >
            Cancel
          </button>
          <button
            className="medium-text in-card-button  bg-ci-red "
            onClick={(e) => {
              setIsChangesExist(false);
              setIsSwitchingTab(false);
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
