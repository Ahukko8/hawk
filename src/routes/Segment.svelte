<script>
    import { createEventDispatcher } from "svelte";
    export let caption;
    export let startTime;
    export let endTime;
    export let segmentSprite;
    export let segmentIndex;

    function formatTime(seconds) {
        const wholeSeconds = Math.floor(seconds);
        const fractionSeconds = seconds - wholeSeconds;
        const milliSeconds = Math.floor(1000 * fractionSeconds);
        let hours = wholeSeconds / (60 * 60);
        hours = Math.floor(hours);
        let minutes = (wholeSeconds % (60 * 60)) / 60;
        minutes = Math.floor(minutes);
        const remainingSeconds = wholeSeconds % 60;
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

    function adjustTime(value, position) {
        dispatch("adjustTime", {
            position: position,
            value: value,
            segmentSprite: segmentSprite,
            segmentIndex: segmentIndex,
        });
    }

    function addSegmentAbove() {
        dispatch("addSegment", {
            position: segmentIndex,
        });
    }

    function deleteSegment() {
        dispatch("deleteSegment", {
            position: segmentIndex,
        });
    }
</script>

<div class="segment container">
    <div class="row mb-2">
        <div class="col">
            <span>
                <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    on:click={() => adjustTime(-0.5, "start")}
                    ><i class="bi bi-file-minus" /></button
                >
                <span>{formatTime(startTime)}</span>
                <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    on:click={() => adjustTime(0.5, "start")}
                    ><i class="bi bi-file-plus" /></button
                >
                <span>-</span>
                <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    on:click={() => adjustTime(-0.5, "end")}
                    ><i class="bi bi-file-minus" /></button
                >
                <span>{formatTime(endTime)}</span>
                <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    on:click={() => adjustTime(0.5, "end")}
                    ><i class="bi bi-file-plus" /></button
                >
            </span>

            <div class="btn-group float-end" role="group">
                <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    on:click={addSegmentAbove}>Add Above</button
                >

                <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    on:click={deleteSegment}><i class="bi bi-trash3" /></button
                >
            </div>
        </div>
    </div>
    <div class="row mb-2">
        <div class="col">
            <textarea placeholder="INPUT TEXT" class="form-control"
                >{caption}</textarea
            >
        </div>
    </div>
    <div class="row mb-2">
        <div class="col">
            <button type="button" on:click={play} class="btn btn-success"
                ><i class="bi bi-play" /></button
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
