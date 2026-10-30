import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Loader2, AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  src: string;
  autoPlay ? : boolean;
  onError ? : (message: string) => void;
}

export function VideoPlayer({ src, autoPlay = true, onError }: Props) {
  const videoRef = useRef < HTMLVideoElement > (null);
  const hlsRef = useRef < Hls | null > (null);
  const [status, setStatus] = useState < 'loading' | 'playing' | 'error' > ('loading');
  const [errorMsg, setErrorMsg] = useState('');
  
  const cleanup = () => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
  };
  
  const attach = () => {
    const video = videoRef.current;
    if (!video) return;
    
    cleanup();
    setStatus('loading');
    setErrorMsg('');
    
    // Native HLS (Safari, iOS)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => setStatus('playing'), { once: true });
      video.addEventListener('error', () => {
        setStatus('error');
        setErrorMsg('This stream could not be played natively.');
        onError?.('Native playback failed');
      }, { once: true });
      if (autoPlay) {
        video.play().catch(() => {
          // Autoplay blocked — user must press play
        });
      }
      return;
    }
    
    // hls.js fallback
    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });
      hlsRef.current = hls;
      
      hls.loadSource(src);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setStatus('playing');
        if (autoPlay) {
          video.play().catch(() => {
            // Autoplay restricted
          });
        }
      });
      
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setErrorMsg('Network error — the stream may be offline.');
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setErrorMsg('Media error — the stream format may be unsupported.');
              break;
            default:
              setErrorMsg('This stream is unavailable.');
          }
          setStatus('error');
          onError?.(data.details);
          cleanup();
        }
      });
      return;
    }
    
    setStatus('error');
    setErrorMsg('Your browser does not support HLS playback.');
  };
  
  useEffect(() => {
    attach();
    return cleanup;
  }, [src]);
  
  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden">
      <video
        ref={videoRef}
        controls
        playsInline
        className="w-full h-full"
        onPlay={() => setStatus('playing')}
      />

      {status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 gap-3">
          <Loader2 className="w-10 h-10 text-brand animate-spin" />
          <p className="text-sm text-white/70">Connecting to stream…</p>
        </div>
      )}

      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 gap-4 p-6 text-center">
          <AlertCircle className="w-10 h-10 text-danger" />
          <p className="text-sm text-white/80 max-w-sm">{errorMsg}</p>
          <button
            onClick={attach}
            className="flex items-center gap-2 px-5 py-2.5 rounded-pill bg-brand text-white text-sm font-medium hover:bg-brand-deep transition"
          >
            <RotateCcw className="w-4 h-4" />
            Retry
          </button>
        </div>
      )}
    </div>
  );
}