import React, { useState, useRef } from 'react';
import { Send, Image as ImageIcon, Mic, X, Loader2, Square } from 'lucide-react';

export default function ChatInput({ onSendMessage, isTyping }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        await handleTranscription(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Microphone error:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTranscription = async (audioBlob) => {
    setIsTranscribing(true);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.text) {
        setText((prev) => prev + (prev ? ' ' : '') + data.text);
      } else {
        throw new Error(data.error || 'Transcription failed');
      }
    } catch (error) {
      alert('Failed to transcribe audio.');
      console.error(error);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    onSendMessage({ text, image, imagePreview });
    setText('');
    removeImage();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-input-area">
      {imagePreview && (
        <div className="image-preview-container">
          <img src={imagePreview} alt="Preview" />
          <span className="preview-text">{image.name}</span>
          <button type="button" onClick={removeImage} title="Remove image">
            <X size={14} />
          </button>
        </div>
      )}

      {isRecording && (
        <div className="voice-recording-status">
          <span style={{flex: 1}}>Recording in progress...</span>
          <button type="button" onClick={stopRecording} style={{background:'transparent', border:'none', color:'#ef4444', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px'}}>
            <Square size={14} fill="currentColor" /> Stop
          </button>
        </div>
      )}
      
      {isTranscribing && (
        <div className="voice-recording-status" style={{color: '#64748b', background: '#f8fafc'}}>
          <Loader2 size={14} className="lucide-spin" /> Transcribing...
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-input-wrapper">
        <input 
          type="file" 
          accept="image/*" 
          style={{ display: 'none' }} 
          ref={fileInputRef} 
          onChange={handleImageChange}
        />
        
        <button 
          type="button" 
          className="icon-button" 
          onClick={() => fileInputRef.current?.click()}
          title="Upload Image"
        >
          <ImageIcon size={20} />
        </button>

        <textarea 
          placeholder="Ask me anything..." 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping || isRecording || isTranscribing}
          rows={1}
        />

        <button 
          type="button" 
          className={`icon-button ${isRecording ? 'recording' : ''}`} 
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isTyping || isTranscribing}
          title={isRecording ? "Stop Recording" : "Use Microphone"}
        >
          <Mic size={20} />
        </button>

        <button 
          type="submit" 
          className="send-button" 
          disabled={isTyping || (!text.trim() && !image) || isRecording || isTranscribing}
          title="Send Message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
