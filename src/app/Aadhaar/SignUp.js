'use client'
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useState } from "react";
import React from "react";
import Navbar from "../components/Navbar";

function App() {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [isValidAadhaar, setIsValidAadhaar] = useState(false);
  const [anonAadhaar, setAnonAadhaar] = useAnonAadhaar();
  const [latestProof, setLatestProof] = useProver();

  const handleAadhaarChange = (event) => {
    setAadhaarNumber(event.target.value);
  };

  const handleVerifyAadhaar = async () => {
    try {
      const response = await fetch(`https://api.aadhaar.gov.in/verify/aadhaar/${aadhaarNumber}`);
      const data = await response.json();
      if (data.status === "success") {
        setIsValidAadhaar(true);
      } else {
        setIsValidAadhaar(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    if (isValidAadhaar) {
      try {
        const response = await LogInWithAnonAadhaar(aadhaarNumber);
        setAnonAadhaar(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Invalid Aadhaar number. Please enter a valid Aadhaar number.");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Aadhaar Number Verification System</h1>
      <form>
        <label>Aadhaar Number:</label>
        <input type="number" value={aadhaarNumber} onChange={handleAadhaarChange} />
        <button onClick={handleVerifyAadhaar}>Verify</button>
        {isValidAadhaar ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <p>Invalid Aadhaar number. Please enter a valid Aadhaar number.</p>
        )}
      </form>
      {anonAadhaar?.status === "logged-in" && (
        <div>
          <p>Welcome, you are logged in!</p>
          <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
        </div>
      )}
    </div>
  );
}

export default App;