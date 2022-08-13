const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,

  },
  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot:'/home/harish/startup'
  },
  trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        vc: "copy",
        vcParam: [],
        ac: "aac",
        acParam: ['-ab', '64k', '-ac', '1', '-ar', '44100'],
        rtmp:true,
        rtmpApp:'live2',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=0:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      },
      {
        app: 'live',
        mp4: true,
        mp4Flags: '[movflags=frag_keyframe+empty_moov]',
      }
    ]
  }
};

var nms = new NodeMediaServer(config)
nms.run();