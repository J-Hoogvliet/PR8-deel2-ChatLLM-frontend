import React, {useEffect, useState} from "react";

function YourDriversName({driver, setDriverChange, setColor}){
    const [driverData, setDriverData] = useState()
    useEffect(() => {
        fetch(`https://api.openf1.org/v1/drivers?first_name=${driver}&session_key=9994`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Netwerkfout of ongeldige respons");
                }
                return response.json();
            })
            .then(jsonContent => {
                if (jsonContent && jsonContent.length > 0) {
                    const data = jsonContent[0];
                    setDriverData(data);
                    console.log("Teamkleur:", data.team_colour);
                    setColor(`#${data.team_colour}`);
                    setDriverChange(false)
                }
            })
            .catch(error => {
                console.error("Fout bij het ophalen van data:", error);
            });
    }, [driver]);
}
export default YourDriversName