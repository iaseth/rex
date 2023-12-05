import React from "react";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import { AudioRecording } from "../../../data/data";
import { getTimeName } from "timenames";

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

	const giveUpMicrophonePermission = async () => {
		if (stream) {
			stream.getTracks().forEach(track => track.stop());
			setStream(null);
			setPermission(false);
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");
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
				const blobSize = audioBlob.size;
				const endTimeMs = Date.now();

				setRecordedAudios(audios => [...audios, {
					blobSize, startTimeMs, endTimeMs,
					lengthMs: endTimeMs - startTimeMs,
					name: getTimeName(startTimeMs),
					url: audioURL
				}]);
				setAudioChunks([]);
			};
		}
	};

	const deleteRecording = (startTimeMs: number) => {
		const idx = recordedAudios.findIndex(audio => audio.startTimeMs === startTimeMs);
		if (idx !== -1) {
			URL.revokeObjectURL(recordedAudios[idx].url);
			setRecordedAudios(audios => audios.filter(audio => audio.startTimeMs !== startTimeMs));
		}
	};

	return (
		<section>
			<header className="bg-blue-500 text-white px-3 py-6 text-center">
				<h3>Audio Recorder</h3>
			</header>

			<section className="bg-white">
				<section className="max-w-5xl mx-auto px-3 py-6">
					{permission || <button className="button" onClick={getMicrophonePermission} type="button">Get Mic</button>}
					{permission && recordingStatus === "inactive" && <button className="button" onClick={giveUpMicrophonePermission} type="button">Give Up Mic</button>}

					{permission && recordingStatus === "inactive" && <button className="button" onClick={startRecording} type="button">Start Recording</button>}
					{recordingStatus === "recording" && <button className="button" onClick={stopRecording} type="button">Stop Recording</button>}
				</section>
			</section>

			<footer className="bg-zinc-200">
				<section className="max-w-5xl mx-auto px-3 py-6 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
					{recordedAudios.map(audio => <AudioPlayer key={audio.startTimeMs}
						audio={audio}
						deleteRecording={() => deleteRecording(audio.startTimeMs)}
					/>)}
				</section>
			</footer>
		</section>
	);
}
