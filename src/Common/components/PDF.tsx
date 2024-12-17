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
import { DocumentTypes } from '../types/type';

// Register Korean Font
Font.register({
  family: 'SpoqaHanSans',
  src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
});

// Define PDF Document Styles
const pdfStyles = StyleSheet.create({
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
  page: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  headerImage: {
    width: '100%',
    height: 50,
  },
  footer: {
    textAlign: 'center',
    marginTop: 10,
  },
  footerImage: {
    width: '100%',
    height: 30,
  },
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  section: {
    width: '48%', // 두 섹션이 세로로 나뉘도록 50% 이하로 설정
    border: '1px solid #ddd',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  chartImage: {
    width: '100%',
    height: 'auto',
    marginBottom: 5,
  },
  drawingImage: {
    width: '100%',
    height: 'auto',
    marginBottom: 5,
  },
  signatureCanvas: {
    border: '1px solid #000',
    width: '100%',
    height: 150,
    marginTop: 20,
  },
});

const PDFDocument: React.FC<{
  documentData: DocumentTypes;
  signatureDataURLs: string[] | null;
  currentPage: number;
}> = ({ documentData, signatureDataURLs, currentPage }) => {
  const section1 = documentData.sections[currentPage * 2 - 2]; // 첫 번째 섹션
  const section2 = documentData.sections[currentPage * 2 - 1]; // 두 번째 섹션

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header */}
        <View style={pdfStyles.header}>
          {documentData.header && (
            <Image
              src={`/dummies/woori_first/${documentData.header}`}
              style={pdfStyles.headerImage}
            />
          )}
        </View>

        {/* Two Sections */}
        <View style={pdfStyles.sectionContainer}>
          {/* Section 1 */}
          <View style={pdfStyles.section}>
            {section1?.file.length > 0
              ? section1.file.map((file, idx) => (
                  <Image
                    key={`file-${idx}`}
                    style={pdfStyles.chartImage}
                    src={`/dummies/woori_first/${file}`}
                  />
                ))
              : section1?.check
                  .concat(section1?.sign)
                  .map((item, idx) => (
                    <Image
                      key={`highlight-${idx}`}
                      style={pdfStyles.drawingImage}
                      src={signatureDataURLs[idx] || `/dummies/woori_first/${item[0]}`}
                    />
                  ))}
          </View>

          {/* Section 2 */}
          <View style={pdfStyles.section}>
            {section2?.file.length > 0
              ? section2.file.map((file, idx) => (
                  <Image
                    key={`file-${idx}`}
                    style={pdfStyles.chartImage}
                    src={`/dummies/woori_first/${file}`}
                  />
                ))
              : section2?.check
                  .concat(section2?.sign)
                  .map((item, idx) => (
                    <Image
                      key={`highlight-${idx}`}
                      style={pdfStyles.drawingImage}
                      src={signatureDataURLs[idx] || `/dummies/woori_first/${item[0]}`}
                    />
                  ))}
          </View>
        </View>

        {/* Footer */}
        <View style={pdfStyles.footer}>
          {documentData.footer && (
            <Image
              src={`/dummies/woori_first/${documentData.footer}`}
              style={pdfStyles.footerImage}
            />
          )}
        </View>
      </Page>
    </Document>
  );
};

const PDF: React.FC = () => {
  const isDrawing = useRef(false);
  const signatureCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([]); // Array of canvas refs

  const { documentItem } = useDocumentStore(); // useDocumentStore과 상호적인 상화 수행
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [signatureDataURLs, setSignatureDataURLs] = useState<string[]>([]); // Array 상태로 변경
  const [sectionDrawingList, setSectionDrawingList] = useState<any[]>([]);
  const [currentItem, setCurrentItem] = useState<number>(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const section1 = documentItem.sections[currentPage * 2 - 2];
    const section2 = documentItem.sections[currentPage * 2 - 1];
    const combinedList = [];

    if (section1) {
      combinedList.push(...(section1.check || []), ...(section1.sign || []));
    }
    if (section2) {
      combinedList.push(...(section2.check || []), ...(section2.sign || []));
    }
    setSectionDrawingList(combinedList);
  }, [currentPage, documentItem]);

  const totalPages = documentItem.sections.length > 0 ? documentItem.sections.length / 2 : 1;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClearSignature = (index: number) => {
    const canvas = signatureCanvasRefs.current[index];
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setSignatureDataURLs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveSignature = (index: number) => {
    const canvas = signatureCanvasRefs.current[index];
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      setSignatureDataURLs((prev) => {
        const updated = [...prev];
        updated[index] = dataURL;
        return updated;
      });
      console.log(`Saved Image for canvas ${index}:`, dataURL);
      setCurrentItem(currentItem + 1);
    }
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>, index: number) => {
    isDrawing.current = true;
    const canvas = signatureCanvasRefs.current[index];
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      }
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>, index: number) => {
    if (!isDrawing.current) return;
    const canvas = signatureCanvasRefs.current[index];
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        ctx.stroke();
      }
    }
  };

  const endDrawing = () => {
    isDrawing.current = false;
  };

  const loadBackgroundImage = (src: string, index: number) => {
    const canvas = signatureCanvasRefs.current[index];
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const background = new window.Image();
        background.src = `/dummies/woori_first/${src}`;

        background.onload = () => {
          canvas.width = background.width;
          canvas.height = background.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  };

  useEffect(() => {
    sectionDrawingList.forEach((item, index) => {
      loadBackgroundImage(item[0], index);
    });
  }, [sectionDrawingList]);

  useEffect(() => {
    sectionDrawingList.forEach((item, index) => {
      if (signatureDataURLs[index]) {
        setSectionDrawingList((prev) => {
          const updated = [...prev];
          updated[index] = [item[0], true];
          return updated;
        });
      }
    });
  }, [signatureDataURLs]);

  useEffect(() => {
    console.log('Signature Data URLs:', signatureDataURLs);
    console.log('Section Drawing List:', sectionDrawingList);
  }, [signatureDataURLs, sectionDrawingList]);

  return (
    <FlexContainer padding="20px">
      <PDFDownloadLink
        document={
          <PDFDocument
            documentData={documentItem}
            signatureDataURLs={signatureDataURLs} // Array로 전달
            currentPage={currentPage}
          />
        }
        fileName="dynamic_output.pdf"
      >
        {({ loading }) =>
          loading ? (
            <BlueBtn disabled>Loading document...</BlueBtn>
          ) : (
            <BlueBtn>Download PDF</BlueBtn>
          )
        }
      </PDFDownloadLink>

      {isClient && (
        <PDFViewer style={{ width: '100%', height: '500px', marginTop: '20px' }}>
          <PDFDocument
            documentData={documentItem}
            signatureDataURLs={signatureDataURLs}
            currentPage={currentPage}
          />
        </PDFViewer>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

      {sectionDrawingList.map(
        (item, index) =>
          currentItem === index && (
            <div key={index} style={{ marginTop: '20px' }}>
              <Text>서명을 해주세요:</Text>
              <canvas
                ref={(el) => (signatureCanvasRefs.current[index] = el)}
                style={{ width: '100%', border: '1px solid #ccc' }}
                onMouseDown={(e) => startDrawing(e, index)}
                onMouseMove={(e) => draw(e, index)}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
              ></canvas>
              <div>
                <BlueBtn onClick={() => handleClearSignature(index)}>초기화</BlueBtn>
                <BlueBtn onClick={() => handleSaveSignature(index)} style={{ marginLeft: '10px' }}>
                  저장
                </BlueBtn>
              </div>
            </div>
          ),
      )}
    </FlexContainer>
  );
};

export default PDF;
