import './App.css';
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthPage from './AuthPage';
import React, { useState, useRef, useEffect } from 'react';
import login from './Assets/login-20.png'
import about from './Assets/about-20.png'
import add from './Assets/add-20.png'
import sendbtn from './Assets/send.svg'
import bot from './Assets/chatbot-30.png'
import user from './Assets/person.png'
import sidetog from './Assets/sidebar-toggle.png'


function App() {
  const msgEndRef = useRef(null);
  const [inputClicked, setInputClicked] = useState(false);
  const [sidebartogClicked, setsidebartogClicked] = useState(false);
  const [inputData, setInputData] = useState('');
  const [disease, setDisease] = useState(null);
  const [description, setDescription] = useState(null);
  // eslint-disable-next-line
  const [precautions, setPrecautions] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleEnter = async (e) => {
    if (e.key === 'Enter') {
      await handleSubmit();
    }
  };

  const handletoggleClicked = () => {
    setsidebartogClicked(prevClicked => !prevClicked);
  };

  const handleInputClick = () => {
    setInputClicked(true);
  };

  const handleButtonClick = (question) => {
    setInputData(question);
    handleInputClick();
    handleSubmit(question);
  
  };
  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = async () => {
    setInputClicked(true);
    if (inputData.trim() === '') {
      return;
    }
    let descFetched = false
    try {
      const descriptionResponse = await fetch('https://ashad1.pythonanywhere.com//description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputData }),
      });

      if (!descriptionResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const descData = await descriptionResponse.json();

      const desc = descData.desc
      setMessages([
        ...messages,
        { text: inputData, isBot: false },
        { text: desc, isBot: true },
      ]);

      if (!descData.error) {
        setDescription("true");
        descFetched = true;
        setInputData('');
      }
      
    }
    catch (error) {
      console.error('Error fetching description:', error);
    }
  
    if (!descFetched){
    try {
      const response = await fetch('https://ashad1.pythonanywhere.com//predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      setDisease(data.disease);
      setDescription(data.description);

      let precautionsArray = [];
      if (data.precautions) {
        precautionsArray = data.precautions.split(/\d+\./).filter(item => item.trim() !== '');
      }
      else {
        setPrecautions([]);
      }
      setPrecautions(precautionsArray);

      const backendResponse = (
        <div className="backend-response">
          <p className="response-text">The disease you might be having is {data.disease}</p>
          <p className="response-text">{data.description}</p>
          <p className="response-text">Precautions for {data.disease}</p>
          <ul>
            {precautionsArray.map((precaution, index) => (
              <li className="response-text" key={index}>{precaution}</li>
            ))}
          </ul>
        </div>
      );
      setMessages([
        ...messages,
        { text: inputData, isBot: false },
        { text: backendResponse, isBot: true },
      ]);
      setInputData('');
    }
    catch (error) {
      console.error('Error:', error);
    }
  }
  };

  return (
    <Router>
      <Routes>
            <Route path="/register" render={() => <AuthPage isRegisterPage={true} />} />
            <Route path="/auth" render={() => <AuthPage isRegisterPage={false} />} />
          </Routes>
    {window.location.pathname === '/' &&(
    <div className="App">
      {!sidebartogClicked && <><div className="sidebar">
        <div className="Upperside">
          <div className="UppersideTop"></div>
          <button className="midbtn" onClick={() => { window.location.reload(); }}><img src={add} alt="" className="add" />New Session</button>
          <div className="UppersideBottom">
            <button type="submit"  className="query" onClick={() => { handleButtonClick("What is Jaundice ?");
              }} >What is Jaundice ?</button>
            <button className="query" onClick={() => {handleButtonClick("What is Dengue ?") }}>What is Dengue ?</button>
          </div>
        </div>
        <div className="lowerside">
          <div className="lowitems">
           {/* <img src={login} alt="login_icon" className="login" />
            <Link to="/auth" class="lowerlink1">Login / Register</Link>*/}
          </div>
          {/*<div className="lowitems"><img src={about} alt="about_icon" className="about" /><a href="#about" class="lowerlink2">About</a></div>*/}
        </div>
      </div></>}
      <div className="sidebar-tog-div">
        <button className="sidebar-toggle" onClick={handletoggleClicked} ><img src={sidetog}></img></button>
        </div>
      <div className="main">
        {!inputClicked && <h1 className="brandName">Symptom Insight</h1>}
        {description && (
          <div className="session">
            {messages.map((message, i) => (
              <div key={i} className={message.isBot ? "bot-div" : "user-div"}>
                <div className={message.isBot ? "bot-image-div" : "user-image-div"}>
                  <img src={message.isBot ? bot : user} alt={message.isBot ? "robot" : "user"} />
                </div>
                <div className={message.isBot ? "backend-response" : "user-query"}>
                  <p className={message.isBot ? "response-text" : "user-input-text"}>{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={msgEndRef} />
          </div>
        )}

        <div className="footer">
          <div className="inp">
            <input type="text" value={inputData} onKeyDown={handleEnter} onChange={handleInputChange} placeholder='Send a message' />
            <button className="send" onClick={() => { handleInputClick(); handleSubmit(); }} type='submit'><img src={sendbtn} alt="send" /></button>
          </div>
        </div>
        <p className='disclaimer'>Disclaimer : Results provided by Symptom Insight is not a replacement for medical diagnosis </p>
      </div>
    </div>)}
    </Router>
  );
};

export default App;
