import ShoutOut from "../model/ShoutOut";
import "./ShoutoutCard.css"

interface Props {
  shout: ShoutOut;
  onDelete: () => void;
}

function ShoutoutCard({ shout, onDelete }: Props) {
  return (
    <div className="CardBox">
    <div className="ShoutoutCard">
        <p>
        <h3>Shout out to {shout.to}</h3>
        </p>
        <p className="From">- from {shout.from}</p>
        <p>{shout.message}</p>
        { !!shout.profilePhoto && <p>
        <img src={shout.profilePhoto} alt=""/>
      </p> }
        <button onClick={onDelete}>Delete</button>
    </div>
    </div>
  );
}

export default ShoutoutCard;