import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [patientName, setPatientName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [claimAmount, setClaimAmount] = useState("");

  const register = async () => {
    try {
      const res = await 
      axios.post("http://localhost:8000/register", {
        name,
        email,
        password,
      });
      alert(res.data.message);
    } catch (err) {
      console.log(err);
      aler(err.message);
    }
  };

  const submitClaim = async () => {
    try {
      const res = await axios.post("http://localhost:8000/claims", {
        patient_name: patientName,
        hospital_name: hospitalName,
        claim_amount: Number(claimAmount),
      });
      alert(res.data.message);
    } catch (err) {
      alert("Claim submission failed");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Health Insurance Claim Portal</h1>

      <h2>User Registration</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

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

      <button onClick={register}>Register</button>

      <hr style={{ margin: "30px 0" }} />

      <h2>Claim Submission</h2>

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

export default App;