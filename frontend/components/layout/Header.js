import React, {useContext} from 'react'
import Link from 'next/link'
import Image from 'next/image'

import AuthContext from '../../context/AuthContext'
import user from '../../pages/api/auth/user'

const Header = () => {

  const {loading, user, logout} = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="50" height="50" src="/images/logo.png" alt="" />
            </div>
            <span className="logo1">Job</span>
            <span className="logo2">bee</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>
          {user ? (
            <div className="btn dropdown-ml-3">
              <a 
                className='btn dropdown-toggle mr-4'
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Hi, {user.first_name}</span>{" "}
              </a>

                <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                  <Link href="/employer/jobs">
                    <a className="dropdown-item">
                      <span>My Jobs</span>
                    </a>
                  </Link>
                  <Link href="/me/applied">
                    <a className="dropdown-item">
                      <span>Jobs Applied</span>
                    </a>
                  </Link>
                  <Link href="/me">
                    <a className="dropdown-item">
                      <span>Pofile</span>
                    </a>
                  </Link>

                  <Link href="/upload/resume">
                    <a className="dropdown-item">
                      <span>Upload Resume</span>
                    </a>
                  </Link>

                  <Link href="/">
                    <a 
                      className="dropdown-item text-danger"
                      onclick={logoutHandler}
                    >
                      <span>Logout</span>
                    </a>
                  </Link>

                </div>
            </div>
          ) :(
            !loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          )}

          
        </div>
      </div>
    </div>
  )
}

export default Header