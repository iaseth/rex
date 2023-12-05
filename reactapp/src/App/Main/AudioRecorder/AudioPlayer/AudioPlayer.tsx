import { AudioRecording } from "../../../../data/data";



interface AudioPlayerProps {
	audio: AudioRecording
}

export default function AudioPlayer ({audio}: AudioPlayerProps) {
	return (
		<section>
			<audio src={audio.url} controls className="mx-auto"></audio>
			<section>
				<h4>Length: {(audio.lengthMs/1000).toFixed(1)} s</h4>
				<h4>Size: {(audio.blobSize/1024).toFixed(1)} kB</h4>
				<h4>
					<a className="button" download href={audio.url}>Download Recording</a>
				</h4>
			</section>
		</section>
	);
}
