import ShoutOut from "../model/ShoutOut";
import "./ShoutoutCard.css"

interface Props {
  shout: ShoutOut;
}

function ShoutoutCard({ shout }: Props) {
  return (
    <div className="ShoutoutCard">
        <p>
        <h3>Shout out to {shout.to}</h3>
        </p>
        <p className="From">- from {shout.from}</p>
        <p>{shout.message}</p>
    </div>
  );
}

export default ShoutoutCard;