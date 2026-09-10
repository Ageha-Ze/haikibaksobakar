import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Flame, MapPin, MessageCircle, MoveRight, Play, Sparkles } from "lucide-react";

const WA_LINK = "https://wa.me/628993071991?text=Halo%20Haiki%20Bakso%20Bakar%2C%20saya%20mau%20pesan%20bakso%20bakar.";

const storySteps = [
  {
    kicker: "01 / MULAI DARI ADONAN",
    title: "Bulatnya serius.",
    copy: "Daging pilihan, bumbu yang berani, dan satu adonan yang siap masuk teflon panas. Kenyalnya dapet, gurihnya nempel.",
    image: "/manus-storage/hero-tusuk-teflon_023d185b.jpg",
    accent: "#ffbf1a",
  },
  {
    kicker: "02 / TEFLON DIPANASKAN",
    title: "Aromanya duluan datang.",
    copy: "Bakso kami ditusuk tiga-tiga lalu dipanggang di atas teflon datar sampai permukaannya karamél, sausnya mengilap, dan garis teflonnya keluar.",
    image: "/manus-storage/tusuk-action-teflon_a488ab55.jpg",
    accent: "#ff5a1f",
  },
  {
    kicker: "03 / SAUS DIKARAMELKAN",
    title: "Manis. Pedas. Nendang.",
    copy: "Saus racikan Haiki disapu ke tiga bakso di setiap tusuk. Setiap lapisan meresap, mengilap, dan menempel di setiap gigitan.",
    image: "/manus-storage/tusuk-sauce-teflon_e2b629e3.jpg",
    accent: "#ed1c24",
  },
  {
    kicker: "04 / ANGKAT DARI TEFLON",
    title: "Sekali gigit, langsung paham.",
    copy: "Bagian luar garing-karamel. Bagian dalam tetap juicy. Inilah bakso bakar teflon yang sausnya nggak cuma lewat di lidah.",
    image: "/manus-storage/hero-tusuk-teflon_023d185b.jpg",
    accent: "#f5e7ce",
  },
];

const flavors = [
  { number: "01", title: "Original Bara", note: "Smoky, gurih, familiar", color: "yellow" },
  { number: "02", title: "Pedas Gila", note: "Saus cabai, panasnya nagih", color: "red" },
  { number: "03", title: "Blackpepper", note: "Lada hitam, manis, bold", color: "cream" },
];

function useStoryScroll(ref: React.RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const total = Math.max(ref.current.offsetHeight - window.innerHeight, 1);
      const traveled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(traveled / total);
      const next = Math.min(storySteps.length - 1, Math.floor((traveled / total) * storySteps.length));
      setActive(next);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ref]);

  return { active, progress };
}

export default function Home() {
  const storyRef = useRef<HTMLElement | null>(null);
  const { active, progress } = useStoryScroll(storyRef);
  const activeStory = storySteps[active];

  return (
    <main className="site-shell">
      <div className="top-ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>BAKSO DITEFLON BUKAN DIREBUS</span><span>•</span><span>GLOSSY OUTSIDE / JUICY INSIDE</span><span>•</span><span>BAKSO DITEFLON BUKAN DIREBUS</span><span>•</span><span>GLOSSY OUTSIDE / JUICY INSIDE</span><span>•</span>
        </div>
      </div>

      <header className="nav-wrap">
        <a className="brand-lockup" href="#top" aria-label="Haiki Bakso Bakar home">
          <img src="/manus-storage/logo-haki-bakso-bakar_0d01f7b1.png" alt="Haiki Bakso Bakar" />
        </a>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <a href="#cerita">Cerita teflon</a>
          <a href="#menu">Menu</a>
          <a href="#lokasi">Temui kami</a>
        </nav>
        <a className="nav-cta" href={WA_LINK} target="_blank" rel="noreferrer">
          Pesan sekarang <ArrowUpRight size={16} />
        </a>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-backdrop" />
        <div className="hero-grain" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Jajanan malam, dinaikkan levelnya</p>
            <h1>BAKSO<br /><em>BAKAR</em><span className="hero-bang">!</span></h1>
            <p className="hero-lede">Tiga bakso kenyal di setiap tusuk, dipanggang di teflon datar, dilapisi saus, dan disajikan panas-panas. <strong>Haiki bikin nagih dari gigitan pertama.</strong></p>
            <div className="hero-actions">
              <a className="primary-button" href={WA_LINK} target="_blank" rel="noreferrer">Pesan lewat WhatsApp <ArrowUpRight size={18} /></a>
              <a className="text-link" href="#cerita">Lihat prosesnya <ArrowDownRight size={17} /></a>
            </div>
          </div>
          <div className="hero-stamp" aria-label="Tagline Haiki">
          <div className="stamp-ring"><span>TEFLON</span><span>HOT</span><span>WITH ATTITUDE</span></div>
            <Flame className="stamp-flame" size={30} fill="currentColor" />
          </div>
          <div className="hero-meta"><span>01 — 04</span><span>SCROLL TO TASTE</span></div>
        </div>
        <div className="hero-scroll-hint"><span>Gulir pelan</span><div className="scroll-line" /></div>
      </section>

      <section ref={storyRef} id="cerita" className="story-section">
        <div className="story-sticky">
          <div className="story-progress"><span style={{ transform: `scaleY(${Math.max(progress, 0.04)})` }} /></div>
          <div className="story-copy-panel">
            <p className="eyebrow"><span className="eyebrow-dot" /> The Haiki Method</p>
            <p className="story-index">0{active + 1} <span>/ 04</span></p>
            <h2 key={active} className="story-title">{activeStory.title}</h2>
            <p key={`copy-${active}`} className="story-copy">{activeStory.copy}</p>
            <div className="story-label" style={{ color: activeStory.accent }}>{activeStory.kicker}</div>
            <a className="circle-arrow" href={WA_LINK} target="_blank" rel="noreferrer" aria-label="Pesan Haiki sekarang"><MoveRight size={22} /></a>
          </div>
          <div className="story-visual-wrap">
            <div className="story-visual-shadow" />
            <div className="story-visual" style={{ backgroundImage: `url(${activeStory.image})`, transform: `translate3d(${(progress * 18) - 8}%, ${(active * 2) - 3}%, 0) rotate(${active % 2 ? -1.5 : 1.5}deg) scale(${1.08 + progress * 0.04})` }} />
            <div className="story-overlay-word">HAIKI</div>
            <div className="story-chip"><Sparkles size={14} /> teflonnya panas</div>
          </div>
        </div>
        <div className="story-steps" aria-label="Tahapan cerita Haiki">
          {storySteps.map((step, index) => <div className="story-step" key={step.kicker} data-step={index} aria-hidden="true" />)}
        </div>
      </section>

      <section id="menu" className="menu-section">
        <div className="section-topline"><span>02 / PILIHAN RASA</span><span>Semua dibakar setelah dipesan</span></div>
        <div className="menu-intro">
          <h2>Rasa yang<br /><em>punya glaze.</em></h2>
          <p>Mulai dari yang aman sampai yang bikin keringetan. Semua dibuat fresh, semua punya karakter.</p>
        </div>
        <div className="flavor-grid">
          {flavors.map((flavor) => (
            <article className={`flavor-card flavor-${flavor.color}`} key={flavor.number}>
              <div className="flavor-no">{flavor.number}</div>
              <div className="flavor-icon"><Flame size={27} fill="currentColor" /></div>
              <h3>{flavor.title}</h3>
              <p>{flavor.note}</p>
              <ArrowUpRight className="card-arrow" size={22} />
            </article>
          ))}
        </div>
        <div className="menu-note"><span>TIP:</span> Pesan 3 tusuk untuk dapat 9 bakso. Jangan lupa ekstra saus teflon.</div>
      </section>

      <section id="lokasi" className="final-section">
        <div className="final-art"><img src="/manus-storage/tusuk-sauce-teflon_e2b629e3.jpg" alt="Tiga bakso per tusuk dipanggang di atas teflon datar dengan saus pedas mengilap" /><div className="final-art-tag">TEFLON<br />MASIH<br />PANAS</div></div>
        <div className="final-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Kapan pun kamu siap</p>
          <h2>Jangan biarkan<br /><em>ngidam</em> jadi wacana.</h2>
          <p>Haiki siap nemenin malam kamu. Klik, pilih tusukmu, dan kami panggang tiga-tiga di teflon sampai aromanya sampai ke chat.</p>
          <a className="primary-button large" href={WA_LINK} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Chat 0899 3071 991 <ArrowUpRight size={18} /></a>
          <div className="contact-details"><span><MapPin size={15} /> Jakarta & sekitarnya</span><span><Play size={14} fill="currentColor" /> Open nightly</span></div>
        </div>
      </section>

      <footer className="footer"><img src="/manus-storage/logo-haki-bakso-bakar_0d01f7b1.png" alt="Haiki Bakso Bakar" /><span>© 2026 Haiki Bakso Bakar</span><span>Made over hot teflon, served with attitude.</span></footer>
    </main>
  );
}
