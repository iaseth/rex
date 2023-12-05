import { AudioRecording } from "../../../../data/data";



interface AudioPlayerProps {
	audio: AudioRecording
}

export default function AudioPlayer ({audio}: AudioPlayerProps) {
	return (
		<section>
			<audio src={audio.url} controls className="mx-auto"></audio>
			<section>
				<a className="button" download href={audio.url}>Download Recording</a>
			</section>
		</section>
	);
}
