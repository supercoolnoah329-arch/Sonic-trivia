# Audio Specification

## Question music

While a question is active, play a looping instrumental track with an original 16-bit-inspired sound. The track should feel energetic enough for Sonic trivia but quiet enough that the question and answer choices remain the focus.

Required behavior:

- Start when the question screen opens.
- Loop seamlessly until the answer is submitted.
- Stop or lower volume during correct and wrong feedback.
- Stop completely on the results screen.
- Resume when the next question opens if the player has not muted audio.
- Do not autoplay before the player interacts with the Start button.

## Controls

- Include a visible mute/unmute button.
- Store the player's mute choice for the current session.
- Use an accessible label such as `Mute music` or `Unmute music`.
- Keep music volume lower than feedback sound effects.
- Do not require audio for understanding the question or result.

## Rights and file format

- Do not use music from Sonic games, television shows, movies, or other copyrighted media without written permission.
- Use an original composition, commissioned track, or track with a license that allows web games and redistribution.
- Record the composer, source URL, license, and attribution requirements in `assets/README.md` before adding the track.
- Prefer a small `.ogg` or `.mp3` file with a short loop.
- The game must still work if the audio file is unavailable or blocked by the browser.

## Planned file

```text
assets/audio/thinking-loop.ogg
```

The file should be added during the build phase after its permission or license is documented.
