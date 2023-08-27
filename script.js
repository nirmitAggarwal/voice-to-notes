const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const noteContainer = document.getElementById('noteContainer');
let recognition;

startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);
clearBtn.addEventListener('click', clearNotes);

function startRecording() {
    recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        startBtn.disabled = true;
        stopBtn.disabled = false;
    };

    recognition.onresult = event => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        noteContainer.textContent += transcript + '............................................';
        console.log(transcript, typeof (transcript))
        transcript = "";
    };

    recognition.onend = () => {
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    recognition.onerror = event => {
        console.error('Error occurred:', event.error);
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    recognition.start();
}

function stopRecording() {
    recognition.stop();
}

function clearNotes() {
    noteContainer.textContent = '';
}
