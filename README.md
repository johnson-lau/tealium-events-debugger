# Tealium Events Debugger

![image](https://github.com/johnson-lau/tealium-events-debugger/assets/101210653/b984cdf4-2b6b-4aa5-8763-24ee0e2e61dc)

## Running this extension

1. After cloning this repo, build the extension. This will output to `./dist` folder:

```
npm install
npm run build
```

2. Load the `./dist` directory in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
3. [Pin](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#pin) the extension.
4. Click on the action icon to open the side panel.
5. Tealium events from all websites will appear in the side panel.

💡 You can also open the side panel by pressing `Ctrl+B` (Windows) or `Cmd+B` (macOS).
