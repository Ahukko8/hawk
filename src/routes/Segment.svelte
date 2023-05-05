<script>
    import { createEventDispatcher } from "svelte";
    export let caption;
    export let startTime;
    export let endTime;
    export let segmentSprite;

    function formatTime(seconds) {
        const milliSeconds = Math.floor(1000 * (seconds - Math.floor(seconds)));
        let hours = seconds / (60 * 60);
        hours = Math.floor(hours);
        let minutes = (seconds % (60 * 60)) / 60;
        minutes = Math.floor(minutes);
        const remainingSeconds = seconds % 60;
        const hoursStr = hours.toString().padStart(2, "0");
        const minutesStr = minutes.toString().padStart(2, "0");
        const secondsStr = remainingSeconds
            .toFixed()
            .toString()
            .padStart(2, "0");
        const milliSecondsStr = milliSeconds
            .toFixed()
            .toString()
            .padStart(3, "0");
        const time = `${hoursStr}:${minutesStr}:${secondsStr}.${milliSecondsStr}`;
        return time;
    }
    const dispatch = createEventDispatcher();

    function play() {
        dispatch("playaudio", {
            startTime: startTime,
            segmentSprite: segmentSprite,
        });
    }
</script>

<div class="segment">
    <div class="row">
        <div class="col">
            <span>
                <button type="button" class="btn btn-success btn-sm">-</button>
                <span>{formatTime(startTime)}</span>
                <button type="button" class="btn btn-success btn-sm">+</button>
                <span>-</span>
                <button type="button" class="btn btn-success btn-sm">-</button>
                <span>{formatTime(endTime)}</span>
                <button type="button" class="btn btn-success btn-sm">+</button>
            </span>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <textarea placeholder="INPUT TEXT" class="form-control"
                >{caption}</textarea
            >
        </div>
    </div>
    <div class="row">
        <div class="col">
            <button type="button" on:click={play} class="btn btn-info"
                >Play</button
            >
        </div>
    </div>
</div>

<style>
    .segment {
        margin-bottom: 15px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        padding: 10px;
    }
    .segment:hover {
        border: 1px solid rgba(0, 0, 0, 0.9);
    }
</style>
