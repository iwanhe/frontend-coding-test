import { useState, useEffect, useRef, useCallback } from "react";

const CHALLENGES = [
  {
    id: 1,
    title: "Sales by Match",
    topic: "HashMap",
    timeLimit: 300,
    description: `Diberikan array bilangan yang merepresentasikan warna kaus kaki. Hitung berapa banyak pasang kaus kaki yang bisa dibentuk.`,
    examples: [
      { input: "n=9, ar=[10,20,20,10,10,30,50,10,20]", output: "3" },
      { input: "n=3, ar=[1,1,1]", output: "1" },
    ],
    hint: "Gunakan objek untuk menghitung frekuensi setiap warna, lalu cek setiap kali frekuensi genap.",
    starterCode: `function sockMerchant(n, ar) {
  // Tulis solusimu di sini

}`,
    testFn: (code) => {
      try {
        const fn = new Function(`
          ${code}
          const testCases = [
            { n: 9, ar: [10,20,20,10,10,30,50,10,20], expected: 3 },
            { n: 3, ar: [1,1,1], expected: 1 },
            { n: 7, ar: [1,2,1,2,1,3,2], expected: 2 },
            { n: 1, ar: [5], expected: 0 },
          ];
          let passed = 0;
          const results = [];
          testCases.forEach(tc => {
            try {
              const result = sockMerchant(tc.n, tc.ar);
              const ok = result === tc.expected;
              if (ok) passed++;
              results.push({ input: JSON.stringify(tc.ar), expected: tc.expected, got: result, ok });
            } catch(e) { results.push({ input: JSON.stringify(tc.ar), expected: tc.expected, got: 'ERROR', ok: false }); }
          });
          return { passed, total: testCases.length, results };
        `);
        return fn();
      } catch (e) {
        return { passed: 0, total: 4, results: [], error: e.message };
      }
    },
  },
  {
    id: 2,
    title: "Counting Valleys",
    topic: "State Tracking",
    timeLimit: 420,
    description: `Seorang hiker berjalan di jalur dengan langkah naik 'U' dan turun 'D'. Hitung berapa kali dia masuk ke dalam lembah (valley). Lembah dimulai saat turun dari sea level (0) dan berakhir saat kembali ke sea level.`,
    examples: [
      { input: 'steps=8, path="UDDDUDUU"', output: "1" },
      { input: 'steps=4, path="UDUD"', output: "2" },
    ],
    hint: "Track level saat ini. Valley terjadi ketika level berubah dari -1 menjadi 0.",
    starterCode: `function countingValleys(steps, path) {
  // Tulis solusimu di sini

}`,
    testFn: (code) => {
      try {
        const fn = new Function(`
          ${code}
          const testCases = [
            { steps: 8, path: "UDDDUDUU", expected: 1 },
            { steps: 8, path: "DDUUUUDD", expected: 1 },
            { steps: 4, path: "UDUD", expected: 2 },
            { steps: 2, path: "UD", expected: 1 },
          ];
          let passed = 0;
          const results = [];
          testCases.forEach(tc => {
            try {
              const result = countingValleys(tc.steps, tc.path);
              const ok = result === tc.expected;
              if (ok) passed++;
              results.push({ input: tc.path, expected: tc.expected, got: result, ok });
            } catch(e) { results.push({ input: tc.path, expected: tc.expected, got: 'ERROR', ok: false }); }
          });
          return { passed, total: testCases.length, results };
        `);
        return fn();
      } catch (e) {
        return { passed: 0, total: 4, results: [], error: e.message };
      }
    },
  },
  {
    id: 3,
    title: "Subarray Division",
    topic: "Sliding Window",
    timeLimit: 480,
    description: `Diberikan array cokelat dengan nilai tiap bagian, cari berapa cara memilih subarray berurutan dengan panjang tepat m yang jumlahnya sama dengan d.`,
    examples: [
      { input: "s=[2,2,1,3,2], d=4, m=2", output: "2" },
      { input: "s=[1,1,1,1,1,1], d=3, m=3", output: "4" },
    ],
    hint: "Gunakan sliding window: hitung jumlah window pertama, lalu geser dengan menambah elemen baru dan menghapus elemen lama. O(n) lebih efisien dari O(n2).",
    starterCode: `function birthday(s, d, m) {
  // Tulis solusimu di sini

}`,
    testFn: (code) => {
      try {
        const fn = new Function(`
          ${code}
          const testCases = [
            { s: [2,2,1,3,2], d: 4, m: 2, expected: 2 },
            { s: [1,2,1,3,2], d: 3, m: 2, expected: 2 },
            { s: [1,1,1,1,1,1], d: 3, m: 3, expected: 4 },
            { s: [4], d: 4, m: 1, expected: 1 },
          ];
          let passed = 0;
          const results = [];
          testCases.forEach(tc => {
            try {
              const result = birthday(tc.s, tc.d, tc.m);
              const ok = result === tc.expected;
              if (ok) passed++;
              results.push({ input: 's=' + JSON.stringify(tc.s) + ', d=' + tc.d + ', m=' + tc.m, expected: tc.expected, got: result, ok });
            } catch(e) { results.push({ input: '', expected: tc.expected, got: 'ERROR', ok: false }); }
          });
          return { passed, total: testCases.length, results };
        `);
        return fn();
      } catch (e) {
        return { passed: 0, total: 4, results: [], error: e.message };
      }
    },
  },
  {
    id: 4,
    title: "Climbing the Leaderboard",
    topic: "Binary Search",
    timeLimit: 600,
    description: `Diberikan leaderboard dengan skor terurut descending (mungkin ada duplikat), dan array skor baru dari seorang pemain. Untuk setiap skor pemain, tentukan posisi ranking-nya di leaderboard tanpa menghitung duplikat.`,
    examples: [
      { input: "ranked=[100,90,90,80], player=[70,90,105]", output: "[4, 2, 1]" },
      { input: "ranked=[100,50,50,30], player=[10,30,60,100]", output: "[4, 3, 2, 1]" },
    ],
    hint: "Hapus duplikat dari leaderboard dengan Set, lalu gunakan Binary Search untuk setiap skor pemain. Jauh lebih efisien dari O(n2).",
    starterCode: `function climbingLeaderboard(ranked, player) {
  // Tulis solusimu di sini
  // Tips: hapus duplikat dulu, lalu binary search

}`,
    testFn: (code) => {
      try {
        const fn = new Function(`
          ${code}
          const testCases = [
            { ranked: [100,90,90,80], player: [70,90,105], expected: [4,2,1] },
            { ranked: [100,50,50,30], player: [10,30,60,100], expected: [4,3,2,1] },
            { ranked: [100], player: [200,100,50], expected: [1,1,2] },
            { ranked: [100,75,50,25], player: [25,50,75,100], expected: [4,3,2,1] },
          ];
          let passed = 0;
          const results = [];
          testCases.forEach(tc => {
            try {
              const result = climbingLeaderboard(tc.ranked, tc.player);
              const ok = JSON.stringify(result) === JSON.stringify(tc.expected);
              if (ok) passed++;
              results.push({ input: 'player=' + JSON.stringify(tc.player), expected: JSON.stringify(tc.expected), got: JSON.stringify(result), ok });
            } catch(e) { results.push({ input: '', expected: JSON.stringify(tc.expected), got: 'ERROR', ok: false }); }
          });
          return { passed, total: testCases.length, results };
        `);
        return fn();
      } catch (e) {
        return { passed: 0, total: 4, results: [], error: e.message };
      }
    },
  },
  {
    id: 5,
    title: "Bigger is Greater",
    topic: "Next Permutation",
    timeLimit: 720,
    description: `Temukan permutasi string terkecil yang lebih besar dari string yang diberikan (next permutation). Jika tidak ada permutasi yang lebih besar, kembalikan "no answer".`,
    examples: [
      { input: 'w="dkhc"', output: '"hcdk"' },
      { input: 'w="dcba"', output: '"no answer"' },
      { input: 'w="abdc"', output: '"acbd"' },
    ],
    hint: "Algoritma 4 langkah: (1) Cari pivot dari kanan di mana arr[i] < arr[i+1], (2) Cari pengganti terkecil di kanan pivot yang lebih besar dari pivot, (3) Swap keduanya, (4) Reverse semua elemen di kanan pivot.",
    starterCode: `function biggerIsGreater(w) {
  // Tulis solusimu di sini
  // Next Permutation Algorithm (4 langkah)

}`,
    testFn: (code) => {
      try {
        const fn = new Function(`
          ${code}
          const testCases = [
            { w: "dkhc", expected: "hcdk" },
            { w: "dcba", expected: "no answer" },
            { w: "abdc", expected: "acbd" },
            { w: "lmno", expected: "lmon" },
          ];
          let passed = 0;
          const results = [];
          testCases.forEach(tc => {
            try {
              const result = biggerIsGreater(tc.w);
              const ok = result === tc.expected;
              if (ok) passed++;
              results.push({ input: '"' + tc.w + '"', expected: tc.expected, got: result, ok });
            } catch(e) { results.push({ input: tc.w, expected: tc.expected, got: 'ERROR', ok: false }); }
          });
          return { passed, total: testCases.length, results };
        `);
        return fn();
      } catch (e) {
        return { passed: 0, total: 4, results: [], error: e.message };
      }
    },
  },
];

function formatTime(s) {
  return `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
}

function calcScore(passed, total, timeUsed, timeLimit) {
  if (passed === 0) return 0;
  const accuracy = passed / total;
  const timeBonus = Math.max(0, 1 - timeUsed / timeLimit);
  return Math.round(accuracy * 300 * (1 + timeBonus * 0.5));
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [active, setActive] = useState(null);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeUsed, setTimeUsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [scores, setScores] = useState([]);
  const [doneIds, setDoneIds] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [pulse, setPulse] = useState(false);
  const timerRef = useRef(null);
  const textareaRef = useRef(null);

  const startChallenge = useCallback((ch) => {
    clearInterval(timerRef.current);
    setActive(ch);
    setCode(ch.starterCode);
    setTimeLeft(ch.timeLimit);
    setTimeUsed(0);
    setTestResult(null);
    setShowHint(false);
    setRunning(true);
    setScreen("challenge");
  }, []);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setRunning(false);
          setPulse(true);
          setTimeout(() => setPulse(false), 1000);
          return 0;
        }
        setTimeUsed((u) => u + 1);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [running]);

  const runCode = () => {
    if (!active) return;
    const result = active.testFn(code);
    setTestResult(result);
    if (result.passed === result.total) {
      clearInterval(timerRef.current);
      setRunning(false);
      const score = calcScore(result.passed, result.total, timeUsed, active.timeLimit);
      setScores((p) => [...p, { id: active.id, title: active.title, topic: active.topic, score, time: timeUsed, passed: result.passed, total: result.total }]);
      setDoneIds((p) => [...new Set([...p, active.id])]);
      setTimeout(() => setScreen("result"), 700);
    }
  };

  const totalScore = scores.reduce((s, e) => s + e.score, 0);

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen === "home") {
    return (
      <div style={{ minHeight: "100vh", background: "#07090f", fontFamily: "'Courier New', monospace", color: "#cbd5e1" }}>
        {/* Hero */}
        <div style={{ background: "linear-gradient(180deg, #0d1117 0%, #07090f 100%)", borderBottom: "1px solid #0f1729", padding: "48px 24px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 20, padding: "4px 16px", fontSize: 11, color: "#818cf8", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px #10b981" }} />
              HackerRank · JavaScript
            </div>
            <h1 style={{ margin: "0 0 10px", fontSize: "clamp(24px, 4vw, 44px)", fontWeight: 900, color: "#f1f5f9", letterSpacing: -1, lineHeight: 1.15 }}>
              Frontend Developer<br />
              <span style={{ background: "linear-gradient(135deg, #818cf8 0%, #10b981 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Coding Test</span>
            </h1>
            <p style={{ color: "#334155", fontSize: 13, margin: "0 0 28px" }}>5 soal · Timer otomatis · Auto-grading · Scoring</p>
            {scores.length > 0 && (
              <div style={{ display: "inline-flex", gap: 20, background: "rgba(13,17,23,0.9)", border: "1px solid #0f1729", borderRadius: 12, padding: "10px 24px" }}>
                <span style={{ fontSize: 13 }}>Total: <strong style={{ color: "#f59e0b" }}>{totalScore}</strong> <span style={{ color: "#334155" }}>pts</span></span>
                <span style={{ color: "#1a2235" }}>|</span>
                <span style={{ fontSize: 13 }}>Selesai: <strong style={{ color: "#10b981" }}>{doneIds.length}</strong><span style={{ color: "#334155" }}>/5</span></span>
                <span style={{ color: "#1a2235" }}>|</span>
                <button onClick={() => setScreen("scorecard")} style={{ background: "none", border: "none", color: "#818cf8", cursor: "pointer", fontFamily: "inherit", fontSize: 13, padding: 0 }}>📊 Scorecard →</button>
              </div>
            )}
          </div>
        </div>

        {/* Challenge List */}
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "32px 20px 60px" }}>
          <div style={{ background: "#0d1117", border: "1px solid #0f1729", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 140px 76px 88px", padding: "10px 22px", borderBottom: "1px solid #0a0d14", fontSize: 10, color: "#1e293b", letterSpacing: 3, textTransform: "uppercase" }}>
              <span>#</span><span>Soal</span><span>Topik</span><span>Waktu</span><span style={{ textAlign: "right" }}>Maks Poin</span>
            </div>
            {CHALLENGES.map((ch, i) => {
              const done = doneIds.includes(ch.id);
              const myScore = scores.find(s => s.id === ch.id);
              return (
                <div key={ch.id}
                  onClick={() => startChallenge(ch)}
                  style={{ display: "grid", gridTemplateColumns: "44px 1fr 140px 76px 88px", alignItems: "center", padding: "18px 22px", borderBottom: i < CHALLENGES.length - 1 ? "1px solid #0a0d14" : "none", cursor: "pointer", transition: "background 0.15s", background: done ? "rgba(16,185,129,0.025)" : "transparent" }}
                  onMouseEnter={e => e.currentTarget.style.background = done ? "rgba(16,185,129,0.05)" : "rgba(99,102,241,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background = done ? "rgba(16,185,129,0.025)" : "transparent"}
                >
                  <span style={{ fontSize: 13, color: done ? "#10b981" : "#1e293b", fontWeight: 700 }}>
                    {done ? "✓" : String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div style={{ fontSize: 14, color: done ? "#6ee7b7" : "#e2e8f0", fontWeight: 600, marginBottom: 3 }}>{ch.title}</div>
                    {myScore
                      ? <div style={{ fontSize: 11, color: "#f59e0b" }}>⭐ {myScore.score} pts · ⏱ {formatTime(myScore.time)} · {myScore.passed}/{myScore.total} test</div>
                      : <div style={{ fontSize: 11, color: "#1e293b" }}>Belum dikerjakan</div>
                    }
                  </div>
                  <span style={{ fontSize: 11, color: "#6366f1", background: "rgba(99,102,241,0.07)", padding: "3px 10px", borderRadius: 20, width: "fit-content" }}>{ch.topic}</span>
                  <span style={{ fontSize: 12, color: "#334155" }}>⏱ {Math.floor(ch.timeLimit / 60)}m</span>
                  <span style={{ fontSize: 14, color: "#334155", textAlign: "right", fontWeight: 700 }}>450</span>
                </div>
              );
            })}
          </div>
          <p style={{ color: "#1a2235", fontSize: 11, textAlign: "center", marginTop: 16, letterSpacing: 1 }}>
            KLIK SOAL UNTUK MULAI · SKOR LEBIH TINGGI JIKA SELESAI LEBIH CEPAT
          </p>
        </div>
      </div>
    );
  }

  // ── CHALLENGE ─────────────────────────────────────────────────────────────
  if (screen === "challenge" && active) {
    const pct = (timeLeft / active.timeLimit) * 100;
    const timerColor = pct > 50 ? "#10b981" : pct > 20 ? "#f59e0b" : "#ef4444";
    const r = 18;
    const circ = 2 * Math.PI * r;

    return (
      <div style={{ height: "100vh", background: "#07090f", fontFamily: "'Courier New', monospace", color: "#cbd5e1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ background: "#0d1117", borderBottom: "1px solid #0f1729", padding: "0 16px", height: 52, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <button onClick={() => { clearInterval(timerRef.current); setScreen("home"); }}
            style={{ background: "transparent", border: "1px solid #0f1729", color: "#334155", padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>
            ← Keluar
          </button>
          <div style={{ width: 1, height: 20, background: "#0f1729" }} />
          <span style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 700, flex: 1 }}>{active.title}</span>
          <span style={{ fontSize: 11, color: "#6366f1", background: "rgba(99,102,241,0.08)", padding: "3px 10px", borderRadius: 12 }}>{active.topic}</span>
          {/* Timer circle */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="44" height="44" style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
              <circle cx="22" cy="22" r={r} fill="none" stroke="#0f1729" strokeWidth="2.5" />
              <circle cx="22" cy="22" r={r} fill="none" stroke={timerColor} strokeWidth="2.5"
                strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }} />
            </svg>
            <div style={{ minWidth: 52, animation: pulse ? "shake 0.5s" : "none" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: timerColor, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{formatTime(timeLeft)}</div>
              <div style={{ fontSize: 10, color: "#1e293b", marginTop: 2 }}>tersisa</div>
            </div>
          </div>
        </div>

        {/* Split body */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
          {/* LEFT: Problem */}
          <div style={{ borderRight: "1px solid #0f1729", overflowY: "auto", padding: "22px 24px" }}>
            <h2 style={{ margin: "0 0 14px", fontSize: 17, color: "#f1f5f9" }}>{active.title}</h2>
            <p style={{ color: "#64748b", lineHeight: 1.8, fontSize: 13, margin: "0 0 20px" }}>{active.description}</p>

            <div style={{ fontSize: 10, color: "#1e293b", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Contoh</div>
            {active.examples.map((ex, i) => (
              <div key={i} style={{ background: "#0a0d14", border: "1px solid #0a0d14", borderRadius: 8, padding: "10px 14px", marginBottom: 8, fontSize: 12 }}>
                <div style={{ color: "#334155", marginBottom: 3 }}>Input: <span style={{ color: "#818cf8" }}>{ex.input}</span></div>
                <div style={{ color: "#334155" }}>Output: <span style={{ color: "#6ee7b7" }}>{ex.output}</span></div>
              </div>
            ))}

            <button onClick={() => setShowHint(!showHint)}
              style={{ marginTop: 14, width: "100%", padding: "9px", background: "transparent", border: "1px dashed #1a2235", borderRadius: 8, color: "#334155", fontFamily: "inherit", fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#f59e0b33"; e.currentTarget.style.color = "#92400e"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a2235"; e.currentTarget.style.color = "#334155"; }}>
              {showHint ? "▲ Sembunyikan Hint" : "💡 Tampilkan Hint"}
            </button>
            {showHint && (
              <div style={{ marginTop: 10, padding: "12px 14px", background: "rgba(245,158,11,0.03)", border: "1px solid rgba(245,158,11,0.12)", borderRadius: 8, fontSize: 12, color: "#78350f", lineHeight: 1.75 }}>
                <span style={{ color: "#d97706" }}>Hint: </span>{active.hint}
              </div>
            )}

            {/* Test Results */}
            {testResult && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: testResult.passed === testResult.total ? "#10b981" : "#ef4444", marginBottom: 10 }}>
                  {testResult.passed === testResult.total ? "✓ Semua Test Lulus" : `✗ ${testResult.passed}/${testResult.total} Test Lulus`}
                </div>
                {testResult.error && (
                  <div style={{ padding: "8px 12px", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 7, fontSize: 12, color: "#b91c1c", marginBottom: 8 }}>
                    ⚠ {testResult.error}
                  </div>
                )}
                {testResult.results?.map((r, i) => (
                  <div key={i} style={{ padding: "8px 12px", borderRadius: 7, marginBottom: 6, background: r.ok ? "rgba(16,185,129,0.03)" : "rgba(239,68,68,0.03)", border: `1px solid ${r.ok ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)"}`, fontSize: 12, lineHeight: 1.65 }}>
                    <span style={{ color: r.ok ? "#10b981" : "#ef4444", marginRight: 8 }}>{r.ok ? "✓" : "✗"}</span>
                    <span style={{ color: "#1e293b" }}>Input: </span><span style={{ color: "#64748b" }}>{r.input}</span>
                    <span style={{ color: "#1e293b", marginLeft: 8 }}>Expected: </span><span style={{ color: "#6ee7b7" }}>{String(r.expected)}</span>
                    {!r.ok && <><span style={{ color: "#1e293b", marginLeft: 8 }}>Got: </span><span style={{ color: "#fca5a5" }}>{String(r.got)}</span></>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Editor */}
          <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "8px 16px", background: "#0a0d14", borderBottom: "1px solid #0a0d14", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: "#1a2235" }}>solution.js</span>
              <div style={{ display: "flex", gap: 5 }}>
                {["#ef4444", "#f59e0b", "#10b981"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.5 }} />)}
              </div>
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  const s = e.target.selectionStart, end = e.target.selectionEnd;
                  const next = code.substring(0, s) + "  " + code.substring(end);
                  setCode(next);
                  setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = s + 2; }, 0);
                }
              }}
              style={{ flex: 1, background: "#07090f", color: "#e2e8f0", border: "none", padding: "16px 18px", fontFamily: "'Courier New', monospace", fontSize: 13, lineHeight: 1.8, resize: "none", outline: "none" }}
              spellCheck={false}
            />
            <div style={{ padding: "12px 16px", background: "#0a0d14", borderTop: "1px solid #0a0d14", display: "flex", gap: 8, flexShrink: 0 }}>
              <button onClick={runCode}
                style={{ flex: 1, padding: "11px", background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)", border: "none", borderRadius: 8, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5 }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                ▶ Jalankan Test
              </button>
              <button onClick={() => { setCode(active.starterCode); setTestResult(null); }}
                style={{ padding: "11px 14px", background: "transparent", border: "1px solid #0f1729", borderRadius: 8, color: "#1e293b", fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>
                Reset
              </button>
            </div>
          </div>
        </div>
        <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style>
      </div>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  if (screen === "result") {
    const last = scores[scores.length - 1];
    const allDone = doneIds.length === CHALLENGES.length;
    return (
      <div style={{ minHeight: "100vh", background: "#07090f", fontFamily: "'Courier New', monospace", color: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20, padding: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>{allDone ? "🏆" : "🎉"}</div>
          <h2 style={{ margin: "0 0 6px", fontSize: 22, color: "#f1f5f9" }}>{allDone ? "Semua Soal Selesai!" : "Soal Berhasil Diselesaikan!"}</h2>
          <p style={{ color: "#334155", margin: 0, fontSize: 13 }}>{last?.title}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, width: "100%", maxWidth: 400 }}>
          {[
            { label: "SKOR", value: last?.score, color: "#f59e0b", icon: "⭐" },
            { label: "WAKTU", value: formatTime(last?.time || 0), color: "#818cf8", icon: "⏱" },
            { label: "TEST", value: `${last?.passed}/${last?.total}`, color: "#10b981", icon: "✅" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#0d1117", border: "1px solid #0f1729", borderRadius: 12, padding: "16px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 18, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 9, color: "#1e293b", marginTop: 4, letterSpacing: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#0d1117", border: "1px solid #0f1729", borderRadius: 10, padding: "10px 24px", fontSize: 13, display: "flex", gap: 20 }}>
          <span>Total: <strong style={{ color: "#f59e0b" }}>{totalScore}</strong> pts</span>
          <span style={{ color: "#0f1729" }}>|</span>
          <span>Selesai: <strong style={{ color: "#10b981" }}>{doneIds.length}/5</strong> soal</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setScreen("home")}
            style={{ padding: "10px 24px", background: "linear-gradient(135deg, #6366f1, #4338ca)", border: "none", borderRadius: 8, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            Semua Soal
          </button>
          <button onClick={() => setScreen("scorecard")}
            style={{ padding: "10px 24px", background: "transparent", border: "1px solid #10b981", borderRadius: 8, color: "#10b981", fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>
            📊 Scorecard
          </button>
        </div>
      </div>
    );
  }

  // ── SCORECARD ─────────────────────────────────────────────────────────────
  if (screen === "scorecard") {
    const sorted = [...scores].sort((a, b) => b.score - a.score);
    const maxPossible = CHALLENGES.length * 450;
    return (
      <div style={{ minHeight: "100vh", background: "#07090f", fontFamily: "'Courier New', monospace", color: "#cbd5e1", padding: 24 }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <button onClick={() => setScreen("home")}
            style={{ background: "transparent", border: "1px solid #0f1729", color: "#334155", padding: "5px 14px", borderRadius: 7, cursor: "pointer", fontFamily: "inherit", fontSize: 12, marginBottom: 28 }}>
            ← Kembali
          </button>
          <h2 style={{ margin: "0 0 4px", fontSize: 20, color: "#f1f5f9" }}>📊 Scorecard</h2>
          <p style={{ color: "#1e293b", margin: "0 0 24px", fontSize: 12, letterSpacing: 1 }}>FRONTEND DEVELOPER CODING TEST</p>

          {/* Progress summary */}
          <div style={{ background: "#0d1117", border: "1px solid #0f1729", borderRadius: 12, padding: "18px 20px", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "#334155" }}>Total Skor</span>
              <span style={{ fontSize: 26, fontWeight: 900, color: "#f59e0b" }}>{totalScore} <span style={{ fontSize: 12, color: "#1e293b" }}>/ {maxPossible}</span></span>
            </div>
            <div style={{ background: "#07090f", borderRadius: 4, height: 5, overflow: "hidden", marginBottom: 8 }}>
              <div style={{ height: "100%", width: `${Math.min((totalScore / maxPossible) * 100, 100)}%`, background: "linear-gradient(90deg, #6366f1, #10b981)", borderRadius: 4, transition: "width 0.8s ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#1e293b" }}>
              <span>{doneIds.length}/5 soal selesai</span>
              <span>{Math.round((totalScore / maxPossible) * 100)}% dari skor maksimal</span>
            </div>
          </div>

          {sorted.length === 0 ? (
            <div style={{ textAlign: "center", color: "#1a2235", padding: 60, fontSize: 13 }}>Belum ada skor. Mulai kerjakan soal!</div>
          ) : sorted.map((s, i) => (
            <div key={i} style={{ background: "#0d1117", border: "1px solid #0f1729", borderRadius: 12, padding: "14px 18px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: 20, width: 28, textAlign: "center", flexShrink: 0 }}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : <span style={{ fontSize: 11, color: "#1e293b" }}>#{i + 1}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 600, marginBottom: 4 }}>{s.title}</div>
                <span style={{ fontSize: 11, color: "#6366f1", background: "rgba(99,102,241,0.07)", padding: "2px 8px", borderRadius: 6 }}>{s.topic}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#f59e0b" }}>{s.score}</div>
                <div style={{ fontSize: 11, color: "#1e293b" }}>⏱ {formatTime(s.time)} · {s.passed}/{s.total} test</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
