import Reveal from './Reveal';

export default function SectionIntro({
  eyebrow,
  title,
  accent,
  body,
  align = 'left',
}) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  return (
    <Reveal>
      <div className={`flex max-w-3xl flex-col gap-5 ${alignment}`}>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}{' '}
          {accent ? <span className="accent">{accent}</span> : null}
        </h2>
        {body ? (
          <p className="max-w-2xl text-base leading-7 text-zinc-400 sm:text-[17px]">{body}</p>
        ) : null}
      </div>
    </Reveal>
  );
}
