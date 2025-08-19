var elms = [
  'ipPlayBtn', 'spacesPlayBtn',
  'ipDemoRadio', 'ipMasterRadio',
  'spacesDemoRadio', 'spacesMasterRadio',
  'ipProgressBar', 'spacesProgressBar'
];

elms.forEach(function(elm) {
  window[elm] = document.getElementById(elm);
});

function loadSongs() {
  // --- Initialize Howler tracks ---
  const tracks = {
    ip: {
      demo: new Howl({ src: ['../sounds/ip-demo.mp3'], loop: true, volume: 1.0 }),
      master: new Howl({ src: ['../sounds/ip-master.mp3'], loop: true, volume: 0.0 }),
      progressBar: ipProgressBar,
      anim: null
    },
    spaces: {
      demo: new Howl({ src: ['../sounds/spaces-demo.mp3'], loop: true, volume: 1.0 }),
      master: new Howl({ src: ['../sounds/spaces-master.mp3'], loop: true, volume: 0.0 }),
      progressBar: spacesProgressBar,
      anim: null
    }
  };

  // --- Utility to stop other song ---
  function stopOther(current) {
    for (let key in tracks) {
      if (key !== current) {
        tracks[key].demo.pause();
        tracks[key].master.pause();
        cancelAnimationFrame(tracks[key].anim);
        // tracks[key].progressBar.style.width = '0%';
      }
    }
  }

  // --- Update progress bar ---
  function updateProgress(track) {
    const seek = track.demo.seek() || 0;
    const dur = track.demo.duration() || 1;
    const pct = (seek / dur) * 100;

    track.progressBar.style.width = pct + '%';
    track.progressBar.setAttribute('aria-valuenow', pct.toFixed(1));

    if (track.demo.playing()) {
      track.anim = requestAnimationFrame(() => updateProgress(track));
    }
  }

  // --- Play/pause buttons ---
  ipPlayBtn.addEventListener('click', () => {
    if (!tracks.ip.demo.playing()) {
      stopOther('ip');
      tracks.ip.demo.play();
      tracks.ip.master.play();
      requestAnimationFrame(() => updateProgress(tracks.ip));
    } else {
      tracks.ip.demo.pause();
      tracks.ip.master.pause();
      cancelAnimationFrame(tracks.ip.anim);
    }
  });

  spacesPlayBtn.addEventListener('click', () => {
    if (!tracks.spaces.demo.playing()) {
      stopOther('spaces');
      tracks.spaces.demo.play();
      tracks.spaces.master.play();
      requestAnimationFrame(() => updateProgress(tracks.spaces));
    } else {
      tracks.spaces.demo.pause();
      tracks.spaces.master.pause();
      cancelAnimationFrame(tracks.spaces.anim);
    }
  });

  // Sync button visuals with actual playback
  tracks.ip.demo.on('play', () => ipPlayBtn.classList.add('active'));
  tracks.ip.demo.on('pause', () => ipPlayBtn.classList.remove('active'));
  
  tracks.spaces.demo.on('play', () => spacesPlayBtn.classList.add('active'));
  tracks.spaces.demo.on('pause', () => spacesPlayBtn.classList.remove('active'));
  
  // --- Demo/Master radio buttons ---
  ipDemoRadio.addEventListener('click', () => {
    tracks.ip.demo.volume(1.0);
    tracks.ip.master.volume(0.0);
  });
  ipMasterRadio.addEventListener('click', () => {
    tracks.ip.demo.volume(0.0);
    tracks.ip.master.volume(1.0);
  });

  spacesDemoRadio.addEventListener('click', () => {
    tracks.spaces.demo.volume(1.0);
    tracks.spaces.master.volume(0.0);
  });
  spacesMasterRadio.addEventListener('click', () => {
    tracks.spaces.demo.volume(0.0);
    tracks.spaces.master.volume(1.0);
  });

  // --- Clickable progress bars for seeking ---
  function setupSeek(track) {
    track.progressBar.parentNode.addEventListener('click', (e) => {
      const rect = track.progressBar.parentNode.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = clickX / rect.width;
      const newTime = track.demo.duration() * pct;
      track.demo.seek(newTime);
      track.master.seek(newTime);
      updateProgress(track);
    });
  }

  setupSeek(tracks.ip);
  setupSeek(tracks.spaces);
}
