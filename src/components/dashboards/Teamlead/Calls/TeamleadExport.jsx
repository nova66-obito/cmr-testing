import html2canvas from "html2canvas-pro"; // ✅ supports oklch
import { jsPDF } from "jspdf";
import { Download } from "lucide-react";

export default function TeamLeadExportButton({
  targetRef,
  fileName = "calls-dashboard.pdf",
  buttonClassName = "",
}) {
  const handleExportPDF = async () => {
    try {
      if (!targetRef?.current) return;

      const element = targetRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(fileName);
    } catch (err) {
      console.error("PDF Export Error:", err);
      alert("Export failed. Check console.");
    }
  };

  return (
    <button
      onClick={handleExportPDF}
      className={
        buttonClassName ||
        "flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors w-full sm:w-auto"
      }
    >
      <Download className="w-4 h-4" />
      Export
    </button>
  );
}


// npm i html2canvas-pro jspdf---->FOr pdf exportation