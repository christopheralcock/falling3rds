var audioContext = new AudioContext();

var falling3rdsApp = {
  currentNumberOfParts: 0,
  colourStage: 0,

  updateLoopControls: function(){
    this.updateStars();
    this.updateStop();
    this.updatePlay();
  },

  updateStars: function(){
    var stars = [];
    for (var i = 1; i <= this.currentNumberOfParts; i++) {
      stars.push("*");
    }
    var output = stars.length > 0 ? stars.join(" &nbsp;") : "&nbsp;";
    document.getElementById("stars").innerHTML = output;
  },

  updateStop: function(){
    if (this.currentNumberOfParts == 0) {
      document.getElementById("stop").innerHTML = "&nbsp;";
    } else if (this.currentNumberOfParts == 1) {
      document.getElementById("stop").innerHTML = "stop";
    } else {
      document.getElementById("stop").innerHTML = "less";
    };
  },

  updatePlay: function(){
    if (this.currentNumberOfParts == 0){
      document.getElementById("play-button-wording").innerHTML = "play";
      document.getElementById("play-button").style = "position: relative; margin: auto; width: 0; height: 0; border-top: 60px solid transparent; border-left: 100px solid hsl(331, 48%, 16%); border-bottom: 60px solid transparent;";
    } else if (this.currentNumberOfParts < 5) {
      document.getElementById("play-button-wording").innerHTML = "more";
      document.getElementById("play-button").style = "position: relative; margin: auto; width: 0; height: 0; border-top: 60px solid transparent; border-left: 100px solid hsl(331, 48%, 16%); border-bottom: 60px solid transparent;";
    } else {
      document.getElementById("play-button-wording").innerHTML = "enjoy";
      document.getElementById("play-button").style = "position: relative; margin: auto; width: 0; height: 0; border-top: 60px solid transparent; border-left: 100px solid transparent; border-bottom: 60px solid transparent;";
    };
  },

  addedByFirstClick: 3,
  maxSaturation: 80,
  maxLight: 90,
  minSaturation: 20,
  minLight: 20,
  triangleSpeed: Math.random(),
  backgroundSpeed: Math.random(),
  colourSuperSpeed: 300,
  musicLoops: [],
  colourLoops: [],

  cycleColours: function(){
    this.startColours = setInterval(this.cycleBackgroundColour,this.colourSuperSpeed);
    this.colourLoops.push(this.startColours);
  },
  
  rotateColours: function(start, speed){
    return ((this.colourStage + start - this.addedByFirstClick) * speed) % 360;
  },

  fluctuate: function(count, max){
    if ((parseInt(count / max)) % 2 == 0){
      return count - (parseInt(count / max) * max);
    } else {
      return max - (count - (parseInt(count / max) * max));
    };
  },

  fluctuateOffset: function(count, max, min, start, speed){
    var adjustedCount = (count * speed) + start - ((this.addedByFirstClick * speed) + min);
    var range = max - min;
    return this.fluctuate(adjustedCount, range) + min;
  },

  cycleBackgroundColour: function(){
    falling3rdsApp.colourStage += 1;
    var bgH = falling3rdsApp.rotateColours(229, falling3rdsApp.backgroundSpeed);
    var bgS = falling3rdsApp.fluctuateOffset(falling3rdsApp.colourStage, falling3rdsApp.maxSaturation, falling3rdsApp.minSaturation, 26, falling3rdsApp.backgroundSpeed);
    var bgL = falling3rdsApp.fluctuateOffset(falling3rdsApp.colourStage, falling3rdsApp.maxLight, falling3rdsApp.minLight, 88, falling3rdsApp.backgroundSpeed);
    var backgroundColour = "hsl(" + bgH + ", " + bgS + "%, " + bgL + "%)";

    var triH = falling3rdsApp.rotateColours(233, falling3rdsApp.triangleSpeed);
    var triS = falling3rdsApp.fluctuateOffset(falling3rdsApp.colourStage, falling3rdsApp.maxSaturation, falling3rdsApp.minSaturation, 43, falling3rdsApp.triangleSpeed);
    var triL = falling3rdsApp.fluctuateOffset(falling3rdsApp.colourStage, falling3rdsApp.maxLight, falling3rdsApp.minLight, 45, falling3rdsApp.triangleSpeed);
    var triangleColour = "hsl(" + triH + ", " + triS + "%, " + triL + "%)";

    document.getElementById("fullPage").style.background = backgroundColour;
    document.getElementById("triangle-down").style.color = triangleColour;
  },

  arpeggioNotes: [0,0,4,4,7],
  octaveDistribution: [-24,-24,-12,-12,-12,0,0,0,0,0,12,12],
  repeatPeriods: [3,4,5,5,5.5,6,7,7.5,7.5,8,9,10,11,12,13,14,15,16],
  speakers: audioContext.destination,
  availableWaves: ["sine"],
  secondsPerChord: 20,
  displayVolume: 3,

  volumeUp: function(){
    if(this.displayVolume < 11){
      this.displayVolume += 1;
    };
    document.getElementById("volumeLevel").innerHTML = this.displayVolume;
  },

  volumeDown: function(){
    if(this.displayVolume > 0){
      this.displayVolume -= 1;
    };
    document.getElementById("volumeLevel").innerHTML = this.displayVolume;
  },

  volumeConversion: function(){
    return (0.009 * this.displayVolume * this.displayVolume)-(0.012 * this.displayVolume);
  },

  newMusicalPart: function(){
    falling3rdsApp.currentNumberOfParts += 1;

    var id = falling3rdsApp.currentNumberOfParts;
    var noteSet = [chooseNote(), chooseNote(), chooseNote()];
    var noteLengths = [0.5, 0.33, 1, 0.66, 0.11, 2, 3, 5, 0.75];
	  var noteLength = sample(noteLengths);
	  var wave = sample(this.availableWaves);
	  var melodyLength = sample(this.repeatPeriods);
	  melody();
    this.looper = setInterval(melody,(1000 * melodyLength));
    this.musicLoops.push(this.looper);

    function endMusic(){
      if (falling3rdsApp.currentNumberOfParts == 0){
        clearInterval(looper);
      };
    };

    function chooseNote(){
      return (sample(falling3rdsApp.arpeggioNotes)
        + sample(falling3rdsApp.octaveDistribution));
    };

    function sample(arr){
      return arr[~~(Math.random() * arr.length)];
    };

    function melody(){
      play(0, noteSet[0], 0.5, wave);
      play((+noteLength), noteSet[1], 0.5, wave);
      play((2 * +noteLength), noteSet[2], 0.5, wave);
    };

    function timeInSeconds(time){
      var secs = time.getSeconds();
      var mins = time.getMinutes();
      var hours = time.getHours();
      var days = time.getUTCDate();
      return secs + (mins * 60) + (hours * 60 * 60) + (days * 60 * 60 * 24);
    };

    function thirdsCycler(number){
      var step = number % 24;
      var majorOrMinor = "major";
      var cycleAdjustment = 0;
      if (step % 2 == 1) {
        cycleAdjustment = 0.5;
        majorOrMinor = "minor";
      };
      var transpose = (step * -3.5) + cycleAdjustment;
      while (transpose < -3) {
        transpose += 12;
      };
      return [transpose, majorOrMinor];
    };

    function play(delay, pitch, duration, wave) {

      var progressiveTime = new Date();
      var secondsIntoMonth = timeInSeconds(progressiveTime);
      var chordNumber = parseInt(secondsIntoMonth / falling3rdsApp.secondsPerChord);
      var transpose = thirdsCycler(chordNumber)[0];
      var currentChordType = thirdsCycler(chordNumber)[1];

      if ([-20,-8,4,16,28].includes(pitch) && currentChordType == "minor"){
        pitch -= 1;
      };

      var startTime = audioContext.currentTime + delay;
      var endTime = startTime + duration;
      var delayLength = Math.random();
      var panningAmount = (2 * Math.random()) - 1;
      var envelope = audioContext.createGain();
      var oscillator = audioContext.createOscillator();
      var delayInput = audioContext.createGain();
      var delayFeedback = audioContext.createGain();
      var delayTimer = audioContext.createDelay();
      var delayOutput = audioContext.createGain();
      var panner = audioContext.createStereoPanner();
      var volume = falling3rdsApp.volumeConversion(falling3rdsApp.displayVolume);

      panner.connect(falling3rdsApp.speakers);
      delayOutput.connect(panner);
      delayInput.connect(delayOutput);
      delayFeedback.connect(delayOutput);
      delayFeedback.connect(delayTimer);
      delayTimer.connect(delayFeedback);
      delayInput.connect(delayTimer);
      envelope.connect(delayTimer);
      oscillator.connect(envelope);

      envelope.gain.value = 0;
      envelope.gain.setTargetAtTime(volume, startTime, 0.1);
      envelope.gain.setTargetAtTime(0, endTime, 0.2);
      oscillator.type = wave;
      oscillator.detune.value = (pitch + transpose) * 100;
      oscillator.start(startTime);
      oscillator.stop(endTime + 2);

      delayTimer.delayTime.value = delayLength;
      delayFeedback.gain.value = 0.8;
      panner.pan.value = panningAmount;
      console.log("just played a note: pitch = " + (pitch+transpose)
        + " and delay = " + delayLength + " and volume = " + volume);
    };
  }
};

window.onload = function(){
  document.getElementById("webAudioTest").innerHTML = "";
};

document.getElementById("play-button").onclick = function(){
  if (falling3rdsApp.currentNumberOfParts < 5) {
    falling3rdsApp.newMusicalPart();
    falling3rdsApp.cycleColours();
  };
  falling3rdsApp.updateLoopControls();
};

document.getElementById("stop").onclick = function(){
  clearInterval(falling3rdsApp.colourLoops.pop());
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
