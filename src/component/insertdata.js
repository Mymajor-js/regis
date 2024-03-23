import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function OpenCloseComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://sheet.best/api/sheets/197a5f20-fa48-43f8-8faf-2837bf44b6e6');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleExportToPDF = () => {
    const table = document.getElementById('div');

    html2canvas(table, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('table.pdf');
    });
  };

  return (
    <div>
      <button onClick={handleExportToPDF}>บันทึกเป็น PDF</button>
      <div class="abs">
      <p>asdjsadjasidasdjasdlasjdada</p>
      <p>asdjsadjasidasdjasdlasjdada</p>
      <p>asdjsadjasidasdjasdlasjdada</p>
        
      </div>
    </div>
  );
}

export default OpenCloseComponent;
