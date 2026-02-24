import {Route, Routes} from "react-router";
import {HomePage} from "./src/page/home/homePage";
import {AboutPage} from "./src/page/about/AboutPage";
import {PreOrderPage} from "./src/page/PreOrder/PreOrderPage";
import {Header} from "./src/components/header/header";
import React from "react";
import "./src/styles/interactive.css";
import {ContactsPage} from "./src/page/Contacts/ContactsPage";


function App() {
  return (
    <div className="App">
        <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pre-order" element={<PreOrderPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </div>
  );
}

export default App;
