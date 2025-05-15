'use client';

import { useState } from 'react';
import BannerForm from '../components/BannerForm';
import BannerPreview from '../components/BannerPreview';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [bannerData, setBannerData] = useState<{
    url?: string;
    b64_json?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 파일을 Base64로 변환하는 함수
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // data:image/jpeg;base64, 부분 제거
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('파일 인코딩 실패'));
        }
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleGenerateBanner = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 폼 데이터를 JSON으로 변환
      const jsonData: Record<string, any> = {};
      formData.forEach((value, key) => {
        if (key !== 'logoImage' && key !== 'productImage') {
          jsonData[key] = value;
        }
      });
      
      // 이미지 파일 처리
      const logoImage = formData.get('logoImage') as File;
      const productImage = formData.get('productImage') as File;
      
      // 로고 이미지 변환
      if (logoImage && logoImage.size > 0) {
        console.log('로고 이미지 변환 중...', logoImage.name);
        try {
          const logoBase64 = await fileToBase64(logoImage);
          jsonData.logoImage = logoBase64;
          console.log('로고 이미지 변환 완료');
        } catch (err) {
          console.error('로고 이미지 변환 오류:', err);
        }
      }
      
      // 제품 이미지 변환
      if (productImage && productImage.size > 0) {
        console.log('제품 이미지 변환 중...', productImage.name);
        try {
          const productBase64 = await fileToBase64(productImage);
          jsonData.productImage = productBase64;
          console.log('제품 이미지 변환 완료');
        } catch (err) {
          console.error('제품 이미지 변환 오류:', err);
        }
      }
      
      console.log('API 요청 준비 완료', Object.keys(jsonData));
      
      // API 호출
      const response = await fetch('/api/generate-banner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || '배너 생성에 실패했습니다.');
      }
      
      setBannerData(result.data);
    } catch (err) {
      console.error('Error generating banner:', err);
      setError(typeof err === 'object' && err !== null && 'message' in err
        ? (err as Error).message
        : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12 md:p-24">
      <div className="w-full max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">AI 배너 이미지 생성기</h1>
          <p className="text-gray-600">
            GPT 이미지 생성 모델을 활용하여 맞춤형 광고 배너를 생성해 드립니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">배너 설정</h2>
            <BannerForm 
              onGenerate={handleGenerateBanner} 
              isLoading={isLoading} 
            />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">생성된 배너</h2>
            {error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                {error}
              </div>
            ) : (
              <BannerPreview 
                imageUrl={bannerData?.url} 
                imageBase64={bannerData?.b64_json} 
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
