import { useState } from 'react';
import { FiFile, FiTrash2, FiUploadCloud } from 'react-icons/fi';
import api, { apiError } from '../lib/api';

const allowedTypes = new Set(['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/webp']);
const maxBytes = 10 * 1024 * 1024;

export default function FileUploader({ value, onChange, maxFiles = 10 }) {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  async function upload(selection) {
    const chosen = Array.from(selection).slice(0, Math.max(0, Math.min(5, maxFiles - value.length)));
    if (!chosen.length) { setError(`You can attach up to ${maxFiles} files.`); return; }
    const invalid = chosen.find((file) => !allowedTypes.has(file.type) || file.size > maxBytes);
    if (invalid) { setError(`${invalid.name}: choose a PDF, DOCX or image up to 10 MB.`); return; }
    const body = new FormData();
    chosen.forEach((file) => body.append('files', file));
    setError(''); setProgress(0);
    try {
      const response = await api.post('/public/upload', body, {
        onUploadProgress: (event) => setProgress(event.total ? Math.round((event.loaded * 100) / event.total) : null),
      });
      const uploaded = response.data.data;
      setFiles((current) => [...current, ...uploaded]);
      onChange([...value, ...uploaded.map((file) => file.id)]);
      setProgress(100);
    } catch (cause) {
      setError(apiError(cause)); setProgress(null);
    }
  }

  function onSelect(event) {
    if (event.target.files) void upload(event.target.files);
    event.target.value = '';
  }

  function onDrop(event) {
    event.preventDefault(); setDragging(false);
    void upload(event.dataTransfer.files);
  }

  function remove(id) {
    setFiles((current) => current.filter((file) => file.id !== id));
    onChange(value.filter((fileId) => fileId !== id));
  }

  return <div className="file-uploader">
    <label className={`upload-box${dragging ? ' is-dragging' : ''}`} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop}>
      <FiUploadCloud aria-hidden="true" />
      <span>Drop files here or browse</span>
      <small>PDF, DOCX, JPG, PNG or WEBP · 10 MB maximum</small>
      <input type="file" multiple accept=".pdf,.docx,.png,.jpg,.jpeg,.webp" onChange={onSelect} disabled={value.length >= maxFiles || progress !== null && progress < 100} />
    </label>
    {progress !== null && <div className="upload-progress" role="status"><span>{progress === 100 ? 'Upload complete' : `Uploading ${progress}%`}</span><progress max="100" value={progress} /></div>}
    {error && <p className="field-error" role="alert">{error}</p>}
    {value.length > 0 && <ul className="uploaded-files">{value.map((id) => {
      const file = files.find((item) => item.id === id);
      return <li key={id}>{file?.mimeType?.startsWith('image/') ? <img src={file.url} alt="Uploaded document preview" /> : <FiFile aria-hidden="true" />}<span>{file?.originalName || 'Previously uploaded document'}</span>{file && <small>{(file.size / 1024 / 1024).toFixed(1)} MB</small>}<button type="button" aria-label={`Remove ${file?.originalName || 'document'}`} onClick={() => remove(id)}><FiTrash2 /></button></li>;
    })}</ul>}
  </div>;
}
