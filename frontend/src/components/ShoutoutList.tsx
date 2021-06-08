import React, { useEffect, useState, useContext } from "react";
import ShoutOut from "../model/ShoutOut";
import {
  createShout,
  deleteShout,
  readAllShouts,
} from "../service/ShoutoutApiService";
import ShoutoutCard from "./ShoutoutCard";
import ShoutoutForm from "./ShoutoutForm";
import { AuthContext } from "../context/auth-context";
import { signInWithGoogle } from "../firebaseConfig";

function ShoutoutList() {
  const [shouts, setShouts] = useState<ShoutOut[]>([]);
  const [shoutsLoaded, setShoutsLoaded] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadShouts();
  }, []);

  function loadShouts() {
    readAllShouts().then((shoutsFromApi) => {
      setShouts(shoutsFromApi);
      setShoutsLoaded(true);
    });
  }

  function handleAddShout(shout: ShoutOut): void {
    createShout(shout).then(loadShouts);
  }

  function handleDeleteShout(shoutId: string): void {
    deleteShout(shoutId).then(loadShouts);
  }

  return (
    <div className="ShoutoutList">
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

export default ShoutoutList;
