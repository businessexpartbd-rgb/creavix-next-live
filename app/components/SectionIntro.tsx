import Reveal from './Reveal';

interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  accent?: string;
  body?: string;
  body_bn?: string;
  align?: 'left' | 'center';
}

export default function SectionIntro({
  eyebrow,
  title,
  accent,
  body,
  body_bn,
  align = 'left',
}: SectionIntroProps) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  return (
    <Reveal>
      <div className={`flex max-w-3xl flex-col gap-5 ${alignment}`}>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 className="font-serif text-balance text-4xl font-normal leading-tight tracking-tight text-warm-fg sm:text-5xl lg:text-6xl xl:text-7xl">
          {title}
          {accent ? (
            <>
              {' '}
              <span className="font-display text-warm-accent">{accent}</span>
            </>
          ) : null}
        </h2>
        {body ? (
          <p className="max-w-2xl text-base leading-7 text-warm-muted sm:text-[17px]">{body}</p>
        ) : null}
        {body_bn ? (
          <p className="max-w-2xl font-bn text-sm leading-7 text-warm-muted sm:text-base">{body_bn}</p>
        ) : null}
      </div>
    </Reveal>
  );
}
