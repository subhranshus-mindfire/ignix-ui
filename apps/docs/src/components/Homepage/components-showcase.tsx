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
import { Spinner } from '../UI/spinner';
import { Tooltip } from '../UI/tooltip';
import { Mail } from 'lucide-react';
import { Badge } from '../UI/badge';

type CardDef = {
  id: string;
  title: string;
  desc: string;
  docHref: string; // route to docs
};

const CARDS: CardDef[] = [
  {
    id: 'button1',
    title: 'Buttons',
    desc: 'Variants and motion.',
    docHref: '/docs/components/button',
  },
  {
    id: 'button2',
    title: 'Buttons',
    desc: 'Variants and motion.',
    docHref: '/docs/components/button',
  },
  {
    id: 'slider',
    title: 'Slider',
    desc: 'Glow & value display.',
    docHref: '/docs/components/slider',
  },
  { id: 'badge', title: 'Badge', desc: 'Variants and motion.', docHref: '/docs/components/badge' },
  { id: 'switch1', title: 'Switch', desc: 'Tactile toggles.', docHref: '/docs/components/switch' },
  { id: 'switch2', title: 'Switch', desc: 'Square toggles.', docHref: '/docs/components/switch' },
  {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    desc: 'Progress steps.',
    docHref: '/docs/components/breadcrumbs',
  },
  { id: 'toast', title: 'Toast', desc: 'Animated alerts.', docHref: '/docs/components/toast' },
  {
    id: 'spinner',
    title: 'Spinner',
    desc: 'Variants and motion.',
    docHref: '/docs/components/spinner',
  },
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
    () => buildRow([CARDS[0], CARDS[2], CARDS[4], CARDS[3], CARDS[5]], 2),
    []
  );
  const secondRow = useMemo(() => buildRow([CARDS[1], CARDS[6], CARDS[7], CARDS[8]], 2), []);

  return (
    <section
      className=" relative rounded-3xl
      "
      aria-label="Featured components"
    >
      <header className="px-2 pb-4">
        <SectionTitleCapsule highlight="components" align="center" caseInsensitive>
          Featured Components
        </SectionTitleCapsule>
        <p className="text-center text-muted-foreground mt-2">
          Explore our collection of high-quality, ready-to-use components.
        </p>
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

function InlineDemo({ id }: { id: string }) {
  const toast = useToast();
  const [value, setValue] = React.useState(60);
  const [checked, setChecked] = React.useState(true);

  if (id === 'button1') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="outline" animationVariant="wobble">
          Outline
        </Button>
      </div>
    );
  }

  if (id === 'button2') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button animationVariant="pulse">Primary</Button>
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

  if (id === 'switch1') {
    return (
      <div className="flex items-center justify-center gap-4">
        <Switch variant="ios" animation="bounce" checked={checked} onCheckedChange={setChecked} />
      </div>
    );
  }

  if (id === 'switch2') {
    return (
      <div className="flex items-center justify-center gap-4">
        <Switch
          variant="square"
          animation="bounce"
          checked={!checked}
          onCheckedChange={(c) => setChecked(!c)}
        />
      </div>
    );
  }

  if (id === 'breadcrumbs') {
    return <Breadcrumbs steps={['Start', 'End']} currentStep={1} variant="step" />;
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

  if (id === 'spinner') {
    return (
      <div className="flex items-center justify-center">
        <Spinner size={40} color="border-primary" />
      </div>
    );
  }

  if (id === 'badge') {
    return (
      <div className="flex items-center justify-center gap-4">
        <Tooltip content="You have new notifications!" animation="slideUp">
          <div className="relative inline-flex items-center cursor-pointer">
            <Mail className="h-8 w-8 text-gray-400 hover:text-primary transition-colors" />
            <Badge
              text="3"
              type="primary"
              variant="bounce"
              className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center"
            />
          </div>
        </Tooltip>
      </div>
    );
  }

  return null;
}
