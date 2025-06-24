import React, { createContext, useState } from 'react'
import run from '../gemini';
export const datacontext = createContext()

function UserContext({children}) {
    let [speaking,setSpeaking] = useState(false)
    let [prompt,setPrompt] = useState("listening...")
    let [response,setResponse] = useState(false)
    function speak(text){
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1
        text_speak.lang = 'hi-GB'
        window.speechSynthesis.speak(text_speak);
    }
   async function aiResponse(prompt){
    let text = await run(prompt)
    let newText = text.split("**")&&text.split("*")&&text.replace("google","Arav")&&text.replace("Google","Arav")
    setPrompt(newText)
    speak(newText)
    setResponse(text)
    setTimeout(()=>{
        setSpeaking(false)
    },5000)
    
    }
    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult=(e)=>{
        let currentIndex = e.resultIndex
        let transcript = e.results[currentIndex][0].transcript
        setPrompt(transcript)
        takeCommand(transcript.toLowerCase())
    }

    function takeCommand(command){
        if(command.includes("open") && command.includes("youtube")){
            window.open("https://www.youtube.com/","_blank")
            speak("Opening YouTube")
            setPrompt("Opening YouTube...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("google")){
            window.open("https://www.google.com/","_blank")
            speak("Opening google")
            setPrompt("Opening google...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("spotify")){
            window.open("https://open.spotify.com/","_blank")
            speak("Opening spotify")
            setPrompt("Opening spotify...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("chatgpt")){
            window.open("https://chatgpt.com/","_blank")
            speak("Opening chatgpt")
            setPrompt("Opening chatgpt...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
       
        else{
            aiResponse(command)
        }
    }

    let value = {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse,
    }
  return (
    <div>
        <datacontext.Provider value={value}>
            {children}
        </datacontext.Provider>
        
    </div>
  )
}

export default UserContext