import './styles.css';
import React, {useState} from 'react';
import api from "./api";

function App() {

  const [fields, setFields] = useState({});

  const handleChange = (event) => {
    let fields_updated = fields;

    fields_updated[event.target.id] = event.target.value;

    setFields(fields_updated);
  } 

  const login = () => {

    if(fields.loginemail == null || fields.loginpass == null) return alert("Um ou mais campos não podem ficar vazios.");

    if(fields.loginemail.startsWith("@") || !fields.loginemail.includes("@")) return alert("Email inválido.");

    if(fields.loginpass.length < 6) return alert("Senha inválida.");

    api.post("login", {
      email: fields.loginemail,
      password: fields.loginpass
    }).then(response => {
      alert(response.data.message)
    })

  }

  const register = () => {

    if(fields.regemail == null || fields.regpass1 == null || fields.regpass2 == null) return alert("Um ou mais campos não podem ficar vazios.");

    if(fields.regemail.startsWith("@") || !fields.regemail.includes("@")) return alert("Email inválido.");

    if(fields.regpass1 !== fields.regpass2) return alert("As senhas não são iguais.");

    if(fields.regpass1.length < 6 || fields.regpass2.length < 6) return alert("Senha inválida.");

    api.post("register", {
      email: fields.regemail,
      password: fields.regpass1
    }).then(response => {
      alert(response.data.message)
    })

  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="or">OR</h1>
        <div className="login-section">
          <h1 className="title">Login</h1>
          <input type="text" id="loginemail" name="loginemail" placeholder="Email" onChange={handleChange}/>
          <input type="text" id="loginpass" name="loginpass" placeholder="Password" onChange={handleChange}/>
          <input type="submit" value="Login" onClick={login}/>
        </div>
        <div className="register-section">
          <h1 className="title">Register</h1>
          <input type="text" id="regemail" name="regemail" placeholder="Email" onChange={handleChange}/>
          <input type="text" id="regpass1" name="regpass1" placeholder="Password" onChange={handleChange}/>
          <input type="text" id="regpass2" name="regpass2" placeholder="Repeat Password" onChange={handleChange}/>
          <input type="submit" value="Register" onClick={register}/>
        </div>
      </div>
    </div>
  );
}

export default App;
