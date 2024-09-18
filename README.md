# espresso 

A dumb solution for a dumb problem.

Keeps the screen awake by embedding a Webview in your Explorer tab. The webview contains a `video` element that plays a 1s-long video on loop. With the volume set to... `Number.EPSILON`.


## Usage

1. Install the extension.
2. Open a folder in VS Code.
3. Expand the Espresso view in the Explorer tab.
4. Click the toggle button to start/stop the video.

While the video is playing, your screen **should** not turn off.

I really wanted to use the `wakeLock` API, but it's not available in the Webview context, so...