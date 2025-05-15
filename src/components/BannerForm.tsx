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
    <form onSubmit={handleSubmit} style={{marginBottom: 0}}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="size" className="form-label">
            이미지 크기
          </label>
          <select
            id="size"
            name="size"
            value={form.size}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="1024x1024">1024x1024 (정사각형)</option>
            <option value="1024x1792">1024x1792 (세로형)</option>
            <option value="1792x1024">1792x1024 (가로형)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="fileFormat" className="form-label">
            파일 형식
          </label>
          <select
            id="fileFormat"
            name="fileFormat"
            value={form.fileFormat}
            onChange={handleChange}
            className="form-control"
          >
            <option value="url">URL</option>
            <option value="b64_json">Base64</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="fileSize" className="form-label">
            파일 크기 제한
          </label>
          <input
            type="text"
            id="fileSize"
            name="fileSize"
            value={form.fileSize}
            onChange={handleChange}
            className="form-control"
            placeholder="예: 1MB"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="target" className="form-label">
            타겟 고객층
          </label>
          <input
            type="text"
            id="target"
            name="target"
            value={form.target}
            onChange={handleChange}
            className="form-control"
            placeholder="예: 20-30대 여성"
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="text" className="form-label">
          배너 문구
        </label>
        <textarea
          id="text"
          name="text"
          value={form.text}
          onChange={handleChange}
          rows={3}
          className="form-control"
          placeholder="배너에 포함할 문구를 입력하세요"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="additionalRequirements" className="form-label">
          추가 요청사항
        </label>
        <textarea
          id="additionalRequirements"
          name="additionalRequirements"
          value={form.additionalRequirements}
          onChange={handleChange}
          rows={4}
          className="form-control"
          placeholder="배너 디자인에 대한 추가 요청사항이나 원하는 스타일, 색상, 분위기 등을 자유롭게 입력해주세요"
        />
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            브랜드 로고 이미지
          </label>
          <div 
            {...logoDropzone.getRootProps()} 
            className="dropzone"
          >
            <div className="dropzone-content">
              <svg className="dropzone-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <input {...logoDropzone.getInputProps()} />
              {logoImage ? (
                <p style={{fontWeight: 500, color: '#4338ca'}}>{logoImage.name}</p>
              ) : (
                <div>
                  <p style={{fontWeight: 500, color: '#4f46e5', fontSize: '0.875rem'}}>로고 이미지 업로드</p>
                  <p style={{color: '#6b7280', fontSize: '0.75rem'}}>드래그 앤 드롭 또는 클릭</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">
            제품 이미지
          </label>
          <div 
            {...productDropzone.getRootProps()} 
            className="dropzone"
          >
            <div className="dropzone-content">
              <svg className="dropzone-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <input {...productDropzone.getInputProps()} />
              {productImage ? (
                <p style={{fontWeight: 500, color: '#4338ca'}}>{productImage.name}</p>
              ) : (
                <div>
                  <p style={{fontWeight: 500, color: '#4f46e5', fontSize: '0.875rem'}}>제품 이미지 업로드</p>
                  <p style={{color: '#6b7280', fontSize: '0.75rem'}}>드래그 앤 드롭 또는 클릭</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="form-group" style={{marginTop: '1.5rem', marginBottom: 0}}>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary btn-block"
          style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}
        >
          {isLoading ? (
            <>
              <svg className="spinner" style={{width: '1.25rem', height: '1.25rem'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle style={{opacity: '0.25'}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path style={{opacity: '0.75'}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              배너 생성 중...
            </>
          ) : '배너 생성하기'}
        </button>
      </div>
    </form>
  );
};

export default BannerForm; 