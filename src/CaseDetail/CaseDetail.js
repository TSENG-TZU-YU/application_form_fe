import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { FaArrowLeft } from 'react-icons/fa';

import '../styles/caseDetail/_caseDetail.scss';

function CaseDetail() {
  const navBtn = [
    { title: '申請表', url: '/header/caseDetail/:id' },
    { title: '討論區', url: '/header/caseDetail/chatPage' },
    { title: '上傳文件', url: '/header/caseDetail/uploadPage' },
  ];
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
