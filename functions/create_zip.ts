import genManifest from "./gen_manifest";

export default function genZip(img_file, manifest) {
  let JSZip = require("jszip");

  let zip = new JSZip();

  let zip_folder = zip.folder("pwa");
  zip_folder.file("manifest.json", genManifest(manifest));

  var img = zip_folder.folder("icons");
  img.file("icon.png", img_file, {base64: true});

  zip.generateAsync({type:"blob"}).then(function(content) {
    const url = window.URL.createObjectURL(
      new Blob([content]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `pwa.zip`,
    );

    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  });
}