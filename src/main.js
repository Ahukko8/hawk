import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
  props: {
    transcriptSource: "http://localhost:8080/transcript.json",
  }
})

export default app