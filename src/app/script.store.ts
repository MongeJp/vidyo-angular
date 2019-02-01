interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  {
    name: 'videoClient',
    src: 'https://static.vidyo.io/latest/javascript/VidyoClient/VidyoClient.js?onload=onVidyoClientLoaded&webrtc=1&plugin=0'
  }
];
