import React from 'react';
import './index.scss';
import { HiPencilAlt } from 'react-icons/hi';
import { RiFileTextLine } from 'react-icons/ri';

function Header() {
    return (
        <>
            <div className="navTop">
                <h3>陽信</h3>
            </div>
            <div className="navRight">
                <div>公司:陽信電子商務</div>
                <div>姓名:曾子瑜</div>
                <div>職別:職員</div>
                <div className='bold'>
                    <HiPencilAlt size='20'/>
                    申請表
                </div>
                <div className='bold'>
                    <RiFileTextLine size='20'/>
                    申請紀錄查詢
                </div>
            </div>
        </>
    );
}

export default Header;
