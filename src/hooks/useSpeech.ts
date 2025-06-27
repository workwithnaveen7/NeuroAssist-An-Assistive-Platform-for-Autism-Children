import { useCallback } from 'react';

export const useSpeech = () => {
  const speak = useCallback((text: string, options?: { rate?: number; pitch?: number; volume?: number }) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options?.rate || 0.8;
      utterance.pitch = options?.pitch || 1.2;
      utterance.volume = options?.volume || 1;
      
      // Try to use a child-friendly voice if available
      const voices = window.speechSynthesis.getVoices();
      const childVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('child') || 
        voice.name.toLowerCase().includes('female')
      );
      
      if (childVoice) {
        utterance.voice = childVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return { speak };
};