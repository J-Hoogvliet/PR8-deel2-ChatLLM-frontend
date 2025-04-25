import React, {useEffect, useState} from "react";

function InitialForm({
                         setVraag,
                         setOpgeslagenVraag,
                         opgeslagenVraag,
                         setInitialForm,
                         vraag,
                         setDriverChange,
                         driver,
                         setDriver, setTrack, track
                     }) {
    const [yourDriver, setYourDriver] = useState('');
    const [lapCount, setLapCount] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!yourDriver || !track || !lapCount) {
            alert("Vul alle velden in voordat je het formulier verzendt.");
            return;
        }
        setDriver(yourDriver);
        console.log(driver)
        setDriverChange(true);
        setInitialForm(false);
        setVraag(`Hoi ik ben ${yourDriver}. Ik rijd vandaag op ${track}, hier ga ik ${lapCount} ronden rijden. Reken uit hoeveel liter benzine ik mee moet nemen om minimaal ${parseInt(lapCount) + 1} te kunnen rijden.`);


    };
    useEffect(() => {
        if (vraag && !opgeslagenVraag) {
            setOpgeslagenVraag(vraag);
        }
    }, [vraag]);

    return (
        <div style={{padding: '20px', backgroundColor: '#2c2c2c', borderRadius: '10px'}}>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <label style={{fontWeight: 'bold', color: '#ffffff'}}>
                    Hoe wil jij aangesproken worden?
                    <select
                        value={yourDriver}
                        onChange={(e) => setYourDriver(e.target.value)}
                        style={{
                            padding: '10px',
                            marginTop: '8px',
                            borderRadius: '4px',
                            border: '1px solid #555',
                            backgroundColor: '#1a1a1a',
                            color: 'white'
                        }}
                    >
                        <option value="">Selecteer een rijder</option>
                        <option value="Max">Max Verstappen</option>
                        <option value="Lando">Lando Norris</option>
                        <option value="Oscar">Oscar Piastri</option>
                        <option value="Alexander">Alexander Albon</option>
                        <option value="Carlos">Carlos Sainz jr</option>
                        <option value="Lewis">Lewis Hamilton</option>
                        <option value="Fernando">Fernando Alonso</option>
                        <option value="Charles">Charles Leclerc</option>
                        <option value="Andrea Kimi">Andrea Kimi Antonelli</option>
                        <option value="Gabriel">Gabriel Bortoletto</option>
                        <option value="Isack">Isack Hadjar</option>
                        <option value="Jack">Jack Doohan</option>
                        <option value="Pierre">Pierre Gasly</option>
                        <option value="Nico">Nico Hulkenberg</option>
                        <option value="Liam">Liam Lawson</option>
                        <option value="Yuki">Yuki Tsunoda</option>
                        <option value="Oliver">Oliver Bearman</option>
                        <option value="Lance">Lance Stroll</option>
                        <option value="George">George Russel</option>
                        <option value="Esteban">Esteban Ocon</option>
                    </select>
                </label>

                <label style={{fontWeight: 'bold', color: '#ffffff'}}>
                    Waar ga je rijden?
                    <select
                        value={track}
                        onChange={(e) => setTrack(e.target.value)}
                        style={{
                            padding: '10px',
                            marginTop: '8px',
                            borderRadius: '4px',
                            border: '1px solid #555',
                            backgroundColor: '#1a1a1a',
                            color: 'white'
                        }}
                    >
                        <option value="">Selecteer een baan</option>
                        <option value="Spa-Francorchamps">Spa-Francorchamps</option>
                        <option value="Monza">Monza</option>
                        <option value="Silverstone">Silverstone</option>
                        <option value="Suzuka">Suzuka</option>
                        <option value="Red Bull Ring">Red Bull Ring</option>
                        <option value="Circuit de Barcelona-Catalunya">Circuit de Barcelona-Catalunya</option>
                        <option value="Interlagos">Interlagos</option>
                        <option value="Circuit of the Americas">Circuit of the Americas</option>
                        <option value="Nürburgring GP">Nürburgring GP</option>
                        <option value="Hungaroring">Hungaroring</option>
                        <option value="Zandvoort">Zandvoort</option>
                        <option value="TT Circuit Assen">TT Circuit Assen</option>
                        <option value="Hockenheimring">Hockenheimring</option>
                        <option value="Zolder">Zolder</option>
                    </select>
                </label>

                <label style={{fontWeight: 'bold', color: '#ffffff'}}>
                    Hoeveel Ronden ga je rijden?
                    <input
                        type="text"
                        value={lapCount}
                        onChange={(e) => setLapCount(e.target.value)}
                        style={{
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #555',
                            backgroundColor: '#1a1a1a',
                            color: 'white'
                        }}
                    />
                </label>

                <button
                    type="submit"
                    style={{
                        padding: '15px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        borderRadius: '4px',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    ✅ Geef het door
                </button>
            </form>
        </div>

    );
}

export default InitialForm;
