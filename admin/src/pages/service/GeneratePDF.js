import jsPDF from "jspdf";
import "jspdf-autotable";
import Logo from "../../images/logo.png";


export function generatePDF(title, columns, data, fileName) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4", 
    lineHeight: 1.2,
  });

  const tableRows = [];

  const tableStyles = {
    theme: "grid", 
    headStyles: {
      fillColor: [41, 128, 185], 
      textColor: 255,
      fontStyle: "bold", 
      halign: "center",
      fontSize: 10, 
      cellPadding: 2, 
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    styles: {
      font: "helvetica", 
      fontSize: 8, 
      textColor: [44, 62, 80], 
      lineWidth: 0.1,
    },
    margin: { top: 20, bottom: 20, left: 10, right: 10 },
  };

  doc.addImage(Logo, "PNG", 15, 10, 30, 30);
  doc.setFontSize(18); 
  doc.setTextColor(0, 0, 0); 
  doc.text(title, 105, 15, { align: "center",  textColor:'44,62,80' }); 

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica");
    doc.setFontSize(10);
    doc.text(
      `Salon Natural Bridal`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }


  data.forEach((item) => {
    const rowData = [];
    columns.forEach((column) => {
      if (column === 'Date') {
        const date = new Date(item[column]);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        rowData.push(formattedDate);
      } else {
        rowData.push(item[column]);
      }
    });
    tableRows.push(rowData);
  });
  

  doc.autoTable({
    columns: columns.map((c) => {
      return { title: c.toUpperCase(), dataKey: c };
    }),
    body: tableRows,
    ...tableStyles,
    startY: 40, 
    didDrawPage: function (data) {
  
      if (data.pageNumber === 1) {
        doc.addImage(Logo, "PNG", 15, 10, 30, 30);}

        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text(title, 105, 15, { align: "center", textColor: '44,62,80' });
      
  
      doc.setLineWidth(0.5);
      doc.line(20, doc.internal.pageSize.getHeight() - 15, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 15);
    },
  });
  
  doc.save(fileName + ".pdf");
  
}