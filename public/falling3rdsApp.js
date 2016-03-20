var audioContext = new AudioContext();

var falling3rdsApp = {
  currentNumberOfParts: 0,
  notesPlayed: 0,

  resetParts: function(){
    this.currentNumberOfParts = 0;
  },

  updateStars: function(){
    if(this.currentNumberOfParts == 0){
      document.getElementById("stars").innerHTML = "&nbsp;";
    };
    if(this.currentNumberOfParts == 1){
      document.getElementById("stars").innerHTML = "*";
    };
    if(this.currentNumberOfParts == 2){
      document.getElementById("stars").innerHTML = "* &nbsp;*";
    };
    if(this.currentNumberOfParts == 3){
      document.getElementById("stars").innerHTML = "* &nbsp;* &nbsp;*";
    };
    if(this.currentNumberOfParts == 4){
      document.getElementById("stars").innerHTML = "* &nbsp;* &nbsp;* &nbsp;*";
    };
    if(this.currentNumberOfParts > 4){
      document.getElementById("stars").innerHTML = "* &nbsp;* &nbsp;* &nbsp;* &nbsp;*";
    };
  },

  fluctuate: function(count, max){
    if ((parseInt(count / max)) % 2 == 0){
      return count - (parseInt(count / max) * max);
    } else {
      return max - (count - (parseInt(count / max) * max));
    };
  },

  cycleBackgroundColour: function(){
    this.notesPlayed += 1;

    // hsl(229, 26%, 88%)
//bgH: i want this number to start at 229, and modulo around 360
    var bgH = (this.notesPlayed + 226) % 360;
//bgS: i want this number to start at 26, rise to 86, fall to 26, rise...
    var bgS = this.fluctuate((this.notesPlayed - 3), 60) + 26;
//bgL: i want this number to start at 88, fall to 16, rise to 88, fall...
    var bgL = 88 - this.fluctuate((this.notesPlayed - 3), 72);
    var backgroundColour = "hsl(" + bgH + ", " + bgS + "%, " + bgL + "%)";

    // (233, 43%, 45%)
//triH: i want this number to start at 233, and modulo around 360
    var triH = (this.notesPlayed + 230) % 360;
//triS: i want this number to start at 43, rise to 86, fall to 26, rise...
    var triS = this.fluctuate((this.notesPlayed + 14), 60) + 26;
//triL: i want this number to start at 45, rise to 85, fall to 25, rise
    var triL = this.fluctuate((this.notesPlayed + 17), 60) + 25;
    var triangleColour = "hsl(" + triH + ", " + triS + "%, " + triL + "%)";

    document.getElementById("fullPage").style.background = backgroundColour;
    document.getElementById("triangle-down").style.color = triangleColour;
    console.log("triangle colour: " + triangleColour);
    console.log("background colour: " + backgroundColour);
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
    var looper = setInterval(melody,(1000 * melodyLength));

    function endMusic(){
      if (falling3rdsApp.currentNumberOfParts == 0){
        clearInterval(looper);
      };
    };

    var stopper = setInterval(endMusic,1)

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
      falling3rdsApp.cycleBackgroundColour();

      if (falling3rdsApp.currentNumberOfParts == 0){
        endMusic();
      };

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
    falling3rdsApp.newMusicalPart()
  };
  if (falling3rdsApp.currentNumberOfParts < 5) {
    document.getElementById("play-button-wording").innerHTML = "more";
  } else {
    document.getElementById("play-button-wording").innerHTML = "enjoy";
    document.getElementById("play-button").style = "position: relative; margin: auto; width: 0; height: 0; border-top: 60px solid transparent; border-left: 100px solid transparent; border-bottom: 60px solid transparent;";
  };
  document.getElementById("reset").innerHTML = "stop";
  falling3rdsApp.updateStars();
};

document.getElementById("reset").onclick = function(){
  falling3rdsApp.resetParts();
  document.getElementById("play-button-wording").innerHTML = "play";
  document.getElementById("stars").innerHTML = "&nbsp;";
  document.getElementById("reset").innerHTML = "&nbsp;";
  document.getElementById("play-button").style = "position: relative; margin: auto; width: 0; height: 0; border-top: 60px solid transparent; border-left: 100px solid hsl(331, 48%, 16%); border-bottom: 60px solid transparent;";
};

document.getElementById("volume-up-triangle").onclick = function(){
  falling3rdsApp.volumeUp();
};

document.getElementById("volume-down-triangle").onclick = function(){
  falling3rdsApp.volumeDown();
};
