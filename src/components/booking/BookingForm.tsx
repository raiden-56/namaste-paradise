'use client';

import { AlertCircle, ArrowLeft, Check, ExternalLink, Minus, Plus } from 'lucide-react';
import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { buttonClass } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { activePackages, NOT_SURE_PACKAGE } from '@/config/packages';
import { isWhatsAppConfigured, whatsappConfig } from '@/config/whatsapp';
import type { BookingRequest } from '@/types';
import { cn } from '@/utils/cn';
import { todayISO, validateBooking, type BookingErrors } from '@/utils/validation';
import { buildBookingMessage, buildWhatsAppUrl, openWhatsApp } from '@/utils/whatsapp';

const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236e8896' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")";

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-soft">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-center gap-2 text-[13px] text-sun">
          <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} /> {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-[13px] text-mute">{hint}</p>
      ) : null}
    </div>
  );
}

function Stepper({ id, value, min, label, onChange }: { id: string; value: number; min: number; label: string; onChange: (v: number) => void }) {
  const max = whatsappConfig.maxGuests;
  return (
    <div className="field flex items-center justify-between !px-1">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Fewer ${label}`} className="grid h-9 w-9 place-items-center rounded-full text-soft transition-colors duration-160 hover:bg-ink/5 hover:text-ink disabled:opacity-30">
        <Minus className="h-4 w-4" strokeWidth={1.5} />
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Math.max(min, Math.floor(Number(e.target.value) || 0)))}
        className="w-12 bg-transparent text-center font-mono text-[15px] tabular-nums text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} aria-label={`More ${label}`} className="grid h-9 w-9 place-items-center rounded-full text-soft transition-colors duration-160 hover:bg-ink/5 hover:text-ink">
        <Plus className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}

export function BookingForm({ initialPackageId = '', compact = false }: { initialPackageId?: string; compact?: boolean }) {
  const uid = useId();
  const fid = (k: string) => `${uid}-${k}`;
  const [values, setValues] = useState<BookingRequest>({
    name: '',
    whatsapp: '',
    packageId: initialPackageId,
    date: '',
    time: '',
    adults: 2,
    children: 0,
    requirements: '',
  });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const set = <K extends keyof BookingRequest>(key: K, value: BookingRequest[K]) =>
    setValues((v) => {
      const next = { ...v, [key]: value };
      if (submitted) setErrors(validateBooking(next));
      return next;
    });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateBooking(values);
    setErrors(errs);
    const keys = Object.keys(errs);
    if (keys.length) {
      document.getElementById(fid(keys[0] === 'guests' ? 'adults' : keys[0]))?.focus();
      return;
    }
    const url = buildWhatsAppUrl(buildBookingMessage({ ...values, packageId: values.packageId === NOT_SURE_PACKAGE ? '' : values.packageId }));
    setSentUrl(url);
    openWhatsApp(url);
  };

  const err = (k: keyof BookingErrors) => (submitted ? errors[k] : undefined);
  const aria = (k: keyof BookingErrors) => ({
    'aria-invalid': err(k) ? (true as const) : undefined,
    'aria-describedby': err(k) ? `${fid(k)}-error` : undefined,
  });
  const grid = cn('grid gap-5', !compact && 'sm:grid-cols-2');

  if (sentUrl) {
    return (
      <div role="status" aria-live="polite" className="py-2">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-glow text-on-glow shadow-glow">
          <WhatsAppIcon className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-subtitle">Your request is ready in WhatsApp</h3>
        <p className="mt-3 text-soft">
          We opened WhatsApp with your details filled in. Press send to share them with our team.
        </p>
        <div className="mt-6 rounded-card border border-glow/30 bg-glow/[0.06] p-4 text-[14px] leading-[1.6] text-ink">
          This is not a confirmed booking yet. Your trip is confirmed only after our team replies on WhatsApp with availability, timing,
          pricing and boarding details.
        </div>
        <ol className="mt-6 space-y-3 text-[14px] text-soft">
          {['Send the message in WhatsApp', 'We check availability and sea conditions', 'You get confirmation, pricing and boarding details'].map((s) => (
            <li key={s} className="flex items-center gap-3">
              <Check className="h-4 w-4 shrink-0 text-mute" strokeWidth={1.5} /> {s}
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('primary')}>
            <ExternalLink className="h-4 w-4" strokeWidth={1.5} /> Open WhatsApp again
          </a>
          <button type="button" onClick={() => setSentUrl(null)} className={buttonClass('ghost')}>
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Edit request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {!isWhatsAppConfigured && process.env.NODE_ENV === 'development' && (
        <p className="rounded-[14px] border border-dashed border-ink/20 p-3 font-mono text-[12px] text-mute">
          Dev note: add the real number in src/config/whatsapp.ts
        </p>
      )}
      <div className={grid}>
        <Field id={fid('name')} label="Full name" error={err('name')}>
          <input id={fid('name')} className="field" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} {...aria('name')} />
        </Field>
        <Field id={fid('whatsapp')} label="WhatsApp number" error={err('whatsapp')}>
          <input id={fid('whatsapp')} className="field font-mono tabular-nums" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" value={values.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} {...aria('whatsapp')} />
        </Field>
      </div>

      <Field id={fid('packageId')} label="Experience" error={err('packageId')}>
        <select id={fid('packageId')} className="field appearance-none bg-[length:18px] bg-[right_12px_center] bg-no-repeat pr-10" style={{ backgroundImage: chevron }} value={values.packageId} onChange={(e) => set('packageId', e.target.value)} {...aria('packageId')}>
          <option value="" disabled>
            Choose a package
          </option>
          {activePackages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
          <option value={NOT_SURE_PACKAGE}>Not sure yet, please suggest</option>
        </select>
      </Field>

      <div className={grid}>
        <Field id={fid('date')} label="Preferred date" error={err('date')}>
          <input id={fid('date')} type="date" min={todayISO()} className="field font-mono" value={values.date} onChange={(e) => set('date', e.target.value)} {...aria('date')} />
        </Field>
        <Field id={fid('time')} label="Preferred time" error={err('time')}>
          <select id={fid('time')} className="field appearance-none bg-[length:18px] bg-[right_12px_center] bg-no-repeat pr-10" style={{ backgroundImage: chevron }} value={values.time} onChange={(e) => set('time', e.target.value)} {...aria('time')}>
            <option value="" disabled>
              Choose a time
            </option>
            {whatsappConfig.timeSlots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Field id={fid('adults')} label="Adults" error={err('adults') ?? err('guests')}>
          <Stepper id={fid('adults')} label="adults" value={values.adults} min={1} onChange={(v) => set('adults', v)} />
        </Field>
        <Field id={fid('children')} label="Children" error={err('children')}>
          <Stepper id={fid('children')} label="children" value={values.children} min={0} onChange={(v) => set('children', v)} />
        </Field>
      </div>

      <Field id={fid('requirements')} label="Special requirements" error={err('requirements')} hint="Optional — celebrations, accessibility needs, children’s ages">
        <textarea id={fid('requirements')} rows={3} maxLength={520} className="field resize-none" value={values.requirements} onChange={(e) => set('requirements', e.target.value)} {...aria('requirements')} />
      </Field>

      <div className="pt-1">
        <button type="submit" className={buttonClass('glow', 'lg', 'w-full')}>
          <WhatsAppIcon /> Send request on WhatsApp
        </button>
        <p className="mt-3 text-center text-[13px] text-mute">No online payment. Confirmed only after our team replies</p>
      </div>
    </form>
  );
}
