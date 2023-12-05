import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import "./Clock.css";

// Array of all available timezones
const timezones = [
    "UTC",
    "Europe/London",
    "America/New_York",
    "Asia/Tokyo" /* ... */,
    /* Add all other timezones */
];

function Clock() {
    const [date, setDate] = useState(new Date());
    const [is24HourFormat, setIs24HourFormat] = useState(false);
    const [timezone, setTimezone] = useState("UTC"); // Default timezone is UTC
    const [backgroundColor, setBackgroundColor] = useState("#333333"); // Default background color is dark gray
    const [textColor, setTextColor] = useState("#ffffff"); // Default text color is white
    const [showSettings, setShowSettings] = useState(false); // Default is settings hidden

    useEffect(() => {
        const timerID = setInterval(() => {
            setDate(new Date());
        }, 1000);

        // Cleanup function
        return () => {
            clearInterval(timerID);
        };
    }, []);

    const toggleFormat = () => {
        setIs24HourFormat(!is24HourFormat);
    };

    const handleTimezoneChange = (event) => {
        setTimezone(event.target.value);
    };

    const handleBackgroundColorChange = (event) => {
        setBackgroundColor(event.target.value);
    };

    const handleTextColorChange = (event) => {
        setTextColor(event.target.value);
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div
            className='clock'
            style={{ backgroundColor: backgroundColor, color: textColor }}
        >
            {date.toLocaleTimeString("en-US", {
                hour12: !is24HourFormat,
                timeZone: timezone,
            })}
            <button onClick={toggleSettings}>
                {showSettings ? "Hide" : "Show"} settings
            </button>
            {showSettings && (
                <div className='settings'>
                    <button onClick={toggleFormat}>
                        <FormattedMessage
                            id='clock.button'
                            values={{ format: is24HourFormat ? "12" : "24" }}
                        />
                    </button>
                    <select value={timezone} onChange={handleTimezoneChange}>
                        {timezones.map((tz) => (
                            <option key={tz} value={tz}>
                                {tz}
                            </option>
                        ))}
                    </select>
                    <input
                        type='color'
                        value={backgroundColor}
                        onChange={handleBackgroundColorChange}
                    />
                    <input
                        type='color'
                        value={textColor}
                        onChange={handleTextColorChange}
                    />
                </div>
            )}
        </div>
    );
}

export default Clock;
