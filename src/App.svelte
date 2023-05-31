<script>
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition"; //for animation
	import { Howl, Howler } from "howler"; //for sound
	import Segment from "./Segment.svelte";
	import { transition_in } from "svelte/internal";
	export let transcriptSource;
	let sprites;
	let sound;
	let segments;
	let transcriptId;
	let audioFile;

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

	$: if (segments)
		sprites = segments.reduce((spr, segment, index) => {
			spr[`segment${index}`] = [
				segment.start * 1000,
				(segment.end - segment.start) * 1000,
			];
			return spr;
		}, {});
	$: if (segments)
		sound = new Howl({
			src: [audioFile],
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
		const seg = segments[position];
		const newSegment = {
			start: seg.start,
			end: seg.end,
			caption: "",
			highlighted: true,
		};
		appendSegment(position, newSegment);
	}

	function appendSegment(position, data) {
		const left = segments.splice(0, position);
		segments = [...left, data, ...segments];
	}

	function generateSegments() {}

	function deleteSegment(event) {
		const position = event.detail.position;
		segments.splice(position, 1);
		segments = segments;
		console.log(segments, position);
	}

	function toggleHighlighted(event) {
		const position = event.detail.position;
		segments[position].highlighted = false;
		segments = segments;
	}

	function loadTranscript() {
		fetch(transcriptSource, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				transcriptId = response.transcriptId;
				segments = response.segments;
				audioFile = response.audio;
			});
	}

	onMount(function () {
		loadTranscript();
	});
</script>

<!-- html -->
{#if segments?.length === 0}
	<div class="container">
		<button
			type="button"
			on:click={() =>
				appendSegment(0, {
					start: 0,
					end: 0,
					caption: "",
					highlighted: true,
				})}
			class="btn custom-play-btn btn-block p-3 m-3">ADD SEGMENT</button
		>
	</div>
{:else}
	<div class="container">
		<div class="p-1 mb-2">
			<button
				type="button"
				on:click={playAudio}
				class="btn custom-play-btn">{playAudioButtonText}</button
			>
		</div>
		{#if segments}
			{#each segments as segment, i (segment)}
				<div
					in:fly={{ y: 100, duration: 200 }}
					out:fly={{ y: 100, duration: 200 }}
				>
					<Segment
						caption={segment.caption}
						on:playaudio={playSegment}
						on:adjustTime={adjustTime}
						startTime={segment.start}
						endTime={segment.end}
						segmentSprite={"segment" + i}
						segmentIndex={i}
						on:addSegment={addSegment}
						on:deleteSegment={deleteSegment}
						highlighted={segment.highlighted}
						on:toggleHighlighted={toggleHighlighted}
					/>
				</div>
			{/each}
		{/if}
	</div>
{/if}

<!-- CSS styles -->
<style>
	.custom-play-btn {
		background-color: #6c0ba9;
		border: none;
		color: #ffffff;
		/* padding: 15px 32px; */
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
	}

	.custom-play-btn:hover {
		background-color: #51087e;
		border: none;
		color: #ffffff;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
	}
</style>
