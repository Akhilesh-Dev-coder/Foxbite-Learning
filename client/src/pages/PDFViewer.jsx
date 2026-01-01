import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Loader, ChevronLeft, ChevronRight } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const res = await axios.get(`/api/pdfs/stream/${id}`, {
          responseType: "arraybuffer",
        });
        setPdfData(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load PDF. You may not have permission.");
        setLoading(false);
      }
    };

    if (id) {
      fetchPdf();
    }
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader className="animate-spin text-primary w-10 h-10" />
      </div>
    );

  if (error)
    return (
      <div className="text-center p-10 text-red-500">
        <h2 className="text-xl font-bold">Error</h2>
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-100 no-select pb-10"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Header */}
      <div className="bg-white shadow-sm p-4 sticky top-0 z-20 flex justify-between items-center bg-opacity-95 backdrop-blur-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </button>
        <div className="font-semibold text-gray-700">
          {numPages ? `Total Pages: ${numPages}` : "Loading..."}
        </div>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* PDF Canvas */}
      <div className="flex justify-center px-4 overflow-auto mt-6">
        <div className="w-full max-w-3xl">
          <Document
            file={pdfData}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) =>
              setError("Failed to render PDF: " + error.message)
            }
            className="flex flex-col gap-4 items-center"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div key={`page_${index + 1}`} className="shadow-lg">
                <Page
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="bg-white"
                  width={
                    window.innerWidth > 768
                      ? 800
                      : Math.min(window.innerWidth - 32, 600)
                  }
                  loading={
                    <div className="h-[500px] w-full bg-white animate-pulse rounded-md" />
                  }
                />
              </div>
            ))}
          </Document>
        </div>
      </div>

      <style>{`
                /* Hide PDF text layer for extra security against copying */
                .react-pdf__Page__textContent {
                    display: none !important;
                }
                .react-pdf__Page__annotations {
                    display: none !important;
                }
            `}</style>
    </div>
  );
};

export default PDFViewer;
