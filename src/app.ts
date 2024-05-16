import * as mm from "music-metadata-browser";
import audioDecode, {decoders} from "audio-decode";
import buffer from "audio-buffer";


(async() => {
    // const t = await mm.fetchFromUrl(__dirname + "songs/margit.mp3", {duration: true});
    // console.log(t.format);
    let response: Response = (await fetch(__dirname + "songs/margit.mp3"));
    let songBlob = await response.blob();
    let file: File = new File([songBlob], "marg.mp3", {type: "audio/MPEG"});
    
    //let array = songBlob.stream();
  
})();
