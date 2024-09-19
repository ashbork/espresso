# espresso

PowerToys Awake, caffeinate? No, thanks, I'll have an `espresso` (a looped 1s video with a technically-not-muted audio track). Possibly the first time someone has set a `video`'s volume to `Number.EPSILON`.


<p align="center"><img src="https://github.com/user-attachments/assets/fb24355f-9e4d-4a58-b44c-2ec14bcdd06a" style="width: 60%"/></p>


Keeps the screen awake by embedding a Webview in your Explorer tab. The webview contains a `video` element that plays a 1s-long video on loop. With the volume set to... `Number.EPSILON`.

## Caveats

**Definitely** consider other options before using this extension. Windows has [PowerToys Awake](https://learn.microsoft.com/en-us/windows/powertoys/awake), MacOS has [`caffeinate`](https://ss64.com/mac/caffeinate.html), various Linux distributions have `caffeinate` preinstalled or easily available, and there are probably other solutions for your OS.

This extension is mostly a joke, but it does have a use in e.g. corporate settings where you might not have full control over the machine.

- The video has controls enabled, so if you accidentally focus it you could change the volume or stop the video. In that case you can just toggle it, the volume will be reset.
- The video may mess with your media controls. This is unavoidable, but seeing as the use-case is mostly keeping the screen awake while you're away, that should be fine.
- There probably is a ~negligible performance and battery life impact, but you **are** using VS Code, don't mind that too much.
- Switching away from the Explorer tab or hiding the webview will stop the video.

## Usage

1. Install the extension.
2. Open a folder in VS Code.
3. Expand the Espresso view in the Explorer tab.
4. Click the toggle button to start/stop the video.

While the video is playing, your screen **should** not turn off.

## What I wanted to do instead

VSCode is surprisingly locked down when it comes to the Web APIs. Extensions can't access `navigator` and webviews are gutted by the permissions set in their wrapping `iframe`. What I really wanted to do is:

```ts
navigator.wakeLock.request("screen");
```

And probably make it toggleable with a command. But we've already established that we can't have nice things. Maybe one day!

## Development

Why? It's already perfect.

```
npm i
npm run watch
code .
```

## Contributing

Contributions are welcome! Please open an issue or submit a PR.
