// components/YouTubePromo.tsx
import YTLogo from "@/assets/ytlogo.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Play, Users, Youtube } from "lucide-react";

const videos = [
  {
    id: "9JIAtBjy0Z0",
    title: "The Immortal Jellyfish Explained",
    meta: "249 views • 1 day ago",
  },
  {
    id: "2a6BRN0TXu0",
    title: "Top 5 Smartest Animals and How We Measure Intelligence",
    meta: "633 views • 3 days ago",
  },
  {
    id: "uswcbDK2HeM",
    title: "How Bees Make Honey",
    meta: "1.3K views • 5 days ago",
  },
];

const subs = "248K subscribers";
const views = "630,341,877 total views";

// choose middle as hero, sides as supporting
const [left, center, right] = [videos[0], videos[2], videos[1]];

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
};

export default function YouTubePromo() {
  return (
    <section className="py-24 md:py-28 bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[-25%] h-[150%] bg-[radial-gradient(65%_60%_at_50%_0%,rgba(0,0,0,0.06),rgba(0,0,0,0)_60%)]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          {...fade}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-5xl mx-auto text-center mb-10 md:mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Subscribe to our <span className="text-primary">YouTube</span>
          </h2>
          <p className="mt-4 md:mt-5 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We create and share videos about nature, animals, climate change,
            sustainability, and much more.
          </p>
        </motion.div>

        {/* Channel header */}
        <motion.div
          {...fade}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-6xl mx-auto mb-10 md:mb-14"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <img
              src={YTLogo}
              alt="Forevergreen"
              className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white object-contain shadow-sm"
            />
            <div className="text-center sm:text-left">
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                Forevergreen
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                @Forevergreenapp • {subs}
              </div>
            </div>
            <div className="flex gap-3 mt-2 sm:mt-0">
              <Button
                variant="secondary"
                className="px-5 py-2 text-base rounded-full"
              >
                Join
              </Button>
              <Button className="px-6 py-2 text-base rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
                <Youtube className="h-5 w-5 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Videos row */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            {/* Left (tilted only on md+) */}
            <motion.div
              {...fade}
              transition={{ duration: 0.55 }}
              className="md:mt-10"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <TiltedVideoCard v={left} rotate="-6" />
              </motion.div>
            </motion.div>

            {/* Center */}
            <motion.div
              {...fade}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="md:mt-0"
            >
              <FeaturedVideoCard v={center} />
            </motion.div>

            {/* Right (tilted only on md+) */}
            <motion.div
              {...fade}
              transition={{ duration: 0.55 }}
              className="md:mt-10"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.35,
                }}
              >
                <TiltedVideoCard v={right} rotate="6" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats + CTA */}
        <motion.div
          {...fade}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mt-14 md:mt-16 space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-lg md:text-xl text-foreground font-medium">
            <div className="inline-flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>{subs}</span>
            </div>
            <span className="hidden sm:block text-muted-foreground">•</span>
            <div className="inline-flex items-center gap-2">
              <Play className="h-5 w-5" />
              <span>{views}</span>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-[#FF0000] hover:bg-[#E60000] text-white text-lg md:text-xl px-8 md:px-10 py-6 md:py-7 inline-flex items-center gap-3 rounded-full shadow-lg transition-all duration-300"
          >
            <Youtube className="h-7 w-7" />
            Subscribe on YouTube
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/* ——— Cards ——— */

function FeaturedVideoCard({ v }: { v: (typeof videos)[number] }) {
  return (
    <Card className="overflow-hidden bg-white border-0 shadow-[0_16px_60px_rgba(0,0,0,0.20)] rounded-2xl">
      <div className="aspect-video relative">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1&controls=0&showinfo=0`}
          title={v.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="p-5 md:p-6">
        <h3 className="font-semibold text-lg md:text-xl text-foreground line-clamp-2">
          {v.title}
        </h3>
        <div className="mt-1.5 text-sm md:text-base text-muted-foreground">
          {v.meta}
        </div>
      </div>
    </Card>
  );
}

function TiltedVideoCard({
  v,
  rotate = "-6",
}: {
  v: (typeof videos)[number];
  rotate?: "-6" | "6" | "0";
}) {
  // Apply rotation ONLY on md+ screens
  const tiltClass =
    rotate === "-6" ? "md:-rotate-6" : rotate === "6" ? "md:rotate-6" : "";

  return (
    <Card
      className={`overflow-hidden bg-white border-0 shadow-[0_14px_44px_rgba(0,0,0,0.16)] rounded-2xl transition-transform hover:scale-[1.02] ${tiltClass}`}
    >
      <div className="aspect-video relative">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
          title={v.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="p-4 md:p-5">
        <h3 className="font-semibold text-foreground line-clamp-2">
          {v.title}
        </h3>
        <div className="mt-1 text-sm text-muted-foreground">{v.meta}</div>
      </div>
    </Card>
  );
}
