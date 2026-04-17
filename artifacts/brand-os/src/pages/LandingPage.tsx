import { Link } from "wouter";
import { Sparkles, Zap, LayoutTemplate, Image, BarChart3, CalendarDays, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Sparkles,
    title: "AI Brand Identity",
    description: "Generate a complete brand kit — colors, typography, voice, and personality — in seconds.",
    color: "from-violet-500/20 to-indigo-500/20 border-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: CalendarDays,
    title: "Campaign Generator",
    description: "Create full multi-day social media campaigns with posts tailored per platform.",
    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Image,
    title: "AI Image Generation",
    description: "Generate stunning campaign visuals with your brand logo and style applied automatically.",
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: LayoutTemplate,
    title: "Content Calendar",
    description: "Visualize all your scheduled posts in a monthly calendar view by platform.",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Zap,
    title: "Instant Copy",
    description: "AI-powered hooks, captions, CTAs, and hashtags optimized for engagement.",
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: BarChart3,
    title: "Brand Analytics",
    description: "Track brand performance and campaign output across all your projects.",
    color: "from-rose-500/20 to-red-500/20 border-rose-500/20",
    iconColor: "text-rose-400",
  },
];

const highlights = [
  "Complete brand kit in minutes",
  "Multi-platform campaign generation",
  "AI-powered image creation",
  "Isolated workspace per account",
  "Export CSV & brand assets",
  "Dark mode support",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="border-b border-border/50 backdrop-blur bg-background/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-foreground tracking-tight">Brand Architect</span>
              <span className="text-[10px] text-muted-foreground font-medium ml-1 uppercase tracking-wider">AI Pro</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent">
                Sign In
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="text-sm font-medium bg-primary text-primary-foreground px-4 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <Zap className="w-3 h-3" />
          Powered by GPT-5 & gpt-image-1
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
          Build Brands &amp;{" "}
          <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
            Campaigns
          </span>
          <br />
          with AI
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Brand Architect AI Pro generates complete brand identities, multi-day social media campaigns,
          and stunning visuals — all in one workspace, isolated per account.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/sign-up">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40">
              Start Building for Free
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/sign-in">
            <button className="flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-xl text-sm font-medium hover:bg-accent transition-colors">
              Sign In to Your Workspace
            </button>
          </Link>
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {highlights.map((h) => (
            <div key={h} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {h}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Everything You Need to Build a Brand
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From identity to content to visuals — AI handles the heavy lifting so you can focus on growth.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={cn(
                  "p-5 rounded-2xl border bg-gradient-to-br",
                  f.color
                )}
              >
                <div className={cn("w-9 h-9 rounded-xl bg-background/60 flex items-center justify-center mb-4", f.iconColor)}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 text-sm">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to Build Your Brand?
          </h2>
          <p className="text-muted-foreground mb-8">
            Create your account and start generating your brand identity in minutes.
          </p>
          <Link href="/sign-up">
            <button className="flex items-center gap-2 mx-auto bg-primary text-primary-foreground px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Brand Architect AI Pro</span>
          </div>
          <p className="text-xs text-muted-foreground">Built with AI · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
