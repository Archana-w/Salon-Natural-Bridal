import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function ReportGenerator() {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        axios.get("http://localhost:5000/report")
            .then(response => {
                setReportData(response.data); // Update state with fetched report data
            })
            .catch(error => {
                console.error("Error fetching report data:", error);
            });
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    // Function to generate and download the PDF report
    const generatePDFReport = () => {
        const doc = new jsPDF();
        
        // Loop through reportData and add content to the PDF
        reportData.forEach((item, index) => {
            doc.text(20, 10 + index * 10, `${item.name}: ${item.value}`);
        });

        // Save the PDF and provide a download link for the user
        doc.save("report.pdf");
    };

    return (
        <div className="container">
            <h2>Report Generator</h2>
            <button onClick={generatePDFReport} className="btn btn-primary">Generate PDF Report</button>
        </div>
    );
}

export default ReportGenerator;
