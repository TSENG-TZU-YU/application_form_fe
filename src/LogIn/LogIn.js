import React from 'react';
import '../styles/logIn/_logIn.scss';
import { AiFillHome } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';

function LogIn() {
  return (
    <>
      <div className="logInContainer">
        <div className="container">
          <div className="title">陽信</div>
          <div className="inputContainer">
            <div className="inputContain">
              <AiFillHome className="icons" />
              <select name="" id="">
                <option value="0" selected>
                  --所屬公司--
                </option>
                <option value="1">陽信電商</option>
              </select>
            </div>
            <div className="inputContain">
              <BsPersonCircle className="icons" />
              <input type="text" placeholder="員工編號" />
            </div>
            <div className="inputContain">
              <FaLock className="icons" />
              <input type="text" placeholder="輸入密碼" />
            </div>
            <button>登入</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
