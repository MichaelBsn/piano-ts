var keyboard = document.querySelector('#keyboard');
//audio initialization 
var audioCtx = new AudioContext();
var primaryGain = audioCtx.createGain();
primaryGain.gain.setValueAtTime(0.1, 0);
primaryGain.connect(audioCtx.destination);
//function to make sound when key is pressed
function makeBeep(hertz) {
    var noteOsc = audioCtx.createOscillator();
    noteOsc.frequency.setValueAtTime(hertz, 0);
    noteOsc.connect(primaryGain);
    noteOsc.start();
    noteOsc.stop(audioCtx.currentTime + 0.25);
}
//found this data on github https://gist.github.com/i-Robi/8684800
var noteFreqs = {
    "C": [16.35, 32.70, 65.41, 130.81, 261.63, 523.25, 1046.50, 2093.00, 4186.01],
    "Db": [17.32, 34.65, 69.30, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92],
    "D": [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64],
    "Eb": [19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03],
    "E": [20.60, 41.20, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02],
    "F": [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83],
    "Gb": [23.12, 46.25, 92.50, 185.00, 369.99, 739.99, 1479.98, 2959.96],
    "G": [24.50, 49.00, 98.00, 196.00, 392.00, 783.99, 1567.98, 3135.96],
    "Ab": [25.96, 51.91, 103.83, 207.65, 415.30, 830.61, 1661.22, 3322.44],
    "A": [27.50, 55.00, 110.00, 220.00, 440.00, 880.00, 1760.00, 3520.00],
    "Bb": [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31],
    "B": [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07]
};
//crudely reorganize data
var octave1 = [];
var octave2 = [];
for (var pitchClass in noteFreqs) {
    octave1.push(noteFreqs[pitchClass][4]); //noteFreqs[pitchClass][octaveIndex] will loop through C-B in one octave
    octave2.push(noteFreqs[pitchClass][5]);
}
var octaves = [octave1, octave2];
for (var _i = 0, octaves_1 = octaves; _i < octaves_1.length; _i++) {
    var octave = octaves_1[_i];
    var octaveElement = document.createElement('div');
    octaveElement.className = 'octave';
    var _loop_1 = function (note) {
        var key = document.createElement('button');
        key.addEventListener('click', function () { makeBeep(note); }); //BEEP
        octaveElement.appendChild(key);
    };
    for (var _a = 0, octave_1 = octave; _a < octave_1.length; _a++) {
        var note = octave_1[_a];
        _loop_1(note);
    }
    keyboard.appendChild(octaveElement);
}
