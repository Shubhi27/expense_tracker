import React from "react";
import ReactDOM from "react-dom";
import { SpeechProvider } from "@speechly/react-client";

import { Provider } from "./context/context";
import App from "./App";
import "./index.css";

ReactDOM.render(
<SpeechProvider appId="f642e11c-bee5-45a0-b8b4-98591cabf475" language="en-US">
<Provider>
<App/>
</Provider>
</SpeechProvider>, 
document.getElementById('root'));