import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import Clock from "./Clock"; // assuming Clock.js is in the same directory
import messages from "./messages"; // assuming messages.js is in the same directory

function App() {
    const [locale, setLocale] = useState("en"); // Default locale is English

    const handleLocaleChange = (event) => {
        setLocale(event.target.value);
    };

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div>
                <Clock />
                <select value={locale} onChange={handleLocaleChange}>
                    {Object.keys(messages).map((locale) => (
                        <option key={locale} value={locale}>
                            {locale}
                        </option>
                    ))}
                </select>
            </div>
        </IntlProvider>
    );
}

export default App;
