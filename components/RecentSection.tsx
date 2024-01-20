import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const RecentSection = async () => {

  return (
    <div className="flex xl:flex-row flex-col">
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default RecentSection;
