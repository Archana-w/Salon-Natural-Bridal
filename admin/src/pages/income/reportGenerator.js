import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

const generateTransactionReport = (transactions) => {
  const doc = new jsPDF();
  const tableColumns = ["Date","Amount", "Type", "Category", "Description"];
  const tableRows = transactions.map((transaction) => [
    moment(transaction.date).format("YYYY-MM-DD"),
    transaction.amount,
    transaction.type,
    transaction.category,
    transaction.description,
  ]);

  doc.autoTable(tableColumns, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.text("Transaction Report", 14, 15);
  doc.save(`transactions_${dateStr}.pdf`);
};

export default generateTransactionReport;