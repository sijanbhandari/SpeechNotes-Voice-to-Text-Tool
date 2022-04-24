window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0;


function gotBuffers(buffers) {
    audioRecorder.exportWAV(doneEncoding);
}

function doneEncoding(soundBlob) {
    console.log(soundBlob);
    // fetch('/audio', {method: "POST", body: soundBlob}).then(response => $('#output').text(response.text()))
    fetch('/audio', {method: "POST", body: soundBlob}).then(response => response.text().then(text => {
        document.getElementById('output').innerHTML =  text;
    }));
    recIndex++;
}

function stopRecording() {
    // stop recording
    console.log(audioRecorder);

    audioRecorder.stop();
    document.getElementById('stop').disabled = true;
    document.getElementById('start').removeAttribute('disabled');
    audioRecorder.getBuffers(gotBuffers);
}

function startRecording() {

    // start recording
    if (!audioRecorder)
        return;
    document.getElementById('start').disabled = true;
    document.getElementById('stop').removeAttribute('disabled');
    audioRecorder.clear();
    audioRecorder.record();
}

function copyToClipboard() {
    
    // Copying the text from the textarea to the clipboard
    var copyText = document.getElementById("copy");
  
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    navigator.clipboard.writeText(copyText.value);
  
    alert("Copied the text: " + copyText.value);
}

function clear()
{
    // Clearing the textarea
    var delText = document.getElementById('delete');
    delText.innerHTML = '';
}

function share() {

    const shareData = {
        title: 'SpeechNotes',
        text: 'SpeechNotes Voice-to-Text Tool',
        url: 'https://127.0.0.1:5000/'
    }
    
    const btn = document.querySelector('button');
    const resultPara = document.querySelector('.share');
    
    // Share must be triggered by "user activation"
    btn.addEventListener('click', async () => {
        try {
          await navigator.share(shareData)
          resultPara.textContent = 'Speechnotes Website shared successfully'
        } catch(err) {
          resultPara.textContent = 'Error: ' + err
        }
    });
}

function italic() {
    // Italic text
    var element = document.getElementById("italic");
    element.style.fontStyle = "italic";
}

function underline() {
    // Underline text
    var element = document.getElementById("underline");
    element.style.textDecoration = "underline";
}

function bold() {
    //Bold text
    var element = document.getElementById("bold");
    element.style.fontWeight = "bold";
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Start file download.
setTimeout(() => {
    
    document.getElementById("dwn-btn").addEventListener("click", function(){
        // Generate download of hello.txt file with some content
        var text = document.getElementById("text-val").value;
        var filename = "hello.txt";
        
        download(filename, text);
    }, false);    
}, 1000);


function convertToMono(input) {
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect(splitter);
    splitter.connect(merger, 0, 0);
    splitter.connect(merger, 0, 1);
    return merger;
}

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame(rafID);
    rafID = null;
}

function updateAnalysers(time) {
    // if (!analyserContext) {
    //     var canvas = document.getElementById("analyser");
    //     canvasWidth = canvas.width;
    //     canvasHeight = canvas.height;
    //     analyserContext = canvas.getContext('2d');
    // }
    
    // // analyzer draw code here
    // {
    //     var SPACING = 3;
    //     var BAR_WIDTH = 1;
    //     var numBars = Math.round(canvasWidth / SPACING);
    //     var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

    //     analyserNode.getByteFrequencyData(freqByteData);

    //     analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
    //     analyserContext.fillStyle = '#F6D565';
    //     analyserContext.lineCap = 'round';
    //     var multiplier = analyserNode.frequencyBinCount / numBars;

    //     // Draw rectangle for each frequency bin.
    //     for (var i = 0; i < numBars; ++i) {
    //         var magnitude = 0;
    //         var offset = Math.floor(i * multiplier);
    //         // gotta sum/average the block, or we miss narrow-bandwidth spikes
    //         for (var j = 0; j < multiplier; j++)
    //             magnitude += freqByteData[offset + j];
    //         magnitude = magnitude / multiplier;
    //         var magnitude2 = freqByteData[i * multiplier];
    //         analyserContext.fillStyle = "hsl( " + Math.round((i * 360) / numBars) + ", 100%, 50%)";
    //         analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
    //     }
    // }

    // rafID = window.requestAnimationFrame(updateAnalysers);
}

function toggleMono() {
    if (audioInput != realAudioInput) {
        audioInput.disconnect();
        realAudioInput.disconnect();
        audioInput = realAudioInput;
    } else {
        realAudioInput.disconnect();
        audioInput = convertToMono(realAudioInput);
    }

    audioInput.connect(inputPoint);
}

function gotStream(stream) {
    document.getElementById('start').removeAttribute('disabled');

    inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

//    audioInput = convertToMono( input );

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect(analyserNode);

    audioRecorder = new Recorder(inputPoint);

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect(zeroGain);
    zeroGain.connect(audioContext.destination);
    updateAnalysers();
}

function initAudio() {
    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.cancelAnimationFrame)
        navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
    if (!navigator.requestAnimationFrame)
        navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function (e) {
            alert('Error getting audio');
            console.log(e);
        });
}

window.addEventListener('load', initAudio);

function unpause() {
    document.getElementById('init').style.display = 'none';
    audioContext.resume().then(() => {
        console.log('Playback resumed successfully');
    });
}