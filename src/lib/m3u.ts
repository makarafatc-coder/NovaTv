import { parse } from 'iptv-m3u-playlist-parser';

export interface ParsedChannel {
  name: string;
  stream_url: string;
  logo_url: string | null;
  group_title: string;
  tvg_id: string | null;
  tvg_name: string | null;
  tvg_chno: string | null;
  stream_type: 'hls' | 'mp4' | 'unknown';
}

const ALLOWED_PROTOCOLS = ['https:', 'http:'];

export function validateStreamUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_PROTOCOLS.includes(parsed.protocol);
  } catch {
    return false;
  }
}

export async function fetchAndParseM3U(
  playlistUrl: string,
  timeoutMs = 15000
): Promise < ParsedChannel[] > {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const res = await fetch(playlistUrl, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const text = await res.text();
    const parsed = parse(text);
    
    const channels: ParsedChannel[] = [];
    
    for (const item of parsed.items) {
      if (!item.url || !validateStreamUrl(item.url)) continue;
      
      const attrs = item.attributes ?? {};
      const streamType = item.url.includes('.m3u8') ?
        'hls' :
        item.url.includes('.mp4') ?
        'mp4' :
        'unknown';
      
      channels.push({
        name: item.name?.trim() || attrs['tvg-name'] || 'Unnamed Channel',
        stream_url: item.url.trim(),
        logo_url: attrs['tvg-logo']?.trim() || null,
        group_title: attrs['group-title']?.trim() || 'Other',
        tvg_id: attrs['tvg-id']?.trim() || null,
        tvg_name: attrs['tvg-name']?.trim() || null,
        tvg_chno: attrs['tvg-chno']?.trim() || null,
        stream_type: streamType,
      });
    }
    
    return channels;
  } finally {
    clearTimeout(timer);
  }
}