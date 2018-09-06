var elms = ['ipPlayBtn', 'spacesPlayBtn', 'ipDemoRadio', 'ipMasterRadio', 'spacesDemoRadio', 'spacesMasterRadio'];

elms.forEach(function(elm) {
  window[elm] = document.getElementById(elm);
});

function loadAll() {
var ipDemo = new Howl({
  src: ['../sounds/ip-Demo.mp3'],
  preload: true,
  loop: true,
  volume: 1.0
});
var ipMaster = new Howl({
  src: ['../sounds/ip-Master.mp3'],
  preload: true,
  loop: true,
  volume: 0.0
});
var spacesDemo = new Howl({
  src: ['../sounds/spaces-Demo.mp3'],
  preload: true,
  loop: true,
  volume: 1.0
});
var spacesMaster = new Howl({
  src: ['../sounds/spaces-Master.mp3'],
  preload: true,
  loop: true,
  volume: 0.0
});
};

ipPlayBtn.addEventListener('click', function() {
  ipDemo.play()
  ipMaster.play()
});

spacesPlayBtn.addEventListener('click', function() {
  ipDemo.play()
  ipMaster.play()
});
