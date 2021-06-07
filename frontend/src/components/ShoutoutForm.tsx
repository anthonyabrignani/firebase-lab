import { FormEvent, useRef, useState } from "react";
import ShoutOut from "../model/ShoutOut";
import "./ShoutoutForm.css";
import firebase from "../firebaseConfig";

interface Props {
  onSubmit: (shout: ShoutOut) => void;
}

function ShoutoutForm({ onSubmit }: Props) {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const photoInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    const shout: ShoutOut = {
      to: to,
      from: from,
      message: message,
    };

    const files = photoInputRef.current?.files;
    if (files && files[0]) {
      const photoFile = files[0];
      console.log(photoFile);

      const rootFolder = firebase.storage().ref();
      const profilePhotosFolder = rootFolder.child("profile-photos");
      profilePhotosFolder
        .child(photoFile.name)
        .put(photoFile)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            shout.profilePhoto = url;
            onSubmit(shout);
            clearForm();
          });
        });
    } else {
      onSubmit(shout);
      clearForm();
    }
  }

  function clearForm() {
    setTo("");
    setFrom("");
    setMessage("");
    formRef.current?.reset();
  }

  return (
    <form className="ShoutoutForm" onSubmit={handleSubmit}>
      <p>
        <h2>Leave a Shout Out</h2>
      </p>
      <p>
        <label>
          <h3>To:{"  "}</h3>
        </label>
        <input value={to} onChange={(e) => setTo(e.target.value)} required />
      </p>
      <p>
        <label>
          <h3>From:{"  "}</h3>
        </label>
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </p>
      <p>
        <label>
          <h3>Message:{"  "}</h3>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          cols={50}
          required
        ></textarea>
      </p>
      <p>
        <label><h3>Profile Photo{"  "}</h3></label>
        <input type="file" ref={photoInputRef} />
      </p>
      <p>
        <button type="submit">Shout it Out!</button>
      </p>
    </form>
  );
}

export default ShoutoutForm;
