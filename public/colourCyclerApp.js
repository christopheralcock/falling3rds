var colourCyclerApp = {
  colourStage: 0,
  addedByFirstClick: 3,
  maxSaturation: 80,
  maxLight: 90,
  minSaturation: 20,
  minLight: 20,
  triangleSpeed: Math.random(),
  backgroundSpeed: Math.random(),
  colourSuperSpeed: 300,
  colourLoops: [],

  cycleColours: function(){
    this.startColours = setInterval(this.cycleBackgroundColour,this.colourSuperSpeed);
    this.colourLoops.push(this.startColours);
  },

  rotateColours: function(start, speed){
    return (((this.colourStage + start - this.addedByFirstClick) * speed )+((1 - speed)*(start - this.addedByFirstClick))) % 360;
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
    colourCyclerApp.colourStage += 1;
    var bgH = colourCyclerApp.rotateColours(229, colourCyclerApp.backgroundSpeed);
    var bgS = colourCyclerApp.fluctuateOffset(colourCyclerApp.colourStage, colourCyclerApp.maxSaturation, colourCyclerApp.minSaturation, 26, colourCyclerApp.backgroundSpeed);
    var bgL = colourCyclerApp.fluctuateOffset(colourCyclerApp.colourStage, colourCyclerApp.maxLight, colourCyclerApp.minLight, 88, colourCyclerApp.backgroundSpeed);
    var backgroundColour = "hsl(" + bgH + ", " + bgS + "%, " + bgL + "%)";

    var triH = colourCyclerApp.rotateColours(233, colourCyclerApp.triangleSpeed);
    var triS = colourCyclerApp.fluctuateOffset(colourCyclerApp.colourStage, colourCyclerApp.maxSaturation, colourCyclerApp.minSaturation, 43, colourCyclerApp.triangleSpeed);
    var triL = colourCyclerApp.fluctuateOffset(colourCyclerApp.colourStage, colourCyclerApp.maxLight, colourCyclerApp.minLight, 45, colourCyclerApp.triangleSpeed);
    var triangleColour = "hsl(" + triH + ", " + triS + "%, " + triL + "%)";

    document.getElementById("fullPage").style.background = backgroundColour;
    document.getElementById("triangle-down").style.color = triangleColour;
  }
};
