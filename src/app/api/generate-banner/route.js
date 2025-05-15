import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Buffer } from 'buffer';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    console.log('API 요청 받음');
    const body = await req.json();
    console.log('요청 바디 키:', Object.keys(body));
    
    const {
      size,
      fileSize,
      target,
      logoImage,
      productImage,
      text,
      fileFormat,
      additionalRequirements
    } = body;

    console.log('로고 이미지 데이터:', logoImage ? `Base64 데이터 (${logoImage.substring(0, 20)}...)` : '없음');
    console.log('제품 이미지 데이터:', productImage ? `Base64 데이터 (${productImage.substring(0, 20)}...)` : '없음');

    // 텍스트 프롬프트 생성
    let prompt = `다음 정보를 바탕으로 매력적인 온라인 광고 배너를 생성해주세요:

[배너 상세 정보]
* 크기: ${size}
* 타겟 고객층: ${target}
* 포함할 텍스트: ${text}
${additionalRequirements ? `* 추가 요청사항: ${additionalRequirements}` : ''}

[디자인 지침]
* 광고 목적: 제품의 주요 장점, 할인 혜택, 체험 이벤트 등을 강조하여 클릭을 유도
* 이미지 구성 요소: 브랜드 로고 또는 이름 (상단 또는 상단 좌측)
* 주제 문구/문제 제기 (강조할 단어는 컬러 또는 굵기 차별화)
* 제품 이미지 (선명하고 깔끔한 배경에서 강조되도록 배치)
* 주요 혜택 문구 (할인율, 체험 키트, 한정 수량 등)
* 행동 유도 버튼 (CTA) – 예: 신청하기, 30% 할인 받기, 지금 구매하기

[스타일 가이드]
* 폰트: 깔끔하고 가독성 높은 스타일 (예: 나눔고딕, Spoqa Han Sans)
* 색상: 브랜드 컬러를 반영하되, 강조 문구는 대비 컬러로 처리
* 레이아웃: 2~3단 구성 권장 (좌측 텍스트, 우측 제품 / 상단 브랜드, 하단 CTA 등)`;

    if (logoImage) {
      prompt += '\n\n[로고 정보: 브랜드 로고를 배너 상단 또는 상단 좌측에 배치해주세요.]';
    }
    
    if (productImage) {
      prompt += '\n\n[제품 정보: 제품 이미지를 배너 중앙 또는 우측에 배치해주세요.]';
    }

    console.log('OpenAI API 호출 시작...');
    
    // 기본 이미지 생성 API 사용
    console.log('기본 이미지 생성 API 호출...');
    const imageResponse = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: size,
      quality: "high",
      output_format: fileFormat || "png"
    });
    
    if (!imageResponse.data || imageResponse.data.length === 0) {
      throw new Error('이미지 생성 결과가 없습니다.');
    }
    
    return NextResponse.json({
      success: true,
      data: imageResponse.data[0],
      note: "gpt-image-1 모델을 사용하여 배너를 생성했습니다."
    });

  } catch (error) {
    console.error('배너 생성 오류:', error);
    if (error instanceof Error) {
      console.error('에러 메시지:', error.message);
      console.error('에러 스택:', error.stack);
    }
    
    // 에러 응답
    return NextResponse.json(
      { success: false, error: `배너 생성 중 오류가 발생했습니다: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
} 