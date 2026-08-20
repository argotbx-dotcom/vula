/**
 * Post-produzione dei video generati con Higgsfield.
 * Piano, cap. 4.1 e 4.3:
 *  · doppio formato WebM (VP9) + MP4 (H.264)
 *  · poster JPEG dal frame migliore, mai video che parte su schermo nero
 *  · hero <= 6 MB, card <= 3 MB
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, statSync, renameSync } from 'node:fs';
import { join, basename } from 'node:path';
import ffmpeg from 'ffmpeg-static';

const VID = 'public/videos';
const POSTERS = 'src/assets/posters';
mkdirSync(POSTERS, { recursive: true });

const run = (args) => execFileSync(ffmpeg, ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });
const mb = (p) => (statSync(p).size / 1048576).toFixed(1);

const sources = readdirSync(VID)
  .filter((f) => f.endsWith('.mp4') && !f.endsWith('.opt.mp4'))
  .map((f) => join(VID, f));

for (const src of sources) {
  const name = basename(src, '.mp4');
  const isHero = name === 'hero';
  const before = mb(src);

  // poster: frame a 1s, il video non parte mai su nero
  const poster = join(POSTERS, `${name}.jpg`);
  run(['-ss', '1', '-i', src, '-frames:v', '1', '-q:v', '4', '-vf', 'scale=1280:-2', poster]);

  // mp4 H.264 — muto, faststart per lo streaming progressivo
  const mp4 = join(VID, `${name}.opt.mp4`);
  run([
    '-i', src, '-an',
    '-c:v', 'libx264', '-crf', isHero ? '30' : '31', '-preset', 'slow',
    '-vf', `scale=${isHero ? 1600 : 1100}:-2`,
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    mp4,
  ]);

  // webm VP9 — formato primario dove supportato
  const webm = join(VID, `${name}.webm`);
  run([
    '-i', src, '-an',
    '-c:v', 'libvpx-vp9', '-crf', isHero ? '36' : '38', '-b:v', '0',
    '-deadline', 'good', '-cpu-used', '3', '-row-mt', '1',
    '-vf', `scale=${isHero ? 1600 : 1100}:-2`,
    webm,
  ]);

  renameSync(mp4, src);
  console.log(`${name.padEnd(20)} ${before} MB -> mp4 ${mb(src)} MB · webm ${mb(webm)} MB`);
}

console.log('\nfatto');
