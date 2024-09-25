import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Header from "./Header";

const Speechtotext = () => {
  const startlistening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  return (
    <div>
      <Header />
      <div className=" text-center mt-3">
        <h2>Free Speech to Text</h2>
        <h5 className=" text-secondary">
          Convert Your Speech into Text with Ease!{" "}
        </h5>
      </div>

      {/*Desktop */}
      <div
        className="mt-3 d-none d-lg-block  d-sm-none d-md-block border border-white  p-4 w-50 m-auto rounded-3"
        style={{ height: "42vh" }}
      >
        <div className="  d-flex  gap-4">
          <div
            onClick={startlistening}
            className="bg-info rounded-3 btn border-0   px-2"
            style={{ outline: "none" }}
          >
            start<span className=" text-success bi bi-mic-fill"></span>
          </div>
          <div
            onClick={SpeechRecognition.stopListening}
            className="bg-info rounded-3 btn border-0   px-2"
            style={{ outline: "none" }}
          >
            stop<span className=" text-danger bi bi-mic-mute-fill"></span>
          </div>
        </div>
        <div
          className=" border p-4 mt-3 rounded-3 overflow-y-auto"
          style={{ objectFit: "contain", minHeight: "180px" }}
        >
          {transcript}
        </div>
      </div>

      {/*Mobile */}
      <div
        className="mt-3 d-sm-block d-lg-none d-md-none  border border-white  p-2 w-100 m-auto rounded-3"
        style={{ height: "75vh" }}
      >
        <div className="  d-flex  gap-4">
          <div
            onClick={startlistening}
            className="bg-info rounded-3 btn border-0   px-2"
            style={{ outline: "none" }}
          >
            start<span className=" text-success bi bi-mic-fill"></span>
          </div>
          <div
            onClick={SpeechRecognition.stopListening}
            className="bg-info rounded-3 btn border-0   px-2"
            style={{ outline: "none" }}
          >
            stop<span className=" text-danger bi bi-mic-mute-fill"></span>
          </div>
        </div>
        <div
          className=" border p-4 mt-3 rounded-3 overflow-y-auto"
          style={{ objectFit: "contain", height: "390px" }}
        >
          {transcript}
        </div>
      </div>

      {/* <h3>Speechtotext</h3>
      <div>{transcript}</div>

      <button onClick={startlistening}>start</button>
      <button onClick={SpeechRecognition.stopListening}>stop</button> */}
    </div>
  );
};

export default Speechtotext;
