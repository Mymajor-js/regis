import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import './MyButton.css';
function useMyButton() {
  const [fullName, setFullName] = useState('');
  const [stdid, setStdId] = useState('');
  const [level, setLevel] = useState('');
  const [subj, setSubj] = useState('');
  const [about, setAbout] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    if (fullName && stdid) {
      sendDataToGoogleSheets(formData);
      setFullName('');
      setStdId('');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  function sendDataToGoogleSheets(formData) {
    axios.post('https://script.google.com/macros/s/AKfycbyiRs4VpcRSTkA_f-jHWo5cqihtHwGbzvlUOaiWsjHhU50Y5URPjFDZjjtfLf_uVCxpeg/exec', formData)
      .then(response => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลเรียบร้อยแล้ว',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => {
        console.error('Error submitting data:', error);
        Swal.fire({
          icon: 'error',
          title: 'มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

  return (
    <div className="index-content">
      <div id="container">
        <div className="labelainput">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName">ชื่อ-สกุล:</label>
              <input type="text" id="fullName" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="stdid">รหัสนักศึกษา:</label>
              <input type="number" id="stdid" name="stdid" value={stdid} onChange={(e) => setStdId(e.target.value)} />
            </div>
            <div>
              <label htmlFor="level">ชั้นปี:</label>
              <select id="level" name="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="ชั้นปีที่ 1">ชั้นปีที่ 1</option>
                <option value="ชั้นปีที่ 2">ชั้นปีที่ 2</option>
                <option value="ชั้นปีที่ 3">ชั้นปีที่ 3</option>
                <option value="ชั้นปีที่ 4">ชั้นปีที่ 4</option>
              </select>
            </div>
            <div>
              <label htmlFor="subj">หลักสูตร:</label>
              <select id="subj" name="subj" value={subj} onChange={(e) => setSubj(e.target.value)}>
                <option value="สาขาวิชาศิลปะและนวัตกรรมการออกแบบ">สาขาวิชาศิลปะและนวัตกรรมการออกแบบ</option>
                <option value="สาขาวิชานวัตกรรมอาหารสร้างสรรค์และโภชนาการ">สาขาวิชานวัตกรรมอาหารสร้างสรรค์และโภชนาการ</option>
                <option value="สาขาวิชาสาธารณสุขชุมชน">สาขาวิชาสาธารณสุขชุมชน</option>
                <option value="สาขาวิชาวิทยาการคอมพิวเตอร์">สาขาวิชาวิทยาการคอมพิวเตอร์</option>
                <option value="สาขาวิชาการจัดการสุขภาพผู้สูงอายุ"> สาขาวิชาการจัดการสุขภาพผู้สูงอายุ</option>
                <option value="สาขาวิชาเอกการจัดการ">สาขาวิชาเอกการจัดการ</option>
                <option value="สาขาวิชเอกธุรกิจดิจิทัล">สาขาวิชเอกธุรกิจดิจิทัล</option>
                <option value="สาขาวิชาวิชาเอกการเงิน">สาขาวิชาวิชาเอกการเงิน</option>
                <option value="สาขาวิชาเอกการจัดการธุรกิจการค้าสมัยใหม่">สาขาวิชาเอกการจัดการธุรกิจการค้าสมัยใหม่</option>
                <option value="สาขาวิชาการท่องเที่ยวและบริการ">สาขาวิชาการท่องเที่ยวและบริการ</option>
                <option value="สาขาวิชานิติศาสตร์">สาขาวิชานิติศาสตร์</option>
                <option value="สาขาวิชาการบริหารทรัพยากรมนุษย์">สาขาวิชาการบริหารทรัพยากรมนุษย์</option>
                <option value="สาขาวิชารัฐประศาสนศาสตร">สาขาวิชารัฐประศาสนศาสตร</option>
                <option value="สาขาวิชารัฐศาสตร์">สาขาวิชารัฐศาสตร์</option>
                <option value="สาขาวิชาสหวิทยาการเพื่อการพัฒนาท้องถิ่น">สาขาวิชาสหวิทยาการเพื่อการพัฒนาท้องถิ่น</option>
                <option value="สาขาวิชาวิศวกรรมการผลิตและระบบอัตโนมัติ">สาขาวิชาวิศวกรรมการผลิตและระบบอัตโนมัติ</option>
                <option value="สาขาวิชาวิศวกรรมเครื่องกล">สาขาวิชาวิศวกรรมเครื่องกล</option>
                <option value="สาขาวิชาวิศวกรรมอุตสาหการและโลจิสติกส์">สาขาวิชาวิศวกรรมอุตสาหการและโลจิสติกส์</option>
                <option value="สาขาวิศวกรรมศาสตร์การก่อสร้างและระบบราง">สาขาวิศวกรรมศาสตร์การก่อสร้างและระบบราง</option>
              </select>
            </div>
            <div>
              <label htmlFor="about">ฝ่ายที่สนใจ:</label>
              <select id="about" name="about" value={about} onChange={(e) => setAbout(e.target.value)}>
                <option value="ฝ่ายวิชาการ">ฝ่ายวิชาการ</option>
                <option value="ฝ่ายวิชาการ">ฝ่ายวิชาการ</option>
                <option value="ฝ่ายกิจกรรม">ฝ่ายกิจกรรม</option>
                <option value="ฝ่ายสันทนาการ">ฝ่ายสันทนาการ</option>
                <option value="ฝ่ายนันทนาการและกีฬา">ฝ่ายนันทนาการและกีฬา</option>
                <option value="ฝ่ายสวัสดิการและปฏิคน">ฝ่ายสวัสดิการและปฏิคน</option>
                <option value="ฝ่ายสถานที่">ฝ่ายสถานที่</option>
                <option value="ฝ่ายประชาสัมพันธ์">ฝ่ายประชาสัมพันธ์/ประเมินผล</option>
                <option value="ฝ่ายวินัยนักศึกษา">ฝ่ายวินัยนักศึกษา</option>
                <option value="ฝ่ายโสตทัศนูปกรณ์">ฝ่ายโสตทัศนูปกรณ์</option>
                <option value="ฝ่ายเหรัญญิกด้วย">ฝ่ายเหรัญญิกด้วย</option>
              </select>
            </div>
            <input className="custom-btn btn-15" type="submit" value="สมัคร"/>
          </form>
        </div>
      </div>  
      <h4>โปรดกรอกข้อมูลตามความเป็นจริง</h4>
    </div>
  );
}

export default useMyButton;
