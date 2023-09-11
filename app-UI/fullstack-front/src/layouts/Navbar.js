import React from 'react';
import { Link } from 'react-router-dom';
import "./navBar.css"

const Navbar = ({ user }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <span style={{
              color: 'blue'
            }} >Tickle</span><span style={{
              color: 'brown',
              fontSize: '27px',
              textDecoration: 'overline',
            }} >Bank</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user && <li className="nav-item">
                
              </li>}
              {user && user.role === 'admin' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/addUser">
                      Create User
                    </Link>
                  </li>
                </>
              )}

              {/* Move this part within a list item */}
              {user && user.role === 'user' && (
                <>
                  {/* <li className="nav-item">
                                        <Link className="nav-link" to="/transMoney">
                                            Transfer Money
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/balHistory">
                                            Balance History
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/transHistory">
                                            Transaction History
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/transaction">
                                            Create Transaction
                                        </Link>
                                    </li> */}
                </>
              )}
            </ul>
            
            {window.location.pathname !== "/welcome" &&  <span style={{
              background: '#000000c7',
              padding: '15px',
              color: 'white',
              borderRadius: '12px'
            }}> <Link className="nav-link customBtns" to="http://localhost:9080/logout " id='logout'>
                Logout
              </Link>
            </span>}
          </div>
        </div>
      </nav >
    </div >
  );
};

export default Navbar;

