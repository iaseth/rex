import { AudioRecording } from "../../../../data/data";



interface AudioPlayerProps {
	audio: AudioRecording
}

export default function AudioPlayer ({audio}: AudioPlayerProps) {
	return (
		<section className="px-3 py-3 bg-white border border-zinc-300 rounded">
			<header>
				<h4>Audio Recording</h4>
				<audio src={audio.url} controls className="mx-auto"></audio>
			</header>

			<section className="py-5 grid grid-cols-2 font-mono">
				<h4>{(audio.lengthMs/1000).toFixed(1)} s</h4>
				<h4>{(audio.blobSize/1024).toFixed(1)} kB</h4>
			</section>

			<footer className="">
				<h4>
					<a className="button" download href={audio.url}>Download WebM</a>
				</h4>
			</footer>
		</section>
	);
}
