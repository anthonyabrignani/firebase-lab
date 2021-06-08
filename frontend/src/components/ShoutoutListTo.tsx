import React, { useEffect, useState, useContext } from "react";
import ShoutOut from "../model/ShoutOut";
import {
  createShout,
  deleteShout,
  readShoutsByName,
} from "../service/ShoutoutApiService";
import ShoutoutCard from "./ShoutoutCard";
import ShoutoutForm from "./ShoutoutForm";
import { AuthContext } from "../context/auth-context";
import { signInWithGoogle } from "../firebaseConfig";
import { useParams } from "react-router-dom";

interface RouteParams {
  to: string;
}

function ShoutoutListTo() {
  const [shouts, setShouts] = useState<ShoutOut[]>([]);
  const [shoutsLoaded, setShoutsLoaded] = useState(false);
  const { user } = useContext(AuthContext);
  const { to } = useParams<RouteParams>();

  useEffect(() => {
    loadShouts(to);
  }, [to]);

  function loadShouts(to: string) {
    readShoutsByName(to).then((shoutsFromApi) => {
      setShouts(shoutsFromApi);
      setShoutsLoaded(true);
    });
  }

  function handleAddShout(shout: ShoutOut): void {
    createShout(shout).then(() => loadShouts(to));
  }

  function handleDeleteShout(shoutId: string): void {
    deleteShout(shoutId).then(() => loadShouts(to));
  }

  return (
    <div className="ShoutoutListTo">
      <div className="Box">
        {!shoutsLoaded ? (
          <p>Loading...</p>
        ) : shouts.length === 0 ? (
          <p>No Shouts for Now :(</p>
        ) : (
          shouts.map((eachShout) => (
            <ShoutoutCard
              key={eachShout._id}
              shout={eachShout}
              onDelete={() => handleDeleteShout(eachShout._id!)}
            />
          ))
        )}
      </div>
      {!user ? (
        <button className="ThatButton" onClick={signInWithGoogle}>Sign In With Google</button>
      ) : (
        <ShoutoutForm onSubmit={handleAddShout} />
      )}
    </div>
  );
}

export default ShoutoutListTo;
