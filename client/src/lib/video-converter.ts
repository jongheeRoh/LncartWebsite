// YouTube URL을 iframe으로 변환하는 유틸리티

export function convertYouTubeUrlsToIframes(content: string): string {
  if (!content) return content;

  let processedContent = content;

  // 1. YouTube 마커 패턴 처리 [YOUTUBE_VIDEO:videoId]
  const markerPattern = /\[YOUTUBE_VIDEO:([a-zA-Z0-9_-]{11})\]/g;
  processedContent = processedContent.replace(markerPattern, (match, videoId) => {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return `<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 24px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); background: #000;">
      <iframe 
        src="${embedUrl}" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
        allowfullscreen 
        frameborder="0"
        loading="eager"
      ></iframe>
    </div>`;
  });

  // 2. 일반 YouTube URL 패턴들
  const youtubePatterns = [
    /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/g,
    /https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/g,
    /https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/g
  ];

  youtubePatterns.forEach(pattern => {
    processedContent = processedContent.replace(pattern, (match, videoId) => {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      
      return `<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 24px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); background: #000;">
        <iframe 
          src="${embedUrl}" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
          allowfullscreen 
          frameborder="0"
          loading="eager"
        ></iframe>
      </div>`;
    });
  });

  return processedContent;
}

// 일반 텍스트에서 YouTube URL 감지
export function detectYouTubeUrls(text: string): string[] {
  const urls: string[] = [];
  const patterns = [
    /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/g,
    /https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/g
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      urls.push(match[0]);
    }
  });

  return urls;
}

// YouTube URL을 embed URL로 변환
export function convertToEmbedUrl(url: string): string {
  let videoId = '';
  
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0] || '';
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
  }
  
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}