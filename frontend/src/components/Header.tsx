import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css"

function Header() {
    const { user } = useContext(AuthContext)

    return (
        <header className="Header">
            <h1>All Shout Outs</h1>
            { !user ? <button onClick={signInWithGoogle}>Sign In With Google</button> :
            <button onClick={signOut}>Sign Out</button>}
            { user && <div>
                Welcome {user.displayName}!
                { !!user.photoURL && <img src={user.photoURL} alt="" />}
            </div> }
        </header>
    )
}

export default Header;