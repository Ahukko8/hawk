<script>
	import { Howl, Howler } from "howler";
	import Segment from "./Segment.svelte";
	let sprites;
	let sound;
	let segments = [
		{
			start: 0,
			end: 3,
			caption: "Some didnt learn the difficult reality of this path",
		},

		{
			start: 4,
			end: 5,
			caption: "hey thought Sulh Al-Hudaybiyyah would be their detour",
		},

		{
			start: 5.5,
			end: 9,
			caption:
				"and they use it to justify their failure, cowardice, and faltering stances.",
		},

		{
			start: 9.2,
			end: 15,
			caption: "They use it to open the door of Maslahah for everything",
		},
	];

	$: sprites = segments.reduce((spr, segment, index) => {
		spr[`segment${index}`] = [segment.start * 1000, segment.end * 1000];
		return spr;
	}, {});

	$: sound = new Howl({
		src: ["/hudhaybiyya.mp3"],
		sprite: sprites,
	});

	let playAudioButtonText = "Play Audio";

	function playAudio() {
		if (sound.playing()) {
			sound.pause();
			playAudioButtonText = "Play Audio";
		} else {
			sound.play();
			playAudioButtonText = "Pause";
		}
	}

	function playSegment(event) {
		console.log(arguments);
		// sound.seek(event.detail.startTime);
		sound.play(event.detail.segmentSprite);
	}

	function addSegment() {
		const newSegment = {
			start: 0,
			end: 0,
			caption: "",
		};
		segments.push(newSegment);
		segments = segments;
	}

	function generateSegments() {}
</script>

<div class="container">
	<div>
		<button type="button" on:click={playAudio} class="btn btn-secondary"
			>{playAudioButtonText}</button
		>
	</div>
	{#each segments as segment, i}
		<Segment
			caption={segment.caption}
			on:playaudio={playSegment}
			startTime={segment.start}
			endTime={segment.end}
			segmentSprite={"segment"+i}
		/>
	{/each}

	<div>
		<hr />
		<button type="button" on:click={addSegment} class="btn btn-primary">
			ADDSEGMENT
		</button>
	</div>
</div>
