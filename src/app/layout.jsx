import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr" 
});

export const metadata = {
  title: "AI 배너 이미지 생성기",
  description: "GPT 이미지 생성 모델을 활용하여 맞춤형 광고 배너를 생성하는 웹 애플리케이션입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${notoSansKr.variable} font-sans min-h-full bg-gradient-to-br from-gray-50 to-blue-50`}>
        {children}
      </body>
    </html>
  );
} 