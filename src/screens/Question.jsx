import React, {useEffect, useState} from "react";
import SpeechInput from "./screenComponents/SpeechTest.jsx";
import YourDriversName from "./screenComponents/YourDriversName.jsx";
import InitialForm from "./screenComponents/InitialForm.jsx";

export default function Question() {
    const [vraag, setVraag] = useState('');
    const [opgeslagenVraag, setOpgeslagenVraag] = useState(null);
    const [antwoord, setAntwoord] = useState('')
    const [driverChange, setDriverChange] = useState(false)
    const [showInitialForm, setShowInitialForm] = useState(true)
    const [driver, setDriver] = useState('')
    const [color, setColor] = useState('green')
    const [track, setTrack] = useState('');
    const [speakingState, setSpeakingState] = useState(false)

    async function fetchApi(prompt, driver) {
        console.log(prompt)
        const response = await fetch(`http://localhost:3000/ask`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                driver: driver,
                track: track
            })
        })
        const data = await response.json()
        console.log(data)
        setAntwoord(data)

        if (data?.message) {
            speak(data.message);
        }
    }

    async function fetchClear() {
        const response = await fetch(`http://localhost:3000/clear`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        setAntwoord(data)
        if (data?.message) {
            speak(data.message);
        }
    }

    const clearArray = () => {
        setDriver('')
        setColor("grey")
        setTrack("")
        setShowInitialForm(true)
        setVraag(null)
        setOpgeslagenVraag(null)
        fetchClear()
    }

    useEffect(() => {
        fetchApi(opgeslagenVraag, driver)
    }, [opgeslagenVraag]);

    let synth = window.speechSynthesis
    let dutchVoice = null;

    function loadVoices() {
        const voices = synth.getVoices();
        dutchVoice = voices.find(voice => voice.lang === 'nl-NL');

        if (!dutchVoice) {
            console.warn("Geen Nederlandse stem gevonden. Beschikbare stemmen zijn:", voices);
        }
    }

    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    } else {
        loadVoices();
    }

    function speak(text) {
        if (synth.speaking) {
            console.log('still speaking...')
            return
        }
        if (text !== '') {
            setSpeakingState(true);

            let utterThis = new SpeechSynthesisUtterance(text);

            if (dutchVoice) {
                utterThis.voice = dutchVoice;
            } else {
                console.warn("Geen Nederlandse stem beschikbaar, gebruik standaardstem");
            }
            utterThis.onend = () => {
                setSpeakingState(false);
            };

            synth.speak(utterThis);
        }
    }

    return (
        <div style={{backgroundColor: color, color: 'white', padding: '30px', borderRadius: '10px'}}>
            <h1 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '20px'}}>Jouw Raceengineer</h1>
            <p style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '20px'}}>Geef eerst wat de instellingen mee en gebruik mij daarna als hulpmiddel voor jou race!</p>

            {opgeslagenVraag && (
                <div style={{marginBottom: '20px'}}>
                    <p>Jouw vraag:</p>
                    <p style={{fontStyle: 'italic'}}>"{opgeslagenVraag}"</p>
                </div>
            )}

            {antwoord && (
                <div style={{marginBottom: '20px'}}>
                    <p>Engineer antwoordt:</p>
                    <p style={{fontStyle: 'italic', color: '#00ffcc'}}>"{antwoord.message}"</p>
                </div>
            )}

            <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
                {driverChange && (
                    <div style={{flex: '1 1 30%'}}>
                        <YourDriversName driver={driver} setDriverChange={setDriverChange} setColor={setColor}/>
                    </div>
                )}
                {!showInitialForm && !speakingState &&  (
                    <div style={{flex: '1 1 30%'}}>
                        <SpeechInput
                            vraag={vraag}
                            setVraag={setVraag}
                            setOpgeslagenVraag={setOpgeslagenVraag}
                            opgeslagenVraag={opgeslagenVraag}
                            driver={driver}
                        />
                    </div>
                )}

                {showInitialForm && !speakingState &&(
                    <div style={{flex: '1 1 30%'}}>
                        <InitialForm
                            setInitialForm={setShowInitialForm}
                            vraag={vraag}
                            setVraag={setVraag}
                            setOpgeslagenVraag={setOpgeslagenVraag}
                            opgeslagenVraag={opgeslagenVraag}
                            setDriverChange={setDriverChange}
                            driver={driver}
                            setDriver={setDriver}
                            setTrack={setTrack}
                            track={track}
                        />
                    </div>
                )}
            </div>

            <button
                onClick={clearArray}
                style={{
                    marginTop: '30px',
                    padding: '15px 25px',
                    backgroundColor: '#e60000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                🔁 Begin gesprek opnieuw!
            </button>
        </div>
    )
        ;

}


