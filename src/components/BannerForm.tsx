import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

type BannerFormProps = {
  onGenerate: (formData: FormData) => void;
  isLoading: boolean;
};

const BannerForm = ({ onGenerate, isLoading }: BannerFormProps) => {
  const [form, setForm] = useState({
    size: '1024x1024',
    fileSize: '1MB',
    target: '',
    text: '',
    fileFormat: 'url',
    additionalRequirements: ''
  });
  
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const logoDropzone = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.svg']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setLogoImage(acceptedFiles[0]);
    }
  });

  const productDropzone = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setProductImage(acceptedFiles[0]);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    
    // 폼 데이터 추가
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    // 이미지 파일 추가
    if (logoImage) {
      formData.append('logoImage', logoImage);
    }
    
    if (productImage) {
      formData.append('productImage', productImage);
    }
    
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">
            이미지 크기
          </label>
          <select
            id="size"
            name="size"
            value={form.size}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="1024x1024">1024x1024 (정사각형)</option>
            <option value="1024x1792">1024x1792 (세로형)</option>
            <option value="1792x1024">1792x1024 (가로형)</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="fileFormat" className="block text-sm font-medium text-gray-700">
            파일 형식
          </label>
          <select
            id="fileFormat"
            name="fileFormat"
            value={form.fileFormat}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="url">URL</option>
            <option value="b64_json">Base64</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="fileSize" className="block text-sm font-medium text-gray-700">
            파일 크기 제한
          </label>
          <input
            type="text"
            id="fileSize"
            name="fileSize"
            value={form.fileSize}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="예: 1MB"
          />
        </div>
        
        <div>
          <label htmlFor="target" className="block text-sm font-medium text-gray-700">
            타겟 고객층
          </label>
          <input
            type="text"
            id="target"
            name="target"
            value={form.target}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="예: 20-30대 여성"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          배너 문구
        </label>
        <textarea
          id="text"
          name="text"
          value={form.text}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="배너에 포함할 문구를 입력하세요"
          required
        />
      </div>
      
      <div>
        <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700">
          추가 요청사항
        </label>
        <textarea
          id="additionalRequirements"
          name="additionalRequirements"
          value={form.additionalRequirements}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="배너 디자인에 대한 추가 요청사항이나 원하는 스타일, 색상, 분위기 등을 자유롭게 입력해주세요"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            브랜드 로고 이미지
          </label>
          <div 
            {...logoDropzone.getRootProps()} 
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
          >
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input {...logoDropzone.getInputProps()} />
              {logoImage ? (
                <p className="text-sm text-gray-500">{logoImage.name}</p>
              ) : (
                <p className="text-sm text-gray-500">로고 이미지를 드래그하거나 클릭하여 업로드하세요</p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            제품 이미지
          </label>
          <div 
            {...productDropzone.getRootProps()} 
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
          >
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input {...productDropzone.getInputProps()} />
              {productImage ? (
                <p className="text-sm text-gray-500">{productImage.name}</p>
              ) : (
                <p className="text-sm text-gray-500">제품 이미지를 드래그하거나 클릭하여 업로드하세요</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? '생성 중...' : '배너 생성하기'}
        </button>
      </div>
    </form>
  );
};

export default BannerForm; 