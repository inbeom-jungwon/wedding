import saveDateImg from './assets/save_the_date.png'
const INVITE = {
  groom: '박인범',
  bride: '최정원',
  groomParents: '박 일용 · 이 미경',
  brideParents: '최 병욱 · 김 명경',
  date: '2026.09.13',
  time: '5PM',
  venueEn: 'Seokpajung',
  venueKo: '석파정',
  venueSub: '(서울미술관)',
  address: '서울특별시 종로구 창의문로11길 4-1',
  mapUrl: `https://m.map.naver.com/search2/search.naver?query=${encodeURIComponent('석파정')}#/map`,
}

function App() {
  return (
    <div className="mx-auto flex min-h-svh max-w-sm flex-col items-center bg-bg px-6 pb-20 pt-16 text-center">

      {/* We invited you to.. */}
      <p
        className="mb-6 text-cream"
        style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2rem,9vw,2.6rem)', lineHeight: 1.2 }}
      >
        We invited you to..
      </p>

      {/* 장식 별 */}
      <p className="mb-8 tracking-wider text-cream/50 text-xs" style={{ fontFamily: 'var(--font-sc)' }}>* * *</p>

      {/* 린넨 카드 */}
      <div
        className="w-full rounded-sm px-8 py-16 text-[#2c2420]"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}linen.png)`,
          backgroundSize: '100% 100%',
        }}
      >
        {/* Save the Date */}
        <img
          src={saveDateImg}
          alt="Save the Date"
          className="fade-up mx-auto mb-5 w-4/5"
          style={{ animationDelay: '0.2s' }}
        />

        <p
          className="fade-up mb-1 tracking-wider text-[#2c2420]"
          style={{ fontFamily: 'var(--font-sc)', fontSize: '0.85rem', animationDelay: '0.5s' }}
        >
          {INVITE.date}
        </p>
        <p
          className="fade-up mb-4 tracking-wider text-[#2c2420]"
          style={{ fontFamily: 'var(--font-sc)', fontSize: '0.82rem', animationDelay: '0.8s' }}
        >
          {INVITE.time}
        </p>
        <p
          className="fade-up uppercase tracking-wider text-[#2c2420]"
          style={{ fontFamily: 'var(--font-sc)', fontSize: '0.75rem', animationDelay: '1.1s' }}
        >
          {INVITE.venueEn}
        </p>
      </div>

      {/* 부모님 */}
      <div className="mt-14 space-y-0.5 text-[0.8rem] font-light leading-snug text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
        <p>
          <span className="text-cream/60">{INVITE.groomParents}</span>
          <span className="mx-2 text-cream/30">의 아들</span>
          <span className="text-cream">{INVITE.groom}</span>
        </p>
        <p>
          <span className="text-cream/60">{INVITE.brideParents}</span>
          <span className="mx-2 text-cream/30">의 딸</span>
          <span className="text-cream">{INVITE.bride}</span>
        </p>
      </div>

      {/* 날짜 반복 */}
      <div className="mt-10 space-y-0.5 font-display text-[0.95rem] tracking-widest text-cream/80">
        <p>{INVITE.date}</p>
        <p>{INVITE.time}</p>
      </div>

      {/* 장소 */}
      <div className="mt-6">
        <p
          className="font-light tracking-[0.4em] text-cream"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.85rem,3.5vw,1rem)' }}
        >
          {INVITE.venueKo}
        </p>
        <p className="mt-1 text-xs font-light tracking-widest text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
          {INVITE.venueSub}
        </p>
      </div>

      {/* 지도 버튼 */}
      <a
        href={INVITE.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-10 block rounded border border-cream/20 px-8 py-2.5 text-[0.8rem] font-semibold tracking-widest text-cream/70 uppercase transition-colors hover:border-cream/40 hover:text-cream"
      >
        지도 보기
      </a>

      <footer className="mt-14 text-[0.75rem] tracking-[0.3em] text-muted">
        감사합니다
      </footer>
    </div>
  )
}

export default App
