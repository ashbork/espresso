import * as vscode from "vscode";

class MyWebviewViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(private readonly _context: vscode.ExtensionContext) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this._context.extensionUri, "assets"),
      ],
    };

    webviewView.webview.html = this.getWebviewContent(webviewView.webview);
  }
  private getWebviewContent(webview: vscode.Webview): string {
    const videoUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._context.extensionUri,
        "assets",
        "output_with_mp3_audio.mp4"
      )
    );
    return `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Embedded Webview</title>
              <script>
                document.addEventListener('DOMContentLoaded', () => {
                  const toggle = () => {
                    const video = document.getElementById('coffee');
                    const status = document.getElementById('status');
                    const explainer = document.getElementById('explainer');
                    video.volume = Number.EPSILON;
                    if (video.paused) {
                      video.play();
                      status.innerText = 'Pause';
                      explainer.innerText = 'The video is now playing. Don\\'t switch away from the Explorer tab or close the view, or the video will stop.';
                    } else {
                      video.pause();
                      status.innerText = 'Play';
                      explainer.innerText = 'The video is not playing. Click the button to resume.';
                    }
                  }

                  document.getElementById('status').addEventListener('click', toggle);
                });
              </script>
          </head>
          <body>
              <video id="coffee" width="1" height="1" loop controls>
                <source src="${videoUri}" type="video/mp4">
              </video>
              <button id="status">Play</button>
              <span id="explainer">The video is not playing. Click the button to resume.</span>
          </body>
          </html>`;
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "espresso" is now active!');

  const provider = new MyWebviewViewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("espresso", provider)
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
