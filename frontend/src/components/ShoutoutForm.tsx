import { FormEvent, useState } from "react";
import ShoutOut from "../model/ShoutOut";
import "./ShoutoutForm.css";

interface Props {
  onSubmit: (shout: ShoutOut) => void;
}

function ShoutoutForm({ onSubmit }: Props) {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    const shout: ShoutOut = {
      to: to,
      from: from,
      message: message,
    };
    onSubmit(shout);
    setTo("");
    setFrom("");
    setMessage("");
  }

  return (
    <form className="ShoutoutForm" onSubmit={handleSubmit}>
      <p>
        <h2>Leave a Shout Out</h2>
      </p>
      <p>
        <label><h3>To:{"  "}</h3></label>
        <input value={to} onChange={(e) => setTo(e.target.value)} required />
      </p>
      <p>
        <label><h3>From:{"  "}</h3></label>
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </p>
      <p>
        <label><h3>Message:{"  "}</h3></label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required></textarea> 
      </p>
      <p>
        <button type="submit">Shout it Out!</button>
      </p>
    </form>
  );
}

export default ShoutoutForm;
