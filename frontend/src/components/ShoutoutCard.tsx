import ShoutOut from "../model/ShoutOut";
import "./ShoutoutCard.css"

interface Props {
  shout: ShoutOut;
  onDelete: () => void;
}

function ShoutoutCard({ shout, onDelete }: Props) {
  return (
    <div className="ShoutoutCard">
        <p>
        <h3>Shout out to {shout.to}</h3>
        </p>
        <p className="From">- from {shout.from}</p>
        <p>{shout.message}</p>
        <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default ShoutoutCard;