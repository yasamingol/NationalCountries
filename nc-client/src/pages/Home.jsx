import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import reactLogo from '../assets/react.svg'
import ncLogo from '/nc-logo.png'
import cat from '/cat.gif'
import '../App.css'

function Home() {
    const navigate = useNavigate();

    let audio = new Audio("/meow.mp3")

    const meow = () => {
      fetch(import.meta.env.VITE_SERVER_DOMAIN + 'users/meow', { 
        method: 'GET', 
      })
      .then(response => {console.log(response)})
      .catch((error) => { 
          console.error('Error:', error); 
      }); 
      audio.play()
    }

    return (
        <>
      <div>
        <title>National Countries</title>
        <h1>National Countries</h1>
          <img src={ncLogo} className="logo" alt="National logo" />
      </div>
      <hr className="separator" />
      {/* <div className="card"> */}
        <button className="btn form-btn" onClick={() => navigate("/register")}>
          Register
        </button>
        <button className="btn form-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <hr className="separator" />
        <img src={cat} className="cat" alt="Cat" onClick={meow}/>
        <p>
          Don't touch the cat!
        </p>
        <footer className="footer">
        <p>&copy; 2024 Mehrad Milanloo - Yasamin Golzar</p>
      </footer>
      {/* </div> */}
    </>
    );
}

export default Home;