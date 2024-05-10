import jsPDF from "jspdf";
import "jspdf-autotable";
import Logo from "../../images/logo.png";


export function generatePDF(title, columns, data, fileName) {
  const doc = new jsPDF({
    orientation: "portrait", // Set orientation to landscape
    unit: "mm", // Use millimeters as the measurement unit
    format: "a4", // Set page format to A4
    lineHeight: 1.2, // Set line height for text
  });

  const tableRows = [];

  // Add custom styling options
  const tableStyles = {
    theme: "grid", // Apply grid theme
    headStyles: {
      fillColor: [41, 128, 185], // Header background color
      textColor: 255, // Header text color
      fontStyle: "bold", // Header font style
      halign: "center", // Align table headers to center
      fontSize: 10, // Decrease font size for headers
      cellPadding: 2, // Reduce padding around text
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245], // Alternate row background color
    },
    styles: {
      font: "helvetica", // Set font family
      fontSize: 8, // Set font size for data cells
      textColor: [44, 62, 80], // Set text color
      lineWidth: 0.1, // Set line width
    },
    margin: { top: 20, bottom: 20, left: 10, right: 10 }, // Add margin around the page
  };

  // Add the logo and title to the header of the PDF
  doc.addImage(Logo, "PNG", 15, 10, 30, 30);
  doc.setFontSize(18); // Set font size for title
  doc.setTextColor(0, 0, 0); // Set text color for title
  doc.text(title, 105, 15, { align: "center",  textColor:'44,62,80' }); // Center align title
  //doc.text(additionalInfo, 105, 25, { align: "center" }); // Center align title

  // Add the restaurant name to the footer
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

  /*data.forEach((item) => {
    const rowData = [];
    columns.forEach((column) => {
      rowData.push(item[column]);
    });
    tableRows.push(rowData);
  });*/

  data.forEach((item) => {
    const rowData = [];
    columns.forEach((column) => {
      // Check if the column is a date column
      if (column === 'Date') {
        // Format the date as desired (e.g., YYYY-MM-DD)
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
    ...tableStyles, // Apply custom styling
    startY: 40, // Start table after logo and title
    didDrawPage: function (data) {
      // Ensure the logo and title are drawn on the first page
      if (data.pageNumber === 1) {
        doc.addImage(Logo, "PNG", 15, 10, 30, 30);}

        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text(title, 105, 15, { align: "center", textColor: '44,62,80' });
      
  
      // Add line to the footer on each page
      doc.setLineWidth(0.5);
      doc.line(20, doc.internal.pageSize.getHeight() - 15, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 15);
    },
  });
  
  doc.save(fileName + ".pdf");
  
}