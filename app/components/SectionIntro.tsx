import AnimatedHeading from './AnimatedHeading';
import AnimatedText from './AnimatedText';

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
    <div className={`flex max-w-3xl flex-col gap-5 ${alignment}`}>
      {eyebrow ? (
        <AnimatedText delay={0} className="eyebrow">
          {eyebrow}
        </AnimatedText>
      ) : null}
      <AnimatedHeading
        level={2}
        delay={80}
        className="font-display text-balance text-4xl font-bold uppercase leading-[0.95] tracking-[0.04em] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
      >
        {title}
        {accent ? (
          <>
            {' '}
            <span className="accent">{accent}</span>
          </>
        ) : null}
      </AnimatedHeading>
      {body ? (
        <AnimatedText delay={160} className="max-w-2xl text-base leading-7 text-ash-300 sm:text-[17px]">
          {body}
        </AnimatedText>
      ) : null}
      {body_bn ? (
        <AnimatedText delay={240} className="max-w-2xl font-bn text-sm leading-7 text-ash-200 sm:text-base">
          {body_bn}
        </AnimatedText>
      ) : null}
    </div>
  );
}
