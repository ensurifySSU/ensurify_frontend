import React, { useEffect, useRef, useState } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
  Font,
  Image,
} from '@react-pdf/renderer';
import { BlueBtn, FlexContainer } from '../common';
import useDocumentStore from '../stores/useDocumentStore';

// Register Korean Font
Font.register({
  family: 'SpoqaHanSans',
  src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
});

// Define PDF Document Styles
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontFamily: 'SpoqaHanSans',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'SpoqaHanSans',
    marginBottom: 10,
  },
  author: {
    fontSize: 12,
    fontFamily: 'SpoqaHanSans',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'SpoqaHanSans',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    fontFamily: 'SpoqaHanSans',
    marginBottom: 5,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    fontFamily: 'SpoqaHanSans',
  },
  chartImage: {
    width: 200,
    height: 100,
    margin: 10,
  },
  drawingImage: {
    width: 200,
    height: 150,
    margin: 10,
  },
  signatureCanvas: {
    border: '1px solid #000',
    width: '100%',
    height: 150,
    marginTop: 20,
  },
});

// Dynamic PDF Document Component
const PDFDocument: React.FC<{ documentData: Document; signatureDataURL: string | null; currentPage: number }> = ({
  documentData,
  signatureDataURL,
  currentPage,
}) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {/* First Page: Title, Subtitle, Author */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.title}>{documentData.title}</Text>
        <Text style={pdfStyles.subTitle}>{documentData.subTitle}</Text>
        <Text style={pdfStyles.author}>{documentData.author}</Text>
      </View>

      {/* Render Each Section */}
      {documentData.sections.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>{documentData.sections[currentPage - 1].title}</Text>
          {documentData.sections[currentPage - 1].content &&
            documentData.sections[currentPage - 1].content.map((paragraph, idx) => {
              if (paragraph.includes('[Image Extracted]')) {
                // If content includes [Image Extracted], render images from file array
                return documentData.sections[currentPage - 1].file.map((file, fileIndex) => (
                  <Image key={`file-${fileIndex}`} style={pdfStyles.chartImage} src={file} />
                ));
              } else if (paragraph.includes('[Yellow Highlight Extracted]')) {
                // If content includes [Yellow Highlight Extracted], render images from sign and check arrays
                const highlightIndex = paragraph.match(/\[Yellow Highlight Extracted\]/g)?.indexOf(paragraph) || 0;
                if (highlightIndex === 0) {
                  return documentData.sections[currentPage - 1].sign.map((sign, signIndex) => (
                    <Image
                      key={`sign-${signIndex}`}
                      style={pdfStyles.drawingImage}
                      src={typeof sign[0] === 'string' ? sign[0] : signatureDataURL}
                    />
                  ));
                } else {
                  return documentData.sections[currentPage - 1].check.map((check, checkIndex) => (
                    <Image
                      key={`check-${checkIndex}`}
                      style={pdfStyles.drawingImage}
                      src={typeof check[0] === 'string' ? check[0] : signatureDataURL}
                    />
                  ));
                }
              } else {
                return (
                  <Text key={`paragraph-${idx}`} style={pdfStyles.text}>
                    {paragraph}
                  </Text>
                );
              }
            })}
        </View>
      )}
    </Page>
  </Document>
);

// PDF Component with Navigation and Signature
const PDF: React.FC = () => {
  const { document } = useDocumentStore(); // useDocumentStore에서 상태 가져오기
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [signatureDataURL, setSignatureDataURL] = useState<string | null>(null);
  const signatureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalPages = document.sections.length > 0 ? document.sections.length : 1;

  // Navigate to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Navigate to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Clear the signature from the canvas
  const handleClearSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setSignatureDataURL(null);
  };

  // Save the signature as a data URL
  const handleSaveSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      setSignatureDataURL(dataURL);
    }
  };

  // Start drawing on the canvas
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      }
    }
  };

  // Draw on the canvas
  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        ctx.stroke();
      }
    }
  };

  // End drawing on the canvas
  const endDrawing = () => {
    isDrawing.current = false;
  };

  return (
    <FlexContainer padding="20px">
      {/* PDF Download Link */}
      <PDFDownloadLink
        document={<PDFDocument documentData={document} signatureDataURL={signatureDataURL} currentPage={currentPage} />}
        fileName="dynamic_output.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <BlueBtn disabled>Loading document...</BlueBtn>
          ) : (
            <BlueBtn>Download PDF</BlueBtn>
          )
        }
      </PDFDownloadLink>

      {/* PDF Viewer */}
      {isClient && (
        <PDFViewer style={{ width: '100%', height: '500px', marginTop: '20px', overflow: 'hidden' }}>
          <PDFDocument documentData={document} signatureDataURL={signatureDataURL} currentPage={currentPage} />
        </PDFViewer>
      )}

      {/* Page Navigation Buttons */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <BlueBtn onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </BlueBtn>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <BlueBtn onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </BlueBtn>
      </div>

      {/* Signature Canvas on the Last Page */}
      {currentPage === totalPages && (
        <div style={{ marginTop: '20px' }}>
          <Text style={{ marginBottom: '10px' }}>서명을 해주세요:</Text>
          <canvas
            ref={signatureCanvasRef}
            style={pdfStyles.signatureCanvas}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
          ></canvas>
          <div style={{ marginTop: '10px' }}>
            <BlueBtn onClick={handleClearSignature}>초기화</BlueBtn>
            <BlueBtn onClick={handleSaveSignature} style={{ marginLeft: '10px' }}>
              저장
            </BlueBtn>
          </div>
        </div>
      )}
    </FlexContainer>
  );
};

export default PDF;
