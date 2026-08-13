"use client";

import { useEffect, useRef } from 'react';

/**
 * Option B — signal traces.
 *
 * Layered waveforms scrolling continuously right to left, drawn the way an
 * instrument draws them: a thin bright core with a wide falloff, brightness
 * rising where the trace moves fastest. A scan pulse sweeps the frame and
 * momentarily lifts the amplitude of whatever it crosses, so the traces react
 * to it rather than all pulsing together.
 *
 * Reads as live measurement — a market feed or a monitor — which is the
 * register consulting and data firms use, and it is unmistakably in motion.
 *
 * It runs on its own clock only: the pointer is deliberately not an input, so
 * the traces never react to the cursor.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec3  u_base, u_inkA, u_inkB;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * One wave. A fundamental plus two harmonics, each at its own rate, so the
 * crests travel and the profile keeps changing without ever stopping being a
 * wave. Noise is deliberately absent — it made the line jitter, which reads as
 * a signal artefact rather than water.
 */
float trace(float x, float t, float seed, float amp, float rate) {
  float s = x * 1.85 + t * rate + seed;
  float v = sin(s)
          + 0.44 * sin(s * 2.1 + t * rate * 0.42 + seed * 1.7)
          + 0.19 * sin(s * 3.6 - t * rate * 0.28 - seed * 2.3);
  return v * amp * 0.60;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  float x = (uv.x - 0.5) * aspect;
  float t = u_time;

  // Scan pulse sweeping the frame; traces lift as it passes.
  float scanX = fract(t * 0.055) * 1.4 - 0.2;
  float scan = exp(-abs(uv.x - scanX) * 6.0);

  vec3 col = u_base;

  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float depth = fi / 6.0;
    float seed = fi * 3.11;

    float base = 0.5 + (fi - 3.0) * 0.118;
    float amp = mix(0.098, 0.042, depth) * (1.0 + scan * 0.7);
    float rate = mix(0.50, 0.20, depth);

    float y = base + trace(x, t, seed, amp, rate);
    float d = abs(uv.y - y);

    // Instrument look: tight bright core, wide soft falloff.
    float core = 0.00020 / (d * d + 0.00024);
    float glow = exp(-d * 108.0) * 0.40;

    // Faster-moving sections read brighter, as on a real trace.
    float e = 0.005;
    float slope = abs(trace(x + e, t, seed, amp, rate) - trace(x - e, t, seed, amp, rate)) / (2.0 * e);
    float hot = clamp(slope * 0.5, 0.0, 1.4);

    vec3 ink = mix(u_inkA, u_inkB, depth * 0.55 + hot * 0.35);
    float strength = mix(0.85, 0.22, depth);

    col += ink * (core * 0.62 + glow) * strength * (0.75 + 0.5 * hot);
    col += ink * core * scan * strength * 0.9;
  }

  // The scan itself, kept faint.
  col += u_inkB * scan * 0.03;

  float peak = max(max(col.r, col.g), col.b);
  col /= 1.0 + peak * 0.80;
  col *= 1.55;

  float dc = length((uv - vec2(0.5, 0.52)) * vec2(1.06, 1.0));
  col *= mix(0.30, 1.0, smoothstep(0.09, 0.64, dc));
  col *= mix(1.0, 0.44, smoothstep(0.60, 1.06, dc));
  col *= mix(0.44, 1.0, smoothstep(0.0, 0.26, uv.y));
  col *= mix(1.0, 0.52, smoothstep(0.74, 1.0, uv.y));

  gl_FragColor = vec4(col, 1.0);
}
`;

export const SIGNAL_PALETTES: string[][] = [
  ['#160d06', '#f2a24a', '#ffe4c0'],
  ['#150c05', '#e8912a', '#ffdba6'],
  ['#180e05', '#f6b25c', '#ffeccb'],
  ['#140b04', '#e07f22', '#ffd39a'],
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, t: number, src: string) {
  const sh = gl.createShader(t)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.error('HeroSignal:', gl.getShaderInfoLog(sh));
  return sh;
}

export default function HeroSignal({
  slide,
  reduceMotion = false,
  transitionMs = 1050,
}: {
  slide: number;
  reduceMotion?: boolean;
  transitionMs?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const slideRef = useRef(slide);
  const motionRef = useRef(reduceMotion);
  const durRef = useRef(transitionMs);
  slideRef.current = slide;
  motionRef.current = reduceMotion;
  durRef.current = transitionMs;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, depth: false, antialias: false }) as WebGLRenderingContext | null;
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('HeroSignal link:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uBase = gl.getUniformLocation(prog, 'u_base');
    const uA = gl.getUniformLocation(prog, 'u_inkA');
    const uB = gl.getUniformLocation(prog, 'u_inkB');

    const rgb = SIGNAL_PALETTES.map((p) => p.map(hexToRgb));
    const cur = rgb[slideRef.current].map((c) => [...c] as [number, number, number]);

    // Near-full resolution: the traces are hairlines.
    const resize = () => {
      const dpr = Math.min(1.75, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0, running = true, last = performance.now(), clock = 0;
    const draw = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!motionRef.current) clock += dt;

      const k = 1 - Math.pow(0.001, dt / (durRef.current / 1000));
      const want = rgb[slideRef.current];
      for (let i = 0; i < 3; i++) for (let c = 0; c < 3; c++) cur[i][c] += (want[i][c] - cur[i][c]) * k;
      gl.uniform3f(uBase, cur[0][0], cur[0][1], cur[0][2]);
      gl.uniform3f(uA, cur[1][0], cur[1][1], cur[1][2]);
      gl.uniform3f(uB, cur[2][0], cur[2][1], cur[2][2]);
      gl.uniform1f(uTime, clock);

      resize();
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const start = () => { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(draw); };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    const onLost = (e: Event) => { e.preventDefault(); stop(); };
    canvas.addEventListener('webglcontextlost', onLost);

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteProgram(prog); gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
