/* --- RESET --- */
* { box-sizing: border-box; margin: 0; padding: 0; cursor: none !important; }

html {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
html::-webkit-scrollbar { display: none; } /* Chrome/Safari */

body {
  background-color: #fff;
  font-family: "Montserrat", sans-serif;
  color: #111;
  min-height: 200vh; /* This is required to allow scrolling */
  overflow-x: hidden;
}

/* --- CURSOR --- */
.cursor-dot, .cursor-follower {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 10000;
}
.cursor-dot { width: 6px; height: 6px; background: #111; border-radius: 50%; }
.cursor-follower {
  width: 40px; height: 40px; border: 1px solid rgba(0,0,0,0.2);
  border-radius: 50%; margin: -20px 0 0 -20px;
  transition: width 0.3s, height 0.3s, background 0.3s;
}
.cursor-follower.hover-active { width: 60px; height: 60px; background: rgba(0,0,0,0.05); }

/* --- CIRCULAR TEXT (CORNER) --- */
.circular-text-container {
  position: fixed;
  bottom: -40px;
  right: -40px;
  width: 220px;
  height: 220px;
  z-index: 1000; /* High z-index to stay above content */
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
}
.circular-text-container svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* --- LAYOUT --- */
.sticky-frame {
  position: fixed; /* Keep the hero content visible while background scrolls */
  top: 0; left: 0;
  width: 100%; height: 100vh;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  z-index: 10;
}

.hero-content {
  display: grid; grid-template-columns: 1.2fr 1fr;
  width: 100%; max-width: 1100px;
  padding: 0 40px; align-items: center;
  gap: 40px;
}

.hero-name { font-family: "Playfair Display", serif; font-size: clamp(40px, 6vw, 80px); line-height: 1.1; margin: 10px 0; }
.hero-sub { color: #666; font-size: 18px; font-weight: 300; }
.badge { background: #f4f4f4; padding: 4px 10px; border-radius: 6px; font-size: 14px; color: #111; }

.hero-illustration { width: 100%; max-height: 450px; object-fit: contain; }

/* --- NAVIGATION --- */
.bottom-nav { position: absolute; bottom: 50px; left: 50%; transform: translateX(-50%); z-index: 2000; }
.nav-group { display: flex; gap: 15px; }
.nav-button {
  background: #111; color: #fff; text-decoration: none;
  padding: 14px 28px; border-radius: 50px; font-size: 14px;
  display: flex; align-items: center; gap: 10px; transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.nav-button:hover { background: #333; transform: translateY(-3px); }
.nav-button::after {
  content: '↗'; font-size: 14px; opacity: 0.7;
}

.signature {
  position: absolute; right: 30px; bottom: 30px;
  writing-mode: vertical-rl; transform: rotate(180deg);
  font-size: 10px; color: #bbb; letter-spacing: 2px;
}
