import React, { useMemo } from 'react';
import { Button } from '@site/src/components/UI/button';
import { Slider } from '@site/src/components/UI/slider';
import { Switch } from '@site/src/components/UI/switch';
import { Breadcrumbs } from '@site/src/components/UI/breadcrumbs';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useToast } from '@site/src/components/UI/toast/use-toast';
import { Marquee } from '@site/src/components/UI/marquee'; // <-- your Marquee component
import Link from '@docusaurus/Link';
import { SectionTitleCapsule } from './section-title';

type CardId = 'buttons' | 'slider' | 'switch' | 'breadcrumbs' | 'toast';

type CardDef = {
  id: CardId;
  title: string;
  desc: string;
  docHref: string; // route to docs
};

const CARDS: CardDef[] = [
  { id: 'buttons', title: 'Buttons', desc: 'Variants and motion.', docHref: '/docs/components/button' },
  { id: 'slider', title: 'Slider', desc: 'Glow & value display.', docHref: '/docs/components/slider' },
  { id: 'switch', title: 'Switch', desc: 'Tactile toggles.', docHref: '/docs/components/switch' },
  { id: 'breadcrumbs', title: 'Breadcrumbs', desc: 'Progress steps.', docHref: '/docs/components/breadcrumbs' },
  { id: 'toast', title: 'Toast', desc: 'Animated alerts.', docHref: '/docs/components/toast' },
];

// Optional: duplicate to make each row feel sufficiently long
function buildRow(cards: CardDef[], repeat = 2) {
  return Array.from({ length: repeat })
    .fill(0)
    .flatMap(() => cards);
}

export default function FeaturedComponents() {
  // Split into two sets (interleave to mix visuals)
  const firstRow = useMemo(
    () => buildRow([CARDS[0], CARDS[2], CARDS[4], CARDS[1], CARDS[3]], 2),
    []
  );
  const secondRow = useMemo(
    () => buildRow([CARDS[3], CARDS[1], CARDS[4], CARDS[2], CARDS[0]], 2),
    []
  );

  return (
    <section className=" relative rounded-3xl border border-border/60 backdrop-blur p-4 overflow-hidden
        bg-[linear-gradient(to_bottom_right,_color-mix(in_oklab,var(--background),_transparent_20%),_color-mix(in_oklab,var(--background),_transparent_10%))]
        after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:rounded-3xl
        after:bg-[radial-gradient(1200px_600px_at_50%_40%,_transparent_35%,_rgba(0,0,0,0.08)_85%)]
        after:opacity-60
        before:content-[''] before:absolute before:-inset-[35%] before:pointer-events-none before:blur-[70px]
        before:mix-blend-screen before:opacity-55
        before:bg-[radial-gradient(700px_360px_at_20%_15%,_color-mix(in_oklab,var(--primary),_transparent),_transparent_70%),radial-gradient(700px_360px_at_80%_20%,_color-mix(in_oklab,var(--secondary),_transparent),_transparent_70%),radial-gradient(520px_260px_at_50%_110%,_color-mix(in_oklab,var(--muted),_transparent),_transparent_70%)]
        motion-safe:before:animate-[meshFloat_22s_ease-in-out_infinite_alternate]
        motion-safe:animate-[none]
        [@keyframes_meshFloat]{0%{transform:translate3d(-2%,-1%,0)_scale(1)}100%{transform:translate3d(2%,1%,0)_scale(1.03)}}
      "
      aria-label="Featured components"
    >
      <header className="px-2 pb-4">
        <SectionTitleCapsule highlight="components" align="center" caseInsensitive>
          Featured Components
        </SectionTitleCapsule>
        <p className="text-center text-muted-foreground mt-2">Explore our collection of high-quality, ready-to-use components.</p>
      </header>

      <div className="space-y-4">
        <Marquee className="rounded-xl" pauseOnHover repeat={3}>
          {firstRow.map((card, i) => (
            <Card key={`${card.id}-${i}`} card={card} />
          ))}
        </Marquee>

        {/* Row 2: right-to-left (reverse) */}
        <Marquee className="rounded-xl" reverse pauseOnHover repeat={3}>
          {secondRow.map((card, i) => (
            <Card key={`${card.id}-${i}`} card={card} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Card({ card }: { card: CardDef }) {
  return (
    <div
      className="mx-2 w-[280px] md:w-[320px] flex-shrink-0 rounded-2xl border border-border/60 bg-background/70 backdrop-blur p-4 shadow-sm
                 hover:shadow-md transition-shadow"
      role="group"
      aria-label={card.title}
    >
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <h4 className="text-base md:text-lg font-semibold">{card.title}</h4>
        </div>
        <p className="text-sm text-muted-foreground">{card.desc}</p>
      </div>

      <div className="rounded-xl p-2">
        <InlineDemo id={card.id} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Link
          to={card.docHref}
          className="text-xs rounded-full border px-3 py-1 hover:bg-accent"
          aria-label={`Go to ${card.title} docs`}
        >
          Try
        </Link>
        <div className="flex gap-1 opacity-70">
          <Dot />
          <Dot />
          <Dot />
        </div>
      </div>
    </div>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-muted inline-block" />;
}

function InlineDemo({ id }: { id: CardId }) {
  const toast = useToast();
  const [value, setValue] = React.useState(60);
  const [checked, setChecked] = React.useState(true);

  if (id === 'buttons') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button animationVariant="pulse">Primary</Button>
        <Button variant="outline" animationVariant="wobble">Outline</Button>
      </div>
    );
  }

  if (id === 'slider') {
    return (
      <Slider
        value={[value]}
        onValueChange={(v) => setValue(v[0])}
        animationType="breathe"
        showValue
        valueSuffix="%"
        glowEffect
      />
    );
  }

  if (id === 'switch') {
    return (
      <div className="flex items-center justify-center gap-4">
        <Switch variant="ios" animation="bounce" checked={checked} onCheckedChange={setChecked} />
        <Switch variant="square" animation="jelly" checked={!checked} onCheckedChange={(c) => setChecked(!c)} />
      </div>
    );
  }

  if (id === 'breadcrumbs') {
    return (
      <Breadcrumbs steps={['Start', 'End']} currentStep={1} variant="step" />
    );
  }

  if (id === 'toast') {
    return (
      <Button
        onClick={() =>
          toast.addToast({
            message: 'Hello from Ignix UI!',
            variant: 'success',
            animation: 'slide',
            icon: <InfoCircledIcon className="w-5 h-5" />,
          })
        }
      >
        Show Toast
      </Button>
    );
  }

  return null;
}
