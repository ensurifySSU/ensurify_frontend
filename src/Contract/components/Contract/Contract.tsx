import { forwardRef } from 'react';
import { LeftPrimarySection, RightSideSheet } from '../../../Common/styles/commonStyles';
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
  pdf,
} from '@react-pdf/renderer';
import { BlueBtn, FlexContainer, FloatingAIButton, ModalOverlay } from '../../../Common/common';

import SideSheetVideo from './SideSheetVideo';
import styled from '@emotion/styled';
import useDocumentStore from '../../../Common/stores/useDocumentStore';
import { DocumentTypes } from '../../../Common/types/type';
import { useMutation } from '@tanstack/react-query';
import { postFileUpload } from '../../../Common/apis/servies';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import { sendPageWS, sendSignWS, sendCheckWS } from '../../servies/contractWebsocket';
import AIArea from '../../../Common/components/AIArea';
import Modal from '../../../Common/components/Modal';
import AIButton from '../../../Common/components/AIButton';
import { check } from '../../../../node_modules/prettier/standalone.d';
import Button from '../../../Common/components/Button';
import useRole from '../../../Common/hooks/useRole';
import { useRoleStore } from '../../../Common/stores/roleStore';

interface Props {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  stompClient: Client | null;
  msgItem: any;
}

const Contract = forwardRef<HTMLDivElement, Props>(
  ({ localVideoRef, remoteVideoRef, stompClient, msgItem }: Props, ref) => {
    const { roomId } = useParams();
    useRole();
    const { role } = useRoleStore();

    const isDrawing = useRef(false);
    const signatureCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([]); // Array of canvas refs

    const { documentItem } = useDocumentStore(); // useDocumentStore과 상호적인 상화 수행
    const [currentPage, setCurrentPage] = useState(1);
    const [signatureDataURLs, setSignatureDataURLs] = useState<string[]>([]); // Array 상태로 변경
    const [sectionDrawingList, setSectionDrawingList] = useState<any[]>([]);
    const [currentItem, setCurrentItem] = useState<number>(0);
    const totalPages = documentItem.sections.length > 0 ? documentItem.sections.length / 2 : 1;

    const [isModalActive, setIsModalActive] = useState(false);

    const handleOpenModal = () => {
      setIsModalActive(true);
    };

    const handleCloseModal = () => {
      setIsModalActive(false);
    };

    useEffect(() => {
      if (msgItem) {
        if (msgItem?.pageNum) {
          setCurrentPage(msgItem.pageNum);
        } else if (msgItem?.signNum) {
          const canvas = signatureCanvasRefs.current[msgItem.signNum];
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const img = new Image();
              img.src = msgItem.imgUrl;
              img.onload = () => {
                ctx.drawImage(img, 0, 0);
              };
            }
          }
        } else if (msgItem?.checkNum) {
          const canvas = signatureCanvasRefs.current[msgItem.checkNum];
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const img = new Image();
              img.src = msgItem.imgUrl;
              img.onload = () => {
                ctx.drawImage(img, 0, 0);
              };
            }
          }
        }
      }
      console.log('msgItem:', msgItem);
    }, [msgItem]);

    const handlePageUp = async (pageNum: number) => {
      if (!roomId) return;
      // if (currentPage <= totalPages) return;
      const data = {
        roomId: roomId,
        pageNum: pageNum,
      };
      await sendPageWS({ stompClient, data });
    };

    const handlePageDown = async (pageNum: number) => {
      if (!roomId) return;
      // if (currentPage < 1) return;
      const data = {
        roomId: roomId,
        pageNum: pageNum,
      };
      await sendPageWS({ stompClient, data });
    };

    const handleSign = async (signNum: number, imgUrl: string) => {
      if (!roomId) return;
      const data = {
        roomId: roomId,
        signNum: signNum,
        // checkNum: signNum,
        imgUrl: imgUrl,
      };
      await sendSignWS({ stompClient, data });
    };

    const onFileUpload = useMutation({
      mutationFn: postFileUpload,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log('에러 발생! 아래 메시지를 확인해주세요.', error);
      },
    });

    const handleClickDownload = async () => {
      const blob = await pdf(
        <DownloadDocument documentData={documentItem} signatureDataURLs={signatureDataURLs} />,
      ).toBlob();

      const blobToFile = (blob: Blob, fileName: string): File => {
        return new File([blob], fileName, { type: blob.type });
      };

      onFileUpload.mutate(blobToFile(blob, 'dynamic_output.pdf'));
    };

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

        handleSign(index + 1, dataURL);
      }
    };

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>, index: number) => {
      isDrawing.current = true;
      const canvas = signatureCanvasRefs.current[index];
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const { x, y } = getMousePosition(event, canvas);
          ctx.beginPath();
          ctx.moveTo(x, y);
        }
      }
    };

    const draw = (event: React.MouseEvent<HTMLCanvasElement>, index: number) => {
      if (!isDrawing.current) return;
      const canvas = signatureCanvasRefs.current[index];
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const { x, y } = getMousePosition(event, canvas);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
    };

    const endDrawing = () => {
      isDrawing.current = false;
    };

    const getMousePosition = (
      event: React.MouseEvent<HTMLCanvasElement>,
      canvas: HTMLCanvasElement,
    ) => {
      const rect = canvas.getBoundingClientRect(); // Canvas의 위치와 크기
      const scaleX = canvas.width / rect.width; // 가로 비율
      const scaleY = canvas.height / rect.height; // 세로 비율

      const x = (event.clientX - rect.left) * scaleX; // 정규화된 X 좌표
      const y = (event.clientY - rect.top) * scaleY; // 정규화된 Y 좌표

      return { x, y };
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
    }, [signatureDataURLs, sectionDrawingList]);

    return (
      <StContainer ref={ref}>
        <LeftPrimarySection>
          <StWrapper>
            <PDFViewer style={{ width: '100%', height: '100%', marginTop: '20px' }}>
              <PDFDocument
                documentData={documentItem}
                signatureDataURLs={signatureDataURLs}
                currentPage={currentPage}
              />
            </PDFViewer>
            {signatureDataURLs.length < sectionDrawingList.length && <ModalOverlay />}
          </StWrapper>
        </LeftPrimarySection>
        <RightSideSheet>
          <SideSheetVideo localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef} />
          <FlexContainer padding="20px" marginBottom="100px">
            {
              <PDFDownloadLink
                document={
                  <DownloadDocument
                    documentData={documentItem}
                    signatureDataURLs={signatureDataURLs} // Array로 전달
                  />
                }
                fileName="dynamic_output.pdf"
              >
                {({ loading }) =>
                  loading ? (
                    <BlueBtn disabled>Loading document...</BlueBtn>
                  ) : (
                    <BlueBtn onClick={handleClickDownload}>Download</BlueBtn>
                  )
                }
              </PDFDownloadLink>
            }
            <BlueBtn onClick={handleClickDownload} style={{ marginLeft: '10px' }}>
              파일 업로드
            </BlueBtn>
            {role === 'user' ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Button
                  handleClick={() => handlePageDown(currentPage - 1)}
                  isActive={currentPage === 1}
                  content="이전"
                  width="10rem"
                />
                {/* <span style={{ margin: '0 10px' }}>
                Page {currentPage} of {totalPages}
              </span> */}
                <Button
                  handleClick={() => {
                    handlePageUp(currentPage + 1);
                  }}
                  isActive={currentPage === totalPages}
                  content="다음"
                  width="10rem"
                />
              </div>
            ) : (
              <></>
            )}

            {sectionDrawingList.map(
              (item, index) =>
                currentItem === index && (
                  <div key={index} style={{ marginTop: '20px' }}>
                    <Text>서명을 해주세요:</Text>
                    <canvas
                      ref={(el) => (signatureCanvasRefs.current[index] = el)}
                      style={{
                        width: '100%',
                        height: 'fit-content',
                        border: '1px solid #ccc',
                        marginTop: '10px',
                      }}
                      onMouseDown={(e) => startDrawing(e, index)}
                      onMouseMove={(e) => draw(e, index)}
                      onMouseUp={endDrawing}
                      onMouseLeave={endDrawing}
                    ></canvas>
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        height: 'fit-content',
                        justifyContent: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <BlueBtn onClick={() => handleClearSignature(index)}>초기화</BlueBtn>
                      <BlueBtn
                        onClick={() => handleSaveSignature(index)}
                        style={{ marginLeft: '10px' }}
                      >
                        저장
                      </BlueBtn>
                    </div>
                  </div>
                ),
            )}
          </FlexContainer>
        </RightSideSheet>
        {isModalActive ? (
          <Modal isActive={isModalActive} onClose={handleCloseModal} />
        ) : (
          <FloatingAIButton>
            <AIButton onClick={handleOpenModal} isActive={isModalActive} />
          </FloatingAIButton>
        )}
      </StContainer>
    );
  },
);
export default Contract;

const StContainer = styled.div`
  height: 100%;
`;

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: #fff;
  border-radius: 10px;
`;

// Register Korean Font
Font.register({
  family: 'SpoqaHanSans',
  src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
});

// Define PDF Document Styles
const pdfStyles = StyleSheet.create({
  title: {
    marginBottom: 10,
    fontFamily: 'SpoqaHanSans',
    fontSize: 20,
    fontWeight: 'bold',
  },

  subtitle: {
    marginBottom: 10,
    fontFamily: 'SpoqaHanSans',
    fontSize: 16,
  },

  author: {
    marginBottom: 20,
    fontFamily: 'SpoqaHanSans',
    fontSize: 12,
  },

  page: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  },

  header: {
    marginBottom: 10,
    textAlign: 'center',
  },

  headerimage: {
    width: '100%',
    height: 50,
  },

  footer: {
    marginTop: 10,
    textAlign: 'center',
  },

  footerimage: {
    width: '100%',
    height: 30,
  },

  sectioncontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginVertical: 20,
  },

  section: {
    width: '48%', // 두 섹션이 세로로 나뉘도록 50% 이하로 설정
    padding: 10,
    border: '1px solid #ddd',
  },

  sectiontitle: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },

  text: {
    marginBottom: 5,
    fontSize: 12,
  },

  chartimage: {
    width: '100%',
    height: 'auto',
    marginBottom: 5,
  },

  drawingimage: {
    width: '100%',
    height: 'auto',
    marginBottom: 5,
  },

  signaturecanvas: {
    width: '100%',
    height: 150,
    marginTop: 20,
    border: '1px solid #000',
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

const DownloadDocument: React.FC<{
  documentData: DocumentTypes;
  signatureDataURLs: string[] | null;
}> = ({ documentData, signatureDataURLs }) => {
  const { sections, header, footer } = documentData;
  // 페이지 수 계산: 두 개의 섹션이 한 페이지에 표시됨
  const totalPages = Math.ceil(sections.length / 2);

  return (
    <Document>
      {Array.from({ length: totalPages }).map((_, pageIndex) => {
        const section1 = sections[pageIndex * 2]; // 첫 번째 섹션
        const section2 = sections[pageIndex * 2 + 1]; // 두 번째 섹션 (있을 경우)

        return (
          <Page key={`page-${pageIndex}`} size="A4" style={pdfStyles.page}>
            {/* Header */}
            <View style={pdfStyles.header}>
              {header && (
                <Image src={`/dummies/woori_first/${header}`} style={pdfStyles.headerImage} />
              )}
            </View>

            {/* Two Sections */}
            <View style={pdfStyles.sectionContainer}>
              {/* Section 1 */}
              <View style={pdfStyles.section}>
                {section1?.file.length > 0
                  ? section1.file.map((file, idx) => (
                      <Image
                        key={`file-${pageIndex}-1-${idx}`}
                        style={pdfStyles.chartImage}
                        src={`/dummies/woori_first/${file}`}
                      />
                    ))
                  : section1?.check
                      .concat(section1?.sign)
                      .map((item, idx) => (
                        <Image
                          key={`highlight-${pageIndex}-1-${idx}`}
                          style={pdfStyles.drawingImage}
                          src={signatureDataURLs?.[idx] || `/dummies/woori_first/${item[0]}`}
                        />
                      ))}
              </View>

              {/* Section 2 */}
              <View style={pdfStyles.section}>
                {section2?.file.length > 0
                  ? section2.file.map((file, idx) => (
                      <Image
                        key={`file-${pageIndex}-2-${idx}`}
                        style={pdfStyles.chartImage}
                        src={`/dummies/woori_first/${file}`}
                      />
                    ))
                  : section2?.check
                      .concat(section2?.sign)
                      .map((item, idx) => (
                        <Image
                          key={`highlight-${pageIndex}-2-${idx}`}
                          style={pdfStyles.drawingImage}
                          src={signatureDataURLs?.[idx] || `/dummies/woori_first/${item[0]}`}
                        />
                      ))}
              </View>
            </View>

            {/* Footer */}
            <View style={pdfStyles.footer}>
              {footer && (
                <Image src={`/dummies/woori_first/${footer}`} style={pdfStyles.footerImage} />
              )}
            </View>
          </Page>
        );
      })}
    </Document>
  );
};
