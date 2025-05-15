import Image from 'next/image';
import { useState } from 'react';

type BannerPreviewProps = {
  imageUrl?: string;
  imageBase64?: string;
};

const BannerPreview = ({ imageUrl, imageBase64 }: BannerPreviewProps) => {
  const [copied, setCopied] = useState(false);

  // 이미지가 없을 경우
  if (!imageUrl && !imageBase64) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-gray-500 text-center">생성된 배너 이미지가 여기에 표시됩니다.</p>
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
    <div className="space-y-4">
      <div className="relative border border-gray-200 rounded-md overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Generated Banner" 
            className="w-full h-auto"
          />
        ) : imageBase64 ? (
          <img 
            src={`data:image/png;base64,${imageBase64}`} 
            alt="Generated Banner" 
            className="w-full h-auto"
          />
        ) : null}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        {imageUrl && (
          <button
            onClick={copyToClipboard}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {copied ? '복사됨!' : 'URL 복사'}
          </button>
        )}
        
        <button
          onClick={downloadImage}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          이미지 다운로드
        </button>
      </div>
    </div>
  );
};

export default BannerPreview; 