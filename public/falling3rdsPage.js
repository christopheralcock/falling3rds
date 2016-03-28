var audioContext = new AudioContext();

window.onload = function(){
  document.getElementById("webAudioTest").innerHTML = "";
};

document.getElementById("play-button").onclick = function(){
  if (falling3rdsApp.currentNumberOfParts < 5) {
    falling3rdsApp.newMusicalPart();
    colourCyclerApp.cycleColours();
  };
  falling3rdsApp.updateLoopControls();
};

document.getElementById("stop").onclick = function(){
  clearInterval(colourCyclerApp.colourLoops.pop());
  clearInterval(falling3rdsApp.musicLoops.pop());
  if (falling3rdsApp.currentNumberOfParts > 0) {
    falling3rdsApp.currentNumberOfParts -= 1;
  };
  falling3rdsApp.updateLoopControls();
};

document.getElementById("volume-up-triangle").onclick = function(){
  falling3rdsApp.volumeUp();
};

document.getElementById("volume-down-triangle").onclick = function(){
  falling3rdsApp.volumeDown();
};
