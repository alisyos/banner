# AI 배너 이미지 생성기

OpenAI의 DALL-E 3 API를 활용한, 맞춤형 광고 배너 이미지 생성 웹 애플리케이션입니다.

## 주요 기능

- 이미지 크기, 파일 크기, 타겟 고객층 등을 지정하여 배너 생성
- 브랜드 로고 및 제품 이미지 업로드 지원
- 배너에 포함할 문구 입력 기능
- 다양한 파일 형식으로 배너 생성
- 생성된 배너 다운로드 기능

## 설치 방법

1. 저장소 클론:

```bash
git clone https://github.com/yourusername/banner-generator.git
cd banner-generator
```

2. 의존성 설치:

```bash
npm install
```

3. 환경 변수 설정:
   
`.env.local` 파일을 생성하고 OpenAI API 키를 입력합니다:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## 실행 방법

개발 서버 실행:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 애플리케이션을 사용할 수 있습니다.

## 기술 스택

- [Next.js](https://nextjs.org/) - React 프레임워크
- [React](https://reactjs.org/) - 사용자 인터페이스 라이브러리
- [OpenAI API](https://openai.com/) - DALL-E 3 이미지 생성 API
- [Tailwind CSS](https://tailwindcss.com/) - 스타일링
- [React Dropzone](https://react-dropzone.js.org/) - 파일 업로드 처리

## 라이센스

MIT

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
