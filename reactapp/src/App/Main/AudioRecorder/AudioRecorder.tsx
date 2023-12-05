import React from "react";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import { AudioRecording } from "../../../data/data";

const mimeType = "audio/webm";



export default function AudioRecorder () {
	const [permission, setPermission] = React.useState(false);
	const mediaRecorder = React.useRef<MediaRecorder|null>(null);
	const [recordingStatus, setRecordingStatus] = React.useState("inactive");
	const [stream, setStream] = React.useState<MediaStream|null>(null);
	const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);

	const [startTimeMs, setStartTimeMs] = React.useState(0);
	const [recordedAudios, setRecordedAudios] = React.useState<AudioRecording[]>([]);

	const getMicrophonePermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setPermission(true);
				setStream(mediaStream);
			} catch (err: any) {
				alert(`Error: ${err.message}`);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");
		console.log(`Recording was started: ${Date.now()}`);
		setStartTimeMs(Date.now());
		if (!stream) return;

		const media = new MediaRecorder(stream, { mimeType: mimeType });
		mediaRecorder.current = media;
		mediaRecorder.current.start();

		let localAudioChunks: Blob[] = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localAudioChunks.push(event.data);
		};

		setAudioChunks(localAudioChunks);
	};

	const stopRecording = () => {
		setRecordingStatus("inactive");

		if (mediaRecorder.current) {
			mediaRecorder.current.stop();

			mediaRecorder.current.onstop = () => {
				const audioBlob = new Blob(audioChunks, { type: mimeType });
				const audioURL = URL.createObjectURL(audioBlob);
				const endTimeMs = Date.now();
				console.log(`Recording was stopped: ${endTimeMs}`);

				setRecordedAudios(audios => [...audios, {
					lengthMs: endTimeMs - startTimeMs,
					startTimeMs, endTimeMs,
					url: audioURL
				}]);
				setAudioChunks([]);
			};
		}
	};

	return (
		<section>
			<header>
				<h2>Audio Recorder</h2>
			</header>

			<section className="py-4">
				<section className="">
					{permission || <button className="button" onClick={getMicrophonePermission} type="button">Get Microphone</button>}
					{permission && recordingStatus === "inactive" && <button className="button" onClick={startRecording} type="button">Start Recording</button>}
					{recordingStatus === "recording" && <button className="button" onClick={stopRecording} type="button">Stop Recording</button>}
				</section>
			</section>

			<footer className="">
				{recordedAudios.map((audio, k) => <AudioPlayer key={k} {...{audio}} />)}
			</footer>
		</section>
	);
}
