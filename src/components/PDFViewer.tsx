"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  src: string;
}

export default function PDFViewer({ src }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pdf-viewer-container w-full max-h-[70vh] md:max-h-[80vh] overflow-y-auto overflow-x-hidden bg-[#111] rounded-lg border border-[#222]"
      style={{
        WebkitOverflowScrolling: "touch",
      }}
    >
      <Document
        file={src}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex items-center justify-center h-[50vh] text-[#444]">
            Loading PDF...
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center h-[50vh] text-[#666] p-4 text-center">
            <p className="mb-4">Unable to load PDF in browser</p>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00ff9f] hover:underline"
            >
              Open PDF directly
            </a>
          </div>
        }
        className="flex flex-col items-center"
      >
        {numPages &&
          Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={containerWidth > 0 ? containerWidth - 2 : undefined}
              className="mb-2 last:mb-0"
              renderTextLayer={true}
              renderAnnotationLayer={true}
              loading={
                <div className="flex items-center justify-center h-[200px] text-[#444]">
                  Loading page {index + 1}...
                </div>
              }
            />
          ))}
      </Document>
      {numPages && numPages > 1 && (
        <div className="sticky bottom-0 left-0 right-0 bg-[#111]/90 backdrop-blur-sm py-2 px-4 text-center text-xs text-[#666] border-t border-[#222]">
          {numPages} pages - scroll to view all
        </div>
      )}
    </div>
  );
}
