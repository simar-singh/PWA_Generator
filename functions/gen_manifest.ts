interface wManifest {
  name: string,
  short: string,
  theme: string,
  background: string,
  display: string,
  orientation: string,
}

export default function genManifest(manifest: wManifest) {
  const manifest_file = 
  `{
  "name": "${manifest.name}",
  "short_name": "${manifest.short}",
  "description": "PWA",
  "icons": [
    {
      "src": "icons/icon.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "/",
  "display": "${manifest.display}",
  "theme_color": "${manifest.theme}",
  "background_color": "${manifest.background}"
}`;

  return manifest_file;
}