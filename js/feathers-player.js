var elms = ['ipPlayBtn', 'spacesPlayBtn', 'ipDemoRadio', 'ipMasterRadio', 'spacesDemoRadio', 'spacesMasterRadio', 'ipProgressBar'];

elms.forEach(function(elm) {
  window[elm] = document.getElementById(elm);
});

function loadSongs() {
	var ipDemo = new Howl({
	  src: ['../sounds/ip-demo.mp3'],
	  preload: true,
	  loop: true,
	  volume: 1.0
	});
	var ipMaster = new Howl({
	  src: ['../sounds/ip-master.mp3'],
	  preload: true,
	  loop: true,
	  volume: 0.0
	});
	var spacesDemo = new Howl({
	  src: ['../sounds/spaces-demo.mp3'],
	  preload: true,
	  loop: true,
	  volume: 1.0
	});
	var spacesMaster = new Howl({
	  src: ['../sounds/spaces-master.mp3'],
	  preload: true,
	  loop: true,
	  volume: 0.0
	});

	ipPlayBtn.addEventListener('click', function() {
	  if (ipDemo.playing() == false) {
	  ipDemo.play();
	  ipMaster.play();
	  } else {
		ipDemo.pause();
		ipMaster.pause();
	  };
	});

	ipDemoRadio.addEventListener('click', function() {
	  ipDemo.volume(1.0);
	  ipMaster.volume(0.0);
	});

	ipMasterRadio.addEventListener('click', function() {
	  ipDemo.volume(0.0);
	  ipMaster.volume(1.0);
	});

	spacesPlayBtn.addEventListener('click', function() {
	    if (spacesDemo.playing() == false) {
	  spacesDemo.play();
	  spacesMaster.play();
	  } else {
		spacesDemo.pause();
		spacesMaster.pause();
	  };
	});

	spacesDemoRadio.addEventListener('click', function() {
	  spacesDemo.volume(1.0);
	  spacesMaster.volume(0.0);
	});

	spacesMasterRadio.addEventListener('click', function() {
	  spacesDemo.volume(0.0);
	  spacesMaster.volume(1.0);
	});
	
	// Use ipDemo as the "timekeeper"
function updateIpProgress() {
  const seek = ipDemo.seek() || 0;
  const dur = ipDemo.duration() || 1;
  const pct = (seek / dur) * 100;
  ipBar.style.width = pct + '%';
  ipBar.setAttribute('aria-valuenow', pct.toFixed(1));
  if (ipDemo.playing()) {
    ipAnim = requestAnimationFrame(updateIpProgress);
  }
}

// Seek on click updates *both* so they stay in sync
ipBar.parentNode.addEventListener('click', function(e) {
  const rect = this.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const pct = clickX / rect.width;
  const newTime = ipDemo.duration() * pct;
  ipDemo.seek(newTime);
  ipMaster.seek(newTime); // keep in lockstep
  updateIpProgress();
});

};
