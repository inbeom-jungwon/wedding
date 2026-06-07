import { useEffect, useState } from 'react'
import { submitRsvp } from './rsvpSubmit.js'

const INITIAL = {
  side: '',
  attendance: '',
  meal: '',
  name: '',
}

function ChoiceGroup({ label, required, options, value, onChange, columns = 2 }) {
  return (
    <fieldset className="rsvp-field">
      <legend className="rsvp-label">
        {label}
        {required && <span className="text-[#c45c5c]">*</span>}
      </legend>
      <div className={`rsvp-choices rsvp-choices--${columns}`}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`rsvp-choice${value === opt.value ? ' is-selected' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export default function RsvpModal({ open, onClose }) {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  useEffect(() => {
    if (!open) {
      setForm(INITIAL)
      setStatus('idle')
      setError('')
    }
  }, [open])

  if (!open) return null

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }))

  const validate = () => {
    if (!form.side) return '어느 분의 하객이신지 선택해 주세요.'
    if (!form.attendance) return '참석 여부를 선택해 주세요.'
    if (form.attendance === '참석' && !form.meal) return '식사 여부를 선택해 주세요.'
    if (!form.name.trim()) return '성함을 입력해 주세요.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = validate()
    if (message) {
      setError(message)
      return
    }

    setError('')
    setStatus('loading')

    try {
      await submitRsvp({
        side: form.side,
        attendance: form.attendance,
        meal: form.attendance === '참석' ? form.meal : '',
        name: form.name.trim(),
      })
      setStatus('success')
    } catch (err) {
      setStatus('idle')
      setError(err.message || '제출에 실패했습니다.')
    }
  }

  return (
    <div className="rsvp-overlay" onClick={onClose}>
      <div
        className="rsvp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="rsvp-close" onClick={onClose} aria-label="닫기">
          ✕
        </button>

        {status === 'success' ? (
          <div className="rsvp-success">
            <p className="rsvp-title">감사합니다</p>
            <p className="rsvp-desc">
              참석 의사가 정상적으로 전달되었습니다.
              <br />
              소중한 마음 잊지 않겠습니다.
            </p>
            <button type="button" className="rsvp-submit" onClick={onClose}>
              닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 id="rsvp-title" className="rsvp-title">참석 의사 체크하기</h2>
            <p className="rsvp-desc">
              소중한 시간 내어 참석해 주시는 모든 분들께 정성스럽게 준비하오니
              <br />
              참석 여부를 알려주시면 감사하겠습니다.
            </p>

            <ChoiceGroup
              label="어느 분의 하객이신가요?"
              required
              value={form.side}
              onChange={set('side')}
              options={[
                { value: '신랑', label: '신랑' },
                { value: '신부', label: '신부' },
              ]}
            />

            <ChoiceGroup
              label="참석하실 수 있나요?"
              required
              value={form.attendance}
              onChange={(v) => setForm((f) => ({
                ...f,
                attendance: v,
                meal: v === '불참' ? '' : f.meal,
              }))}
              options={[
                { value: '참석', label: '참석할게요' },
                { value: '불참', label: '참석이 어려워요' },
              ]}
            />

            {form.attendance === '참석' && (
              <ChoiceGroup
                label="식사를 하실 예정인가요?"
                required
                value={form.meal}
                onChange={set('meal')}
                columns={3}
                options={[
                  { value: '네', label: '네' },
                  { value: '아니오', label: '아니오' },
                  { value: '미정', label: '미정' },
                ]}
              />
            )}

            <label className="rsvp-field block">
              <span className="rsvp-label">
                성함이 어떻게 되시나요?
                <span className="text-[#c45c5c]">*</span>
              </span>
              <input
                type="text"
                className="rsvp-input"
                placeholder="참석자 본인 성함"
                value={form.name}
                onChange={(e) => set('name')(e.target.value)}
                autoComplete="name"
              />
            </label>

            {error && <p className="rsvp-error">{error}</p>}

            <button type="submit" className="rsvp-submit" disabled={status === 'loading'}>
              {status === 'loading' ? '전송 중…' : '완료'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
