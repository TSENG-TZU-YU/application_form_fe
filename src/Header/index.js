import React, { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

//react-icons
import { HiPencilAlt } from 'react-icons/hi';
import { RiFileTextLine } from 'react-icons/ri';
import { RiPhoneFindFill } from 'react-icons/ri';
import { MdOutlineLogout } from 'react-icons/md';

function Header() {
  const [application, setApplication] = useState(false);
  const [caseManagement, setCaseManagement] = useState(true);
  const [trial, setTrial] = useState(false);

  const app = () => {
    if (caseManagement || trial) {
      setCaseManagement(false);
      setTrial(false);
    }
    setApplication(true);
  };
  const cas = () => {
    if (application || trial) {
      setApplication(false);
      setTrial(false);
    }
    setCaseManagement(true);
  };
  const tri = () => {
    if (application || caseManagement) {
      setApplication(false);
      setCaseManagement(false);
    }
    setTrial(true);
  };

  return (
    <>
      <div className="navTop">
        <h3>陽信</h3>
        <MdOutlineLogout size="30" />
      </div>
      <div className="between">
        <div className="navRight">
          <div>公司:陽信電子商務</div>
          <div>姓名:曾子瑜</div>
          <div>職別:職員</div>

          {/* 使用者 */}
          <Link to="application">
            <div className={`bold ${application ? 'link' : ''}`} onClick={app}>
              <HiPencilAlt size="20" />
              申請表
            </div>
          </Link>
          <Link
            className={` ${caseManagement ? 'link' : ''}`}
            to="/header"
            onClick={cas}
          >
            <div className="bold">
              <RiFileTextLine size="20" />
              申請紀錄查詢
            </div>
          </Link>
          <Link to="">
            {/* 處理人/協理/主管 */}
            <div className={`bold ${trial ? 'link' : ''}`} onClick={tri}>
              <RiPhoneFindFill size="20" />
              案件審理作業
            </div>
          </Link>
        </div>

        <div className="left">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Header;
