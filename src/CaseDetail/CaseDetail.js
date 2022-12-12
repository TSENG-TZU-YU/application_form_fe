import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { FaArrowLeft } from 'react-icons/fa';

import '../styles/caseDetail/_caseDetail.scss';
import Header from '../Header';

function CaseDetail() {
  const navBtn = [
    { title: '申請表', url: '/caseDetail/appForm' },
    { title: '討論區', url: '/caseDetail/chatPage' },
    { title: '上傳文件', url: '/caseDetail/uploadPage' },
  ];
  return (
    <Header>
      <div className="caseDetailContainer">
        <Link to="/caseManagement" className="prePage">
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
    </Header>
  );
}

export default CaseDetail;
