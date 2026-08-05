import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { UserProvider } from "./context/UserContext";
import { VoiceGuiderProvider } from "./context/VoiceGuiderContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <VoiceGuiderProvider>
          <AppRoutes />
        </VoiceGuiderProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

