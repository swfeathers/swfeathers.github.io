var elms = ['ipPlayBtn', 'spacesPlayBtn', 'ipDemoRadio', 'ipMasterRadio', 'spacesDemoRadio', 'spacesMasterRadio'];

elms.forEach(function(elm) {
  window[elm] = document.getElementById(elm);
});

function loadAll() {
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
};

ipPlayBtn.addEventListener('click', function() {
  ipDemo.play()
  ipMaster.play()
});

spacesPlayBtn.addEventListener('click', function() {
  spacesDemo.play()
  spacesMaster.play()
});
