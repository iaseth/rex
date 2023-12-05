


interface AudioPlayerProps {
	audioURL: string
}

export default function AudioPlayer ({audioURL}: AudioPlayerProps) {
	return (
		<section>
			<audio src={audioURL} controls className="mx-auto"></audio>
			<section>
				<a className="button" download href={audioURL}>Download Recording</a>
			</section>
		</section>
	);
}
