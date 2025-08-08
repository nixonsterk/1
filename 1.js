async function decode(url, type, elementId) {
  const key = 0xAA; // or fetch key dynamically if needed
  const res = await fetch(url);
  const buf = new Uint8Array(await res.arrayBuffer());
  for (let i = 0; i < buf.length; i++) buf[i] ^= key;
  const blob = new Blob([buf], { type });
  const objectUrl = URL.createObjectURL(blob);
  const el = document.getElementById(elementId);
  if (el.tagName === 'IMG' || el.tagName === 'AUDIO' || el.tagName === 'VIDEO') {
    el.src = objectUrl;
  } else {
    // fallback or error
    console.error('Element not supported for media rendering');
  }
}
