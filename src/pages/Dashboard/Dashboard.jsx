import { useSelector } from "react-redux";
import InfoBox from "../../components/Analytics/InfoBox";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className="head-title">
        <div className="left">
          <h1>Dashboard Welcome {user?.fullName}</h1>
        </div>
      </div>
      <InfoBox />
    </>
  );
};

export default Dashboard;
