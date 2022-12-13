import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';
import { FaArrowLeft } from 'react-icons/fa';

import '../styles/caseDetail/_caseDetail.scss';
import { useAuth } from '../utils/use_auth';

function CaseDetail() {
  //使用者資料
  const { member, setMember } = useAuth();

  const navBtn = [
    { title: '申請表', url: '/header/caseDetail/' },
    { title: '討論區', url: '/header/caseDetail/chatPage' },
    { title: '上傳文件', url: '/header/caseDetail/uploadPage' },
  ];

  useEffect(() => {
    async function getMember() {
      try {
        // console.log('檢查是否登入');
        let response = await axios.get(`http://localhost:3001/api/login/auth`, {
          withCredentials: true,
        });
        console.log(response.data);
        setMember(response.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
    getMember();
  }, [member]);

  return (
    <div className="caseDetailContainer">
      <Link to="/header" className="prePage">
        <FaArrowLeft className="preIcon" /> <span>返回列表頁</span>
      </Link>

      <div className="caseDetailContain">
        <nav>
          <ul>
            {navBtn.map((v) => {
              return (
                <li key={uuidv4()}>
                  <NavLink
                    to={v.url}
                    className={`linkPad ${(nav) =>
                      nav.isActive ? 'active' : ''}`}
                  >
                    {v.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default CaseDetail;
