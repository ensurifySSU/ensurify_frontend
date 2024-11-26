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

// 한글 폰트 등록
Font.register({
  family: 'SpoqaHanSans',
  src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
});

// PDF 문서 스타일 정의
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
  korean: {
    fontFamily: 'SpoqaHanSans',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
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
  signatureCanvas: {
    border: '1px solid #000',
    width: '100%',
    height: 150,
    marginTop: 20,
  },
});

// 여러 페이지로 구성된 PDF 문서 컴포넌트
const PDFDocument: React.FC<{ currentPage: number; signatureDataURL: string | null }> = ({
  currentPage,
  signatureDataURL,
}) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {currentPage === 1 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.korean}>Page 1: 개인형퇴직연금(IRP) 운용관리계약서</Text>
        </View>
      )}
      {currentPage === 2 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.korean}>Page 2: 제1조 (계약의 목적)</Text>
          <Text style={pdfStyles.korean}>
            이 계약은 근로자퇴직급여보장법(이 계약에서 "법"이라 합니다) 제24조에 의하여
            개인형퇴직연금제도(이 계약에서 "이 제도"라 합니다)를 설정한 가입자와 (주)우리은행 (이
            계약에서 "은행"이라 합니다)이 이 제도의 운용관리업무 수행을 위하여 개인형퇴직연금
            운용관리계약(이 계약에서 "이 계약"이라 합니다)을 체결함을 목적으로 합니다.
          </Text>
        </View>
      )}
      {currentPage === 3 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.korean}>Page 3: 가입자 정보</Text>
          <View style={pdfStyles.table}>
            <View style={pdfStyles.tableRow}>
              <View style={pdfStyles.tableCol}>
                <Text style={pdfStyles.tableCell}>항목</Text>
              </View>
              <View style={pdfStyles.tableCol}>
                <Text style={pdfStyles.tableCell}>내용</Text>
              </View>
            </View>
            <View style={pdfStyles.tableRow}>
              <View style={pdfStyles.tableCol}>
                <Text style={pdfStyles.tableCell}>가입자 이름</Text>
              </View>
              <View style={pdfStyles.tableCol}>
                <Text style={pdfStyles.tableCell}>홍길동</Text>
              </View>
            </View>
            <View style={pdfStyles.tableRow}>
              <View style={pdfStyles.tableCol}>
                <Text style={pdfStyles.tableCell}>가입일</Text>
              </View>
              <View style={pdfStyles.tableCol}>
                <Text style={pdfStyles.tableCell}>2024-11-12</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      {currentPage === 4 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.korean}>Page 4: 차트 - 자산 배분</Text>
          <Image
            style={pdfStyles.chartImage}
            src="https://miro.medium.com/v2/resize:fit:902/1*CPSTzfUTCCpUbllyiPvl_A.jpeg"
          />
          <Text style={pdfStyles.korean}>서명:</Text>
          {signatureDataURL && <Image style={pdfStyles.chartImage} src={signatureDataURL} />}
        </View>
      )}
    </Page>
  </Document>
);

// 페이지 네비게이션 및 서명이 포함된 PDF 컴포넌트
const PDF: React.FC = () => {
  const [isClient, setIsClient] = useState(false); // 컴포넌트가 클라이언트 측에 마운트되었는지 확인하는 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 관리 상태
  const [signatureDataURL, setSignatureDataURL] = useState<string | null>(null); // 서명 데이터 URL 저장 상태
  const signatureCanvasRef = useRef<HTMLCanvasElement | null>(null); // 서명 캔버스 요소에 대한 참조
  const isDrawing = useRef(false); // 사용자가 현재 캔버스에 그리고 있는지 여부를 추적하는 참조

  useEffect(() => {
    setIsClient(true); // 컴포넌트가 마운트된 후 클라이언트 환경 설정
  }, []);

  const totalPages = 4;

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 이전 페이지로 이동
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 서명을 캔버스에서 지우기
  const handleClearSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 전체 지우기
      }
    }
    setSignatureDataURL(null); // 서명 데이터 URL 리셋
  };

  // 서명을 캔버스에서 데이터 URL로 저장
  const handleSaveSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png'); // 캔버스 내용을 데이터 URL로 가져오기
      setSignatureDataURL(dataURL); // 데이터 URL을 상태에 저장
    }
  };

  // 마우스를 눌렀을 때 캔버스에 그리기 시작
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY); // 그리기 시작 지점 설정
      }
    }
  };

  // 마우스를 움직일 때 캔버스에 그리기
  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY); // 현재 마우스 위치까지 선 그리기
        ctx.stroke(); // 캔버스에 선 렌더링
      }
    }
  };

  // 마우스를 놓았을 때 또는 캔버스를 벗어났을 때 그리기 종료
  const endDrawing = () => {
    isDrawing.current = false; // 그리기 상태를 false로 설정
  };

  return (
    <FlexContainer padding="20px">
      {/* PDF 다운로드 버튼 */}
      <PDFDownloadLink
        document={<PDFDocument currentPage={currentPage} signatureDataURL={signatureDataURL} />}
        fileName="example.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <BlueBtn disabled>Loading document...</BlueBtn>
          ) : (
            <BlueBtn>Download PDF</BlueBtn>
          )
        }
      </PDFDownloadLink>
      {/* PDF 뷰어 */}
      {isClient && (
        <PDFViewer style={{ width: '100%', height: '500px', marginTop: '20px' }}>
          <PDFDocument currentPage={currentPage} signatureDataURL={signatureDataURL} />
        </PDFViewer>
      )}
      {/* 페이지 네비게이션 버튼 */}
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
      {/* 마지막 페이지의 서명 캔버스 */}
      {currentPage === 4 && (
        <div style={{ marginTop: '20px' }}>
          <Text style={{ marginBottom: '10px' }}>서명을 해주세요:</Text>
          <canvas
            ref={signatureCanvasRef}
            style={pdfStyles.signatureCanvas}
            onMouseDown={startDrawing} // 마우스를 눌렀을 때 그리기 시작
            onMouseMove={draw} // 마우스를 움직일 때 그리기
            onMouseUp={endDrawing} // 마우스를 놓았을 때 그리기 종료
            onMouseLeave={endDrawing} // 마우스가 캔버스를 벗어났을 때 그리기 종료
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
