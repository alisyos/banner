'use client';

import { useState } from 'react';
import BannerForm from '../components/BannerForm';
import BannerPreview from '../components/BannerPreview';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [bannerData, setBannerData] = useState(null);
  const [error, setError] = useState(null);

  // 파일을 Base64로 변환하는 함수
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // data:image/jpeg;base64, 부분 제거
          const base64 = reader.result;
          resolve(base64);
        } else {
          reject(new Error('파일 인코딩 실패'));
        }
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleGenerateBanner = async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 폼 데이터를 JSON으로 변환
      const jsonData = {};
      formData.forEach((value, key) => {
        if (key !== 'logoImage' && key !== 'productImage') {
          jsonData[key] = value;
        }
      });
      
      // 이미지 파일 처리
      const logoImage = formData.get('logoImage');
      const productImage = formData.get('productImage');
      
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
        ? err.message
        : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* 헤더 */}
      <header>
        <div className="container">
          <h1>AI 배너 이미지 생성기</h1>
          <p>
            GPT 이미지 생성 모델을 활용하여 맞춤형 광고 배너를 생성해 드립니다.
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main>
        <div className="container">
          <div className="grid">
            <div className="card">
              <div className="card-header">
                <h2>배너 설정</h2>
              </div>
              <div className="card-body">
                <BannerForm 
                  onGenerate={handleGenerateBanner} 
                  isLoading={isLoading} 
                />
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h2>생성된 배너</h2>
              </div>
              <div className="card-body">
                {error ? (
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fee2e2',
                    borderRadius: '0.5rem',
                    color: '#b91c1c'
                  }}>
                    <p style={{display: 'flex', alignItems: 'center'}}>
                      <svg xmlns="http://www.w3.org/2000/svg" style={{width: '1.25rem', height: '1.25rem', marginRight: '0.5rem'}} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </p>
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
        </div>
      </main>

      {/* 푸터 */}
      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} AI 배너 이미지 생성기. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 