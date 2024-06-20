import { useEffect, useState } from "react";
import "../timeline.css";

interface TimelineProps {
  status: string;
}

const Timeline = (props: TimelineProps) => {
  const { status } = props;
  const [currentStatusIndex, setCurrentStatusIndex] = useState(1);

  const status_map = new Map();
  status_map.set("deposit_initiated", 1);
  status_map.set("payout_initiated", 2);
  status_map.set("payout_confirmed", 3);

  const currentStatus = status_map.get(status);

  const filledIcon =
    "https://img.icons8.com/?size=20&id=123575&format=png&color=213058";
  const emptyIcon =
    "https://img.icons8.com/?size=20&id=XXgza4GSPO7W&format=png&color=213058";

  useEffect(() => {
    const index = status_map.get(status);
    setCurrentStatusIndex(index);
  }, []);

  return (
    <div className="timeline">
      <div>
        <div className="timeline_item">
          <img src={currentStatus >= 1 ? filledIcon : emptyIcon} alt="" />
          <p>We have confirmed your deposit 😎</p>
        </div>
        <div className="timeline_item">
          <img src={currentStatus >= 2 ? filledIcon : emptyIcon} alt="" />
          <p>We just sent out your money🥁</p>
        </div>
        <div className="timeline_item">
          <img src={currentStatus >= 3 ? filledIcon : emptyIcon} alt="" />
          <p>Your money has been successfuly deposited to Tega Akpos🎊</p>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
