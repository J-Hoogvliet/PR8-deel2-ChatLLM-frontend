import React, {useState, useEffect} from "react";

const SpeechInput = ({setVraag, vraag, setOpgeslagenVraag, opgeslagenVraag}) => {
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Sorry, je browser ondersteunt geen spraakherkenning.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "nl-NL";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setVraag(transcript)
            setOpgeslagenVraag(transcript)
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => {
            recognition.stop();
        };
    }, [isListening]);

    useEffect(() => {
        if (vraag && !opgeslagenVraag) {
            setOpgeslagenVraag(vraag);
        }
    }, [vraag]);

    return (
        <div style={{padding: '20px', backgroundColor: '#2c2c2c', borderRadius: '10px'}}>
            <button
                onClick={() => setIsListening((prev) => !prev)}
                style={{
                    backgroundColor: isListening ? '#ff3300' : '#007bff',
                    color: 'white',
                    padding: '15px',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}
            >
                {isListening ? "⏹️ Stop luisteren" : "🎤 Begin luisteren"}
            </button>
            <p style={{marginTop: '15px', color: '#ccc'}}>
                Herkenning: <span style={{fontStyle: 'italic', color: '#00ffcc'}}>{vraag}</span>
            </p>
        </div>
    );
};

export default SpeechInput;
