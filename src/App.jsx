/** 아래 값만 바꿔서 커스터마이즈하세요 */
const INVITE = {
  groom: '박인범',
  bride: '최정원',
  subtitle: '저희 두 사람이 사랑으로 하나가 되려 합니다',
  dateLine: '2026년 9월 13일 일요일 오후 5시',
  venue: '석파정',
  address: '서울특별시 종로구 창의문로 11길 4-1',
  mapUrl: `https://m.map.naver.com/search2/search.naver?query=${encodeURIComponent('석파정')}#/map`,
  message:
    '소중한 분들을 초대합니다. 따뜻한 마음으로 축복해 주시면 큰 기쁨이 되겠습니다.',
}

const demoGif = `${import.meta.env.BASE_URL}invitation-demo.gif`

function App() {
  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col items-stretch px-6 pb-14 pt-10 text-center">
      <header className="mb-8">
        <p className="mb-3 font-display text-[0.8125rem] uppercase tracking-[0.28em] text-accent">
          Wedding Invitation
        </p>
        <h1 className="mb-4 font-display text-[clamp(2rem,8vw,2.75rem)] font-semibold leading-tight tracking-wide text-ink">
          <span className="inline">{INVITE.groom}</span>
          <span className="mx-[0.35em] inline-block font-normal text-accent" aria-hidden="true">
            ·
          </span>
          <span className="inline">{INVITE.bride}</span>
        </h1>
        <p className="m-0 text-[0.9375rem] font-light leading-relaxed text-ink-muted">
          {INVITE.subtitle}
        </p>
      </header>

      <figure className="m-0 mb-8 p-0">
        <img
          src={demoGif}
          alt="축하 인사 GIF 예시"
          className="mx-auto aspect-square w-full max-w-[280px] rounded-full border-4 border-white object-cover shadow-invite"
          width={480}
          height={480}
          loading="eager"
        />
      </figure>

      <section
        className="mb-7 rounded-xl border border-line bg-white p-6 px-5 text-left shadow-invite"
        aria-labelledby="when-where"
      >
        <h2
          id="when-where"
          className="mb-4 text-center text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-accent"
        >
          일시 · 장소
        </h2>
        <dl className="m-0">
          <div className="mb-4 last:mb-0">
            <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">일시</dt>
            <dd className="m-0 text-[0.9375rem] text-ink">{INVITE.dateLine}</dd>
          </div>
          <div className="mb-4 last:mb-0">
            <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">장소</dt>
            <dd className="m-0 text-[0.9375rem] text-ink">
              {INVITE.venue}
              <br />
              <span className="text-sm font-light text-ink-muted">{INVITE.address}</span>
            </dd>
          </div>
        </dl>
        <a
          className="mt-5 block rounded-lg border border-line px-[0.65rem] py-[0.65rem] text-center text-sm font-semibold text-accent transition-colors hover:border-accent/25 hover:bg-accent/10"
          href={INVITE.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          지도 보기
        </a>
      </section>

      <p className="mb-auto m-0 text-[0.9375rem] font-light leading-[1.85] text-ink-muted">
        {INVITE.message}
      </p>

      <footer className="mt-10 border-t border-line pt-6 text-[0.8125rem] tracking-[0.2em] text-ink-muted">
        <p className="m-0">감사합니다</p>
      </footer>
    </div>
  )
}

export default App
