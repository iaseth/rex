import AudioRecorder from './AudioRecorder/AudioRecorder';


interface MainProps {
	//
}

export default function Main ({}: MainProps) {

	return (
		<main className="min-h-screen bg-zinc-200">
			<AudioRecorder />
		</main>
	);
}
