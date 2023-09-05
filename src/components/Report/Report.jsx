import React from "react";
import { useParams } from "react-router-dom";
import GaugeChart from "react-gauge-chart";
import "./Report.scss";

const Report = () => {
  const { id } = useParams();
  console.log(id, "id");

  const handlePrint = () => {
    window.print();
  };

  const chartStyle = {
    height: 450,
    width : 550
  }

  return (
    <div className="report">
      <button onClick={handlePrint}>Print</button>
      <div className="header">
        <h4>CREDIT BUREAU INFORMATION CBI</h4>
      </div>
      <GaugeChart
        id="gauge-chart1"
        nrOfLevels={3}
        colors={["#FF5F6D", "#FFC371","#b5ff38"]}
        arcWidth={0.35}
        percent={0.750}
        style={chartStyle}
        marginInPercent={0.03}
        formatTextValue={value => "750"}
        animateDuration={3000}
        animDelay={3000}
        animate={true}
        arcsLength={[1,2,1]}
        needleBaseColor={"#464A4"}
        cornerRadius={10}
      />
    </div>
  );
};

export default Report;
