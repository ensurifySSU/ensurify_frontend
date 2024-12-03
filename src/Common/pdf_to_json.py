import PyPDF2
import pdfplumber
import re
import json
import os
from pdf2image import convert_from_path
import cv2
import numpy as np

# PDF 파일에서 텍스트를 추출하는 함수
def extract_text_from_pdf(pdf_path):
    text = ""  # 텍스트 내용을 저장할 변수
    grids = []  # 표 데이터를 저장할 리스트
    files = []  # 이미지 파일 경로를 저장할 리스트
    yellow_highlighted_files = []  # 노란색 하이라이트 된 이미지 파일 경로를 저장할 리스트
    
    # pdfplumber를 사용하여 PDF 파일 열기
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            if page_num == 0:
                continue  # 첫 페이지는 건너뜀
            text += page.extract_text() + "\n"  # 페이지의 텍스트를 추출하고 저장
            tables = page.extract_tables()  # 페이지에서 표 추출
            for table in tables:
                grid = []
                for row in table:
                    grid.append([str(cell) if cell is not None else "" for cell in row])  # 표의 셀 데이터를 문자열로 변환하여 저장
                grids.append(grid)
                text += "[Table Extracted]\n"  # 표가 추출되었음을 표시
            
            page_image = page.to_image()  # 페이지 이미지를 생성
            for image_index, image in enumerate(page.images):
                image_path = f"image_page_{page_num + 1}_{image_index}.png"
                page_image.save(image_path)  # 페이지 이미지를 저장
                files.append(image_path)  # 이미지 파일 경로를 리스트에 추가
                text += "[Image Extracted]\n"  # 이미지가 추출되었음을 표시

    # PDF 파일을 이미지로 변환
    pages = convert_from_path(pdf_path, dpi=300)
    last_page_num = len(pages) - 1
    image_path = f"page_image_{last_page_num + 1}.png"
    pages[last_page_num].save(image_path)  # 마지막 페이지 이미지를 저장
    
    # OpenCV를 사용하여 노란색 하이라이트 영역 추출
    img = cv2.imread(image_path)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)  # 이미지를 HSV 색공간으로 변환
    lower_yellow = np.array([25, 100, 200])  # 노란색의 하한값 설정
    upper_yellow = np.array([30, 150, 255])  # 노란색의 상한값 설정
    mask = cv2.inRange(hsv, lower_yellow, upper_yellow)  # 노란색 영역을 마스크로 생성
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)  # 윤곽선 찾기
    
    img_width = img.shape[1]
    for idx, contour in enumerate(contours):
        x, y, w, h = cv2.boundingRect(contour)  # 윤곽선을 감싸는 사각형 생성
        if w > 50 and h > 50 and x > img_width / 2:  # 특정 조건을 만족하는 윤곽선만 처리
            cropped_img = img[y:y + h, x:x + w]  # 사각형 부분만 잘라냄
            yellow_highlight_path = f"yellow_highlight_page_{last_page_num + 1}_{idx}.png"
            cv2.imwrite(yellow_highlight_path, cropped_img)  # 잘라낸 이미지를 저장
            yellow_highlighted_files.append(yellow_highlight_path)  # 저장된 이미지 경로를 리스트에 추가
            text += "[Yellow Highlight Extracted]\n"  # 노란색 하이라이트가 추출되었음을 표시

    return text, grids, files, yellow_highlighted_files  # 추출된 텍스트, 표, 이미지 파일 경로를 반환

# 텍스트를 섹션으로 나누는 함수
def split_into_sections(text, grids, files, yellow_highlighted_files):
    sections = []  # 섹션들을 저장할 리스트
    current_section = {"title": None, "content": [], "grid": [], "file": [], "sign": [], "check": []}
    grid_index, file_index, yellow_highlight_index = 0, 0, 0

    # 텍스트를 특정 구분자 기준으로 나눔
    parts = re.split(r'(제[0-9]+\uC870)', text)
    for part in parts:
        part = part.strip()
        if not part:
            continue

        # 제목 패턴을 찾은 경우 새로운 섹션 시작
        if re.match(r'\uC81C[0-9]+\uC870', part):
            if current_section["title"]:
                sections.append(current_section)  # 현재 섹션을 리스트에 추가
            current_section = {"title": part, "content": [], "grid": [], "file": [], "sign": [], "check": []}
            if grid_index < len(grids):
                current_section["grid"].append(grids[grid_index])  # 현재 섹션에 표 추가
                grid_index += 1
            if file_index < len(files):
                current_section["file"].append(files[file_index])  # 현재 섹션에 파일 추가
                file_index += 1
            if yellow_highlight_index < len(yellow_highlighted_files):
                current_section["sign"].append([yellow_highlighted_files[yellow_highlight_index], False])  # 노란색 하이라이트 이미지 추가
                yellow_highlight_index += 1
            if yellow_highlight_index < len(yellow_highlighted_files):
                current_section["check"].append([yellow_highlighted_files[yellow_highlight_index], False])  # 체크 이미지 추가
                yellow_highlight_index += 1
        else:
            sub_parts = re.split(r'\n{2,}|\s{2,}', part)
            for sub_part in sub_parts:
                sub_part = sub_part.strip()
                if not sub_part:
                    continue

                if not current_section["title"]:
                    current_section["title"] = sub_part  # 제목이 아직 없으면 제목으로 설정
                else:
                    # 콘텐츠를 특정 패턴으로 나눠서 처리
                    content_parts = re.split(r'(\d+\. |\u2460|\u2461|\u2462|\u2463|\u2464|\u2465|\u2466|\u2467|\u2468|\u2469|\u25A1)', sub_part)
                    i = 0
                    while i < len(content_parts):
                        content = content_parts[i].strip()
                        if content:
                            # 특정 패턴이 콘텐츠에 포함된 경우
                            if content in ["\u25A1"] or re.match(r'\d+\. ', content) or content in ["\u2460", "\u2461", "\u2462", "\u2463", "\u2464",
                                                                                                   "\u2465", "\u2466", "\u2467", "\u2468", "\u2469"]:
                                if i + 1 < len(content_parts):
                                    combined_content = content + " " + content_parts[i + 1].strip()
                                    current_section["content"].append(combined_content)  # 콘텐츠를 결합하여 추가
                                    i += 1
                                else:
                                    current_section["content"].append(content)
                            else:
                                current_section["content"].append(content)  # 일반 콘텐츠 추가
                        i += 1

    if current_section["title"]:
        sections.append(current_section)  # 마지막 섹션 추가

    return sections  # 섹션 리스트 반환

# 섹션 데이터를 JSON 형식으로 포맷팅하는 함수
def format_to_json(title, sub_title, author, sections):
    data = {
        "title": title,
        "subTitle": sub_title,
        "author": author,
        "sections": sections
    }
    return json.dumps(data, ensure_ascii=False, indent=4)  # JSON 형식으로 반환

# 메인 함수
def main():
    pdf_path = "woori_second.pdf"  # PDF 파일 경로
    title = "개인형퇴직연금(기업형) 운용관리계약서"  # 제목 설정
    sub_title = "우리은행, 2024.04.01 개정"  # 부제목 설정
    author = "우리은행"  # 저자 설정

    text, grids, files, yellow_highlighted_files = extract_text_from_pdf(pdf_path)  # PDF에서 텍스트 및 기타 요소 추출
    sections = split_into_sections(text, grids, files, yellow_highlighted_files)  # 추출된 텍스트를 섹션으로 분할
    json_data = format_to_json(title, sub_title, author, sections)  # 섹션 데이터를 JSON 형식으로 변환

    # JSON 데이터를 파일로 저장
    with open("woori_second.json", "w", encoding="utf-8") as json_file:
        json_file.write(json_data)

    print("JSON data has been saved to output.json")

# 메인 함수 실행
if __name__ == "__main__":
    main()
