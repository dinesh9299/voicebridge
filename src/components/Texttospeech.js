import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import Header from "./Header";
import { toast } from "react-toastify";

const App = () => {
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [utterance, setUtterance] = useState(null); // Track the utterance
  const [isSpeaking, setIsSpeaking] = useState(false); // Track speaking state

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = speechSynthesis.getVoices();
      const bangladeshiVoice = availableVoices.find(
        (voice) => voice.lang === "bn-BD"
      );
      setSelectedVoice(bangladeshiVoice); // Set Bangladeshi voice by default
    };

    speechSynthesis.onvoiceschanged = handleVoicesChanged;
    handleVoicesChanged(); // Initial load

    return () => {
      speechSynthesis.onvoiceschanged = null; // Clean up listener
    };
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const toggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak();
    }
  };

  const speak = () => {
    if (text.trim() === "") {
      toast.warn("Please enter some text or upload an image!");
      return;
    }

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.voice = selectedVoice;

    newUtterance.onend = () => {
      console.log("Speech has finished.");
      setIsSpeaking(false); // Update speaking state
      setUtterance(null); // Clear utterance when finished
    };

    newUtterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      // alert("Error during speech synthesis: " + event.error);
    };

    speechSynthesis.speak(newUtterance);
    setUtterance(newUtterance); // Track the current utterance
    setIsSpeaking(true); // Update speaking state
  };

  const stopSpeaking = () => {
    if (utterance) {
      speechSynthesis.cancel(); // Stop the speech synthesis
      setIsSpeaking(false); // Update speaking state
      setUtterance(null); // Clear the utterance
    }
  };

  const [loading, setloading] = useState(false);

  const handleImageUpload = (event) => {
    setloading(true);
    const file = event.target.files[0];
    if (file) {
      extractTextFromImage(file);
    }
  };

  const extractTextFromImage = (file) => {
    Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m), // Optional: log progress
    })
      .then(({ data: { text } }) => {
        setText(text);
        setloading(false);
        console.log("Extracted text:", text);
      })
      .catch((err) => {
        console.error("Error extracting text:", err);
      });
  };

  return (
    <div className="pb-4">
      <Header />

      <h1 className="text-center">Text to Speech</h1>
      <div className="text-center text-secondary fw-semibold">
        Convert text to the most natural sounding voice online for free
      </div>

      {/* Desktop Version */}
      <div className="d-none d-lg-block d-md-block mt-4 border border-white rounded-3 p-3 w-50 m-auto">
        <div>
          <div className="border rounded-3 position-relative">
            <textarea
              value={text}
              onChange={handleTextChange}
              rows="10"
              cols="30"
              placeholder="Enter text here..."
              className="form-control  bg-transparent"
              style={{ outline: "none" }}
            />
            {loading && (
              <div className=" position-absolute start-50 top-50 translate-middle ">
                {" "}
                <span class="loader"></span>
              </div>
            )}
          </div>
          <br />

          <input
            type="file"
            className="form-control w-50"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <br />

          <div className="d-flex justify-content-end">
            <button
              className={`btn ${isSpeaking ? "btn-danger" : "btn-info"}`}
              onClick={toggleSpeak}
            >
              {isSpeaking ? "Stop" : "Generate Speech"}
              <span
                className={` ms-2 bi ${
                  isSpeaking ? "bi-stop" : "bi-megaphone"
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="d-sm-block d-lg-none d-md-none mt-4 border border-white rounded-3 p-3 w-100 m-auto">
        <div className=" border rounded-3">
          <textarea
            value={text}
            onChange={handleTextChange}
            rows="20"
            cols="30"
            placeholder="Enter text here..."
            className="form-control  bg-transparent"
            style={{ outline: "none" }}
          />
          {loading && (
            <div className=" position-absolute top-50 start-50 translate-middle ">
              {" "}
              <span class="loader"></span>
            </div>
          )}
        </div>
        <br />

        <input
          type="file"
          className="form-control w-100"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <br />

        <div className="d-flex justify-content-end">
          <button
            className={`btn ${isSpeaking ? "btn-danger" : "btn-info"}`}
            onClick={toggleSpeak}
          >
            {isSpeaking ? "Stop" : "Generate Speech"}
            <span
              className={` ms-2 bi ${isSpeaking ? "bi-stop" : "bi-megaphone"}`}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import Tesseract from "tesseract.js";
// import Header from "./Header";

// const App = () => {
//   const [text, setText] = useState("");
//   const [voices, setVoices] = useState([]);
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState("");
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     const handleVoicesChanged = () => {
//       const availableVoices = speechSynthesis.getVoices();
//       setVoices(availableVoices);
//       setSelectedVoice(availableVoices[0]); // Set default voice
//     };

//     speechSynthesis.onvoiceschanged = handleVoicesChanged;
//     handleVoicesChanged(); // Initial load

//     return () => {
//       speechSynthesis.onvoiceschanged = null; // Clean up listener
//     };
//   }, []);

//   const handleTextChange = (event) => {
//     setText(event.target.value);
//   };

//   const speak = () => {
//     if (text.trim() === "") {
//       alert("Please enter some text or upload an image!");
//       return;
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.voice = selectedVoice;

//     utterance.onend = () => {
//       console.log("Speech has finished.");
//     };

//     utterance.onerror = (event) => {
//       console.error("Speech synthesis error:", event.error);
//       alert("Error during speech synthesis: " + event.error);
//     };

//     speechSynthesis.speak(utterance);
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       extractTextFromImage(file);
//     }
//   };

//   const extractTextFromImage = (file) => {
//     Tesseract.recognize(file, "eng", {
//       logger: (m) => console.log(m), // Optional: log progress
//     })
//       .then(({ data: { text } }) => {
//         setText(text);
//         console.log("Extracted text:", text);
//       })
//       .catch((err) => {
//         console.error("Error extracting text:", err);
//       });
//   };

//   const filteredVoices = voices.filter((voice) =>
//     voice.lang.includes(selectedLanguage)
//   );

//   return (
//     <div className=" pb-4">
//       <Header />
//       <h1 className=" text-center">Text to Speech </h1>
//       <div className=" text-center text-secondary fw-semibold">
//         Convert text to the most natural sounding voice online for free
//       </div>
//       {/*Desktop */}
//       <div className=" d-none d-lg-block d-md-block d-sm-none mt-4 border border-white  rounded-3 p-3 w-50 m-auto">
//         <textarea
//           value={text}
//           onChange={handleTextChange}
//           rows="10"
//           cols="30"
//           placeholder="Enter text here..."
//           className=" form-control border bg-transparent "
//           style={{ outline: "none" }}
//         />
//         <br />

//         <div className=" d-flex w-100 gap-4">
//           <div>
//             <label htmlFor="languageSelect" className="">
//               Select Language:{" "}
//             </label>
//             <select
//               className=" form-select w-100 "
//               id="languageSelect"
//               onChange={(e) => setSelectedLanguage(e.target.value)}
//             >
//               <option value="">-- Select Language --</option>
//               <option value="en">English</option>
//               <option value="fr">French</option>
//               <option value="es">Spanish</option>
//               <option value="de">German</option>
//               <option value="it">Italian</option>
//               {/* Add more languages as needed */}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="voiceSelect">Select Voice: </label>
//             <select
//               className="  form-select w-100 "
//               id="voiceSelect"
//               onChange={(e) => setSelectedVoice(filteredVoices[e.target.value])}
//             >
//               {filteredVoices.map((voice, index) => (
//                 <option key={voice.name} value={index}>
//                   {voice.name} ({voice.lang})
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <br />

//         <input
//           type="file"
//           className=" form-control w-50"
//           accept="image/*"
//           onChange={handleImageUpload}
//         />
//         <br />
//         <div className="  d-flex justify-content-end">
//           <div className=" d-flex gap-2 btn btn-info  " onClick={speak}>
//             <div>Generate Speech</div>
//             <div className=" bi bi-megaphone"></div>
//           </div>
//         </div>
//       </div>

//       {/*Mobile */}
//       <div className=" d-sm-block d-lg-none d-md-none mt-4 border border-white  rounded-3 p-3 w-100 m-auto">
//         <textarea
//           value={text}
//           onChange={handleTextChange}
//           rows="20"
//           cols="30"
//           placeholder="Enter text here..."
//           className=" form-control border bg-transparent "
//           style={{ outline: "none" }}
//         />
//         <br />

//         <div className="  w-100 gap-4">
//           <div className=" mb-3">
//             <label htmlFor="languageSelect" className="">
//               Select Language:{" "}
//             </label>
//             <select
//               className=" form-select w-100 "
//               id="languageSelect"
//               onChange={(e) => setSelectedLanguage(e.target.value)}
//             >
//               <option value="">-- Select Language --</option>
//               <option value="en">English</option>
//               <option value="fr">French</option>
//               <option value="es">Spanish</option>
//               <option value="de">German</option>
//               <option value="it">Italian</option>
//               {/* Add more languages as needed */}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="voiceSelect">Select Voice: </label>
//             <select
//               className="  form-select w-100 "
//               id="voiceSelect"
//               onChange={(e) => setSelectedVoice(filteredVoices[e.target.value])}
//             >
//               {filteredVoices.map((voice, index) => (
//                 <option key={voice.name} value={index}>
//                   {voice.name} ({voice.lang})
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <br />

//         <input
//           type="file"
//           className=" form-control w-100"
//           accept="image/*"
//           onChange={handleImageUpload}
//         />
//         <br />
//         <div className="  d-flex justify-content-end">
//           <div className=" d-flex gap-2 btn btn-info  " onClick={speak}>
//             <div>Generate Speech</div>
//             <div className=" bi bi-megaphone"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
