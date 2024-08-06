import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
  useProof, 
} from "@anon-aadhaar/react";
import { useEffect } from "react";

export default function Home() {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProof(); 

  useEffect(() => {
    if (anonAadhaar) {
      console.log("Anon Aadhaar status: ", anonAadhaar.status);
    }
  }, [anonAadhaar]);

  return (
    <div>
      <LogInWithAnonAadhaar nullifierSeed={1234} />
      <p>{anonAadhaar?.status}</p>
      
      {anonAadhaar?.status === "logged-in" && (
        <div>
          <p>aadhar address</p>
          {latestProof && (
            <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
          )}
        </div>
      )}
    </div>
  );
}
