import { AudioRecording } from "../../../../data/data";



interface AudioPlayerProps {
	audio: AudioRecording,
	deleteRecording: () => void,
}

export default function AudioPlayer ({
	audio, deleteRecording
}: AudioPlayerProps) {
	return (
		<section className="px-3 py-3 bg-white border border-zinc-300 rounded">
			<header className="py-3">
				<h5>Audio Recording</h5>
				<h4>{audio.name}</h4>
				<audio src={audio.url} controls className="mx-auto"></audio>
			</header>

			<section className="py-5 grid grid-cols-2 font-mono">
				<h4>{(audio.lengthMs/1000).toFixed(1)} s</h4>
				<h4>{(audio.blobSize/1024).toFixed(1)} kB</h4>
			</section>

			<footer className="">
				<h4>
					<a className="button" download={audio.name} href={audio.url}>Download WebM</a>
				</h4>
				<button className="button" onClick={deleteRecording}>Delete</button>
			</footer>
		</section>
	);
}
