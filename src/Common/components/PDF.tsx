import React, { useEffect, useState } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
  Font,
} from '@react-pdf/renderer';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { BlueBtn, FlexContainer } from '../common';

// 한글 폰트 등록
Font.register({
  family: 'SpoqaHanSans',
  src:
    'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
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
});

// PDF 문서 컴포넌트 작성
const PDFDocument: React.FC = () => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.korean}>개인형퇴직연금(IRP) 운용관리계약서</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.korean}>개인형퇴직연금(IRP) 운용관리계약서</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.korean}>제1조 (계약의 목적)</Text>
        <Text style={pdfStyles.korean}>
          이 계약은 근로자퇴직급여보장법(이 계약에서 "법"이라 합니다) 제24조에 의하여 개인형퇴직연금제도(이 계약에서 "이 제도"라 합니다)를 설정한 가입자와 (주)우리은행 (이 계약에서 "은행"이라 합니다)이 이 제도의 운용관리업무 수행을 위하여 개인형퇴직연금 운용관리계약(이 계약에서 "이 계약"이라 합니다)을 체결함을 목적으로 합니다.
        </Text>
      </View>
    </Page>
  </Document>
);

// PDF 컴포넌트 작성
const PDF: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 컴포넌트가 마운트된 이후에 클라이언트 환경임을 설정
  }, []);

  return (
    <FlexContainer padding="20px">
      <PDFDownloadLink document={<PDFDocument />} fileName="example.pdf">
        {({ blob, url, loading, error }) =>
          loading ? (
            <BlueBtn disabled>Loading document...</BlueBtn>
          ) : (
            <BlueBtn>Download PDF</BlueBtn>
          )
        }
      </PDFDownloadLink>
      {isClient && (
        <PDFViewer style={{ width: '100%', height: '500px', marginTop: '20px' }}>
          <PDFDocument />
        </PDFViewer>
      )}
    </FlexContainer>
  );
};

export default PDF;

