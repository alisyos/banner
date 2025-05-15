import Image from 'next/image';
import { useState } from 'react';

const BannerPreview = ({ imageUrl, imageBase64 }) => {
  const [copied, setCopied] = useState(false);

  // 이미지가 없을 경우
  if (!imageUrl && !imageBase64) {
    return (
      <div className="preview-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" style={{width: '4rem', height: '4rem', color: '#a5b4fc', marginBottom: '1rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p style={{color: '#4f46e5', fontWeight: 500, textAlign: 'center'}}>생성된 배너 이미지가 여기에 표시됩니다.</p>
        <p style={{color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', marginTop: '0.5rem'}}>좌측 폼을 작성하고 생성 버튼을 클릭하세요</p>
      </div>
    );
  }

  // URL 복사 기능
  const copyToClipboard = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 이미지 다운로드 기능
  const downloadImage = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'banner-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (imageBase64) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${imageBase64}`;
      link.download = 'banner-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{marginBottom: 0}}>
      <div className="preview-image">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Generated Banner" 
            style={{width: '100%', height: 'auto'}}
          />
        ) : imageBase64 ? (
          <img 
            src={`data:image/png;base64,${imageBase64}`} 
            alt="Generated Banner" 
            style={{width: '100%', height: 'auto'}}
          />
        ) : null}
      </div>
      
      <div className="preview-actions">
        {imageUrl && (
          <button
            onClick={copyToClipboard}
            className="btn btn-secondary"
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={{width: '1.25rem', height: '1.25rem', marginRight: '0.5rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {copied ? '복사 완료!' : 'URL 복사'}
          </button>
        )}
        
        <button
          onClick={downloadImage}
          className="btn btn-primary"
          style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" style={{width: '1.25rem', height: '1.25rem', marginRight: '0.5rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          이미지 다운로드
        </button>
      </div>
    </div>
  );
};

export default BannerPreview; 