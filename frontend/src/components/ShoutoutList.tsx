import React, { useEffect, useState } from "react";
import ShoutOut from "../model/ShoutOut";
import { createShout, readAllShouts } from "../service/ShoutoutApiService";
import ShoutoutCard from "./ShoutoutCard";
import ShoutoutForm from "./ShoutoutForm";

function ShoutoutList() {
  const [ shouts, setShouts ] = useState<ShoutOut[]>([]);
  const [ shoutsLoaded, setShoutsLoaded ] = useState(false);

  useEffect(() => {
    loadShouts();
  }, []);

  function loadShouts() {
    readAllShouts().then(shoutsFromApi => {
        setShouts(shoutsFromApi);
        setShoutsLoaded(true);
    });
  }

  function handleAddShout(shout: ShoutOut): void {
    createShout(shout).then(loadShouts);
  }

    return(
        <div className="ShoutoutList">
        { !shoutsLoaded ?
            <p className="ShoutoutList__message">Loading...</p>
          : shouts.length === 0 ?
            <p className="ShoutoutList__message">No Students</p>
          :
          shouts.map(eachShout => 
              <ShoutoutCard key={eachShout._id} shout={eachShout}/>)
              }
        <ShoutoutForm onSubmit={handleAddShout}/>
      </div>
    )
}

export default ShoutoutList;