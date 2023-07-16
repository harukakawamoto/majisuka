"use client";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import { useAlert } from "react-alert";
import Link from "next/link";
export default function Home() {
  const [Alerm] = useSound("/music/alerm.mp3");
  const [announce] = useSound("/music/announce.mp3");
  const Alert = useAlert();
  const [transcript, setTranscript] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);
  const [detectionTexts, setDetectionTexts] = useState<string[]>([
    "マジすか",
    "まじすか",
  ]);
  // 無音を再生
  useEffect(() => {
    const audio = new Audio();
    audio.src = "/music/silence.mp3";
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // 音声認識部分
  const startRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onstart = () => {
      console.log("Voice recognition started...");
    };
    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
      detectionTexts.map((text) => {
        if (transcript.includes(text)) {
          setCounter((prev) => prev + 1);
          // alert("マジすかを検出しました");
          Alerm();
          announce();
          Alert.show();
        }
      });
    };
    recognition.onsoundend = () => {
      startRecognition();
    };
    recognition.onerror = () => {
      startRecognition();
    };
    recognition.continuous = true;
    recognition.start();
  };
  if (typeof window !== "undefined") {
    startRecognition();
  }

  return (
    <>
      <div className="mt-32 text-center w-2/3 mx-auto">
        <p className="text-7xl font-semibold">マジすか検出機</p>
        <div className="flex justify-center py-6">
          <p className="text-5xl ">マジすかカウンター{counter}</p>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => {
              setCounter(0);
            }}
          >
            リセット
          </button>
        </div>
        <div className="min-h-[30px] border rounded-xl w-1/2 mx-auto my-5">
          <p className="py-2 px-2 text-4xl">{transcript}</p>
        </div>
      </div>
    </>
  );
}
