import './App.css'

function App() {

  return (
    <div className="bg-white text-base text-secondary antialiased" >
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-secondary-300">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">Tailwind v4 Config Smoke Test</h1>

            <label className="ml-auto inline-flex items-center gap-2 text-sm">
              <span className="text-secondary-700">Select (appearance none)</span>
              <div className="relative">
                <select name='brrr' className="pl-3 pr-8 py-1.5 rounded-lg bg-primary-300 text-black border border-primary-700 cursor-pointer">
                  <option>Option A</option>
                  <option>Option B</option>
                  <option>Option C</option>
                </select>
                <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-4 text-secondary-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </label>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
          <section className="card">
            <h2 className="text-xl font-semibold mb-3">Fonts</h2>
            <p className="mb-2">
              Body uses <span className="chip border-secondary-700 text-secondary-700 bg-secondary-300/40">Baloo Chettan 2 stack</span>
            </p>
            <p className="mb-4">The quick brown fox jumps over the lazy dog — ÁĂÂÊÔƠƯ ăâêôơư</p>
          <pre className="overflow-x-auto rounded-xl bg-tertiary-300/30 p-3">
            <code>{`const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};
greet("Tailwind v4");`}</code>
          </pre>
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Project Colors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="swatch bg-primary text-black border border-primary-700">bg-primary (#fbd905)</div>
                <div className="swatch bg-primary-300 text-black border border-primary-700">bg-primary-300 (#ffee82)</div>
                <div className="swatch bg-primary-700 text-black border border-primary">bg-primary-700 (#f9af18)</div>
                <div className="swatch border-2 border-primary text-secondary">border-primary</div>
                <div className="swatch text-primary border border-secondary-300">text-primary</div>
              </div>

              <div className="space-y-2">
                <div className="swatch bg-secondary text-white border border-secondary-700">bg-secondary</div>
                <div className="swatch bg-secondary-300 text-black border border-secondary-700">bg-secondary-300</div>
                <div className="swatch bg-secondary-700 text-white border border-secondary">bg-secondary-700</div>
                <div className="swatch border-2 border-secondary text-secondary-700">border-secondary</div>
                <div className="swatch text-secondary border border-secondary-300">text-secondary</div>
              </div>

              <div className="space-y-2">
                <div className="swatch bg-tertiary text-white border border-tertiary-700">bg-tertiary</div>
                <div className="swatch bg-tertiary-300 text-black border border-tertiary-700">bg-tertiary-300</div>
                <div className="swatch bg-tertiary-700 text-white border border-tertiary">bg-tertiary-700</div>
                <div className="swatch border-2 border-tertiary text-tertiary-700">border-tertiary</div>
                <div className="swatch text-tertiary border border-secondary-300">text-tertiary</div>
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Custom Drop Shadows</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="h-24 grid place-items-center bg-white border border-secondary-300 rounded-xl drop-shadow-secondary-1">
                <span>drop-shadow-secondary-1</span>
              </div>
              <div className="h-24 grid place-items-center bg-white border border-secondary-300 rounded-xl drop-shadow-secondary-2">
                <span>drop-shadow-secondary-2</span>
              </div>
              <div className="h-24 grid place-items-center bg-white border border-secondary-300 rounded-xl drop-shadow-secondary-4">
                <span>drop-shadow-secondary-4</span>
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Animations & Keyframes</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="h-24 grid place-items-center rounded-xl border border-secondary-300 bg-primary/20 animate-floating">
                <span>animate-floating (token)</span>
              </div>

              <div className="h-24 grid place-items-center rounded-xl border border-secondary-300 bg-primary-300/30 animate-[fade-in-out_3s_ease-in-out_infinite]">
                <span>animate-[fade-in-out_3s...]</span>
              </div>
              <div className="h-24 grid place-items-center rounded-xl border border-secondary-300 bg-tertiary-300/30 animate-[fadeIn_800ms_ease-in-out_infinite]">
                <span>animate-[fadeIn_800ms...]</span>
              </div>
              <div className="h-24 grid place-items-center rounded-xl border border-secondary-300 bg-secondary-300/30 animate-[fadeOut_1500ms_ease-in-out_infinite]">
                <span>animate-[fadeOut_1.5s...]</span>
              </div>
              <div className="h-24 grid place-items-center rounded-xl border border-secondary-300 bg-primary-300/30 animate-[slideInFromLeft_.7s_ease-out_infinite]">
                <span>animate-[slideInFromLeft_.7s...]</span>
              </div>
              <div className="h-24 grid place-items-center rounded-xl border border-secondary-300 bg-primary-300/30 animate-[slideInFromRight_.7s_ease-out_infinite]">
                <span>animate-[slideInFromRight_.7s...]</span>
              </div>
              <div className="h-24 grid place-items-center rounded-xl border border-secondary-300 bg-secondary-300/30 animate-[float_2s_ease-in-out_infinite]">
                <span>animate-[float_2s...]</span>
              </div>
              <div className="h-24 grid place-items-center rounded-xl border border-secondary-300 bg-tertiary-300/30 animate-[float1_2s_ease-in-out_infinite]">
                <span>animate-[float1_2s...]</span>
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Grid Rows (grid-rows-16)</h2>
            <div className="grid grid-cols-1 grid-rows-16 gap-1 h-96 border border-secondary-300 rounded-xl overflow-hidden">
              <div className="bg-primary/20 flex items-center justify-center text-xs">Row 1</div>
              <div className="bg-primary-300/30 flex items-center justify-center text-xs">Row 2</div>
              <div className="bg-primary/20 flex items-center justify-center text-xs">Row 3</div>
              <div className="bg-primary-300/30 flex items-center justify-center text-xs">Row 4</div>
              <div className="bg-primary/20 flex items-center justify-center text-xs">Row 5</div>
              <div className="bg-primary-300/30 flex items-center justify-center text-xs">Row 6</div>
              <div className="bg-primary/20 flex items-center justify-center text-xs">Row 7</div>
              <div className="bg-primary-300/30 flex items-center justify-center text-xs">Row 8</div>
              <div className="bg-primary/20 flex items-center justify-center text-xs">Row 9</div>
              <div className="bg-primary-300/30 flex items-center justify-center text-xs">Row 10</div>
              <div className="bg-primary/20 flex items-center justify-center text-xs">Row 11</div>
              <div className="bg-primary-300/30 flex items-center justify-center text-xs">Row 12</div>
              <div className="bg-primary/20 flex items-center justify-center text-xs">Row 13</div>
              <div className="bg-primary-300/30 flex items-center justify-center text-xs">Row 14</div>
              <div className="bg-primary/20 flex items-center justify-center text-xs">Row 15</div>
              <div className="bg-primary-300/30 flex items-center justify-center text-xs">Row 16</div>
            </div>
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Breakpoints</h2>
            <p className="mb-3">Resize the window — the visible chip shows the <em>current</em> breakpoint.</p>
            <div className="flex flex-wrap gap-2">
              <span className="chip bg-secondary-300/40 border-secondary-700 inline 2xs:hidden">below 2xs (&lt;360px)</span>
              <span className="chip bg-secondary-300/40 border-secondary-700 hidden 2xs:inline xs:hidden">2xs (≥360px)</span>
              <span className="chip bg-secondary-300/40 border-secondary-700 hidden xs:inline sm:hidden">xs (≥480px)</span>
              <span className="chip bg-secondary-300/40 border-secondary-700 hidden sm:inline md:hidden">sm (≥640px)</span>
              <span className="chip bg-secondary-300/40 border-secondary-700 hidden md:inline lg:hidden">md (≥760px)</span>
              <span className="chip bg-secondary-300/40 border-secondary-700 hidden lg:inline xl:hidden">lg (≥960px)</span>
              <span className="chip bg-secondary-300/40 border-secondary-700 hidden xl:inline 2xl:hidden">xl (≥1240px)</span>
              <span className="chip bg-secondary-300/40 border-secondary-700 hidden 2xl:inline 3xl:hidden">2xl (≥1536px)</span>
              <span className="chip bg-secondary-300/40 border-secondary-700 hidden 3xl:inline 4xl:hidden">3xl (≥1728px)</span>
              <span className="chip bg-secondary-300/40 border-secondary-700 hidden 4xl:inline">4xl (≥1920px)</span>
            </div>
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Hidden Scrollbars</h2>
            <div className="h-40 overflow-y-scroll rounded-xl border border-secondary-300 bg-secondary-300/20 p-3">
              <p className="mb-2">This box overflows vertically, but scrollbars should be hidden (WebKit + Firefox + body rules).</p>
              <div className="space-y-2">
                <p>Line 1 — Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Line 2 — Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Line 3 — Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                <p>Line 4 — Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
                <p>Line 5 — Cillum dolore eu fugiat nulla pariatur.</p>
                <p>Line 6 — Excepteur sint occaecat cupidatat non proident.</p>
                <p>Line 7 — Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Line 8 — More filler text…</p>
                <p>Line 9 — More filler text…</p>
                <p>Line 10 — More filler text…</p>
                <p>Line 11 — More filler text…</p>
                <p>Line 12 — More filler text…</p>
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Icon Font className</h2>
            <p className="mb-2">
              If your <code>icomoon</code> font is loaded, the spans below should render icons. Otherwise they
              just show the className name (still testing font-smoothing & font-family override):
            </p>
            <div className="flex flex-wrap gap-4 text-2xl">
              <span className="icon-home" title="icon-home">icon-home</span>
              <span className="icon-user" title="icon-user">icon-user</span>
              <span className="icon-star" title="icon-star">icon-star</span>
            </div>
          </section>
        </main>

        <footer className="max-w-6xl mx-auto px-4 pb-12 pt-4 text-sm text-secondary-700">
          <div>Made for testing <span className="font-semibold">Tailwind v4 @theme</span> tokens & utilities.</div>
        </footer>
    </div>
  )
}

export default App
