import React from 'react';
import logo from '/edupanda.png'
import { Link } from "react-router-dom";


function App() {   
    return (
        <div className="containers">
            <div className="splits lefts">
                <h2 className='land-name'>EduPanda</h2>



            </div>

            <div className="splits rights">
                <div className="centered">
                    <img className="land-logo" src={logo} alt="Avatar woman" />
                    <h2 className='land-head'>Transforming Education, Together</h2>
                    <p className='land-sub'>Experience a new era of learning with innovative courses designed to meet the demands of the modern world. Join us and shape the future of education</p>

                    <Link to="/login">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default App;
