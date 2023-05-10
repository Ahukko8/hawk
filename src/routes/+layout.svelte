<script>
	import {fade, fly} from "svelte/transition";
	import { Howl, Howler } from "howler";
	import Segment from "./Segment.svelte";
    import { transition_in } from "svelte/internal";
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

	function adjustTime(event) {
		const value = event.detail.value;
		const position = event.detail.position;
		const segmentIndex = event.detail.segmentIndex;
		const currentSeg = segments[segmentIndex];
		let updatedValue = currentSeg[position] + value;
		let updatedStart =
			position == "start" ? updatedValue : segments[segmentIndex].start;
		let updatedEnd =
			position == "end" ? updatedValue : segments[segmentIndex].end;
		// debugger;
		if (updatedValue < 0) {
			updatedValue = 0;
		}

		if (updatedStart >= updatedEnd) {
			return;
		}

		segments[segmentIndex][position] = updatedValue;
		segments = segments;
	}

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

	function addSegment(event) {
		const position = event.detail.position;
		const newSegment = {
			start: 0,
			end: 0,
			caption: "",
		};
		const left = segments.splice(0, position);
		segments = [...left, newSegment, ...segments];
	}

	function generateSegments() {}
</script>

<div class="container">
	<div class="p-1 mb-2">
		<button type="button" on:click={playAudio} class="btn btn-outline-success"
			>{playAudioButtonText}</button
		>
	</div>
	{#each segments as segment, i(segment)}
		<div in:fly="{{ y: 100, duration: 500 }}">
		<Segment
			caption={segment.caption}
			on:playaudio={playSegment}
			on:adjustTime={adjustTime}
			startTime={segment.start}
			endTime={segment.end}
			segmentSprite={"segment" + i}
			segmentIndex={i}
			on:addSegment={addSegment}
			
			
			
		/>
		</div>
	{/each}
</div>
