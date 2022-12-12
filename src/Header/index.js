import React, { useEffect, useState } from 'react';

import './index.scss';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

// import { useNavigate } from 'react-router-dom';

//react-icons
import { HiPencilAlt } from 'react-icons/hi';
import { RiFileTextLine } from 'react-icons/ri';
import { RiPhoneFindFill } from 'react-icons/ri';
import { MdOutlineLogout } from 'react-icons/md';

//hook
import { useAuth } from '../utils/use_auth';

function Header({
  setApplication,
  application,
  caseManagement,
  setCaseManagement,
  setTrial,
  trial,
  children,
}) {
  const { member, setMember, isLogin, setIsLogin } = useAuth();
  const [auth, setAuth] = useState([]);
  console.log('auth', member);

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

  useEffect(() => {
    // let auth = async () => {
    //   try {
    //     let res = await axios.get('http://localhost:3001/api/login/auth');
    //     setMember(res.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // auth();
    setAuth({ ...member });
  }, []);
  return (
    <>
      <div className="navTop">
        <h3>陽信</h3>
        <MdOutlineLogout size="30" />
      </div>
      <div className="between">
        <div className="navRight">
          <div>公司:{auth.applicant_unit}</div>
          <div>姓名:{auth.name}</div>
          <div>職別:{auth.job}</div>

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
          {/* <Application /> */}
          {/* <CaseManagement /> */}
          {/* {children} */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Header;
