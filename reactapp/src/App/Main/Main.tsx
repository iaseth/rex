import AudioRecorder from './AudioRecorder/AudioRecorder';


interface MainProps {
	//
}

export default function Main ({}: MainProps) {

	return (
		<main className="min-h-screen px-2 py-4 bg-zinc-100 text-center">
			<AudioRecorder />
		</main>
	);
}
