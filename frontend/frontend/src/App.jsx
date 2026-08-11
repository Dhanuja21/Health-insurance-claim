import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [claimAmount, setClaimAmount] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });

      if (res.data.message === "Login successful") {
        alert("Login successful");
        setLoggedIn(true);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  const submitClaim = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/claims", {
        patient_name: patientName,
        hospital_name: hospitalName,
        claim_amount: Number(claimAmount),
      });
      alert(res.data.message);
    } catch (err) {
      alert("Claim submission failed");
    }
  };

  if (loggedIn) {
    return (
      <div style={{ padding: "40px", fontFamily: "Arial" }}>
        <h1>Claim Submission</h1>

        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Hospital Name"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Claim Amount"
          value={claimAmount}
          onChange={(e) => setClaimAmount(e.target.value)}
        />
        <br /><br />

        <button onClick={submitClaim}>Submit Claim</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Health Insurance Claim Portal</h1>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;