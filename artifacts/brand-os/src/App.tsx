import { lazy, Suspense, useEffect, useRef } from "react";
import { Switch, Route, useLocation, Redirect, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from "@clerk/react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import Layout from "@/components/Layout";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const BrandWizard = lazy(() => import("@/pages/BrandWizard"));
const BrandKit = lazy(() => import("@/pages/BrandKit"));
const BrandEdit = lazy(() => import("@/pages/BrandEdit"));
const CampaignList = lazy(() => import("@/pages/CampaignList"));
const CampaignWorkspace = lazy(() => import("@/pages/CampaignWorkspace"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const ContentCalendar = lazy(() => import("@/pages/ContentCalendar"));
const Assets = lazy(() => import("@/pages/Assets"));
const Templates = lazy(() => import("@/pages/Templates"));
const Admin = lazy(() => import("@/pages/Admin"));
const SocialAccounts = lazy(() => import("@/pages/SocialAccounts"));
const NotFound = lazy(() => import("@/pages/not-found"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 15,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

const clerkAppearance = {
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "#6366f1",
    colorBackground: "#0f0f17",
    colorInputBackground: "#1a1a2e",
    colorText: "hsl(210, 40%, 98%)",
    colorTextSecondary: "hsl(215, 20%, 65%)",
    colorInputText: "hsl(210, 40%, 98%)",
    colorNeutral: "#6b7280",
    borderRadius: "0.75rem",
    fontFamily: "Inter, system-ui, sans-serif",
    fontFamilyButtons: "Inter, system-ui, sans-serif",
    fontSize: "0.875rem",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "border border-white/10 rounded-2xl w-full overflow-hidden shadow-2xl shadow-black/40",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: { color: "hsl(210, 40%, 98%)", fontWeight: "700" },
    headerSubtitle: { color: "hsl(215, 20%, 65%)" },
    socialButtonsBlockButtonText: { color: "hsl(210, 40%, 98%)" },
    formFieldLabel: { color: "hsl(215, 20%, 65%)" },
    footerActionLink: { color: "#818cf8" },
    footerActionText: { color: "hsl(215, 20%, 65%)" },
    dividerText: { color: "hsl(215, 20%, 65%)" },
    identityPreviewEditButton: { color: "#818cf8" },
    formFieldSuccessText: { color: "#34d399" },
    alertText: { color: "#f87171" },
    logoBox: "flex justify-center mb-2",
    logoImage: "w-12 h-12 rounded-xl",
    socialButtonsBlockButton: "border border-white/10 hover:bg-white/5 transition-colors rounded-xl",
    formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-colors",
    formFieldInput: "bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
    footerAction: "border-t border-white/10",
    dividerLine: "bg-white/10",
    otpCodeFieldInput: "bg-white/5 border border-white/10 rounded-lg text-white",
    formFieldRow: "gap-3",
    main: "gap-4",
  },
};

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
    </div>
  );
}

function SignInPage() {
  // To update login providers, app branding, or OAuth settings use the Auth
  // pane in the workspace toolbar. More information can be found in the Replit docs.
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#0a0a14] px-4 py-12">
      <div className="w-full max-w-[400px]">
        <SignIn
          routing="path"
          path={`${basePath}/sign-in`}
          signUpUrl={`${basePath}/sign-up`}
        />
      </div>
    </div>
  );
}

function SignUpPage() {
  // To update login providers, app branding, or OAuth settings use the Auth
  // pane in the workspace toolbar. More information can be found in the Replit docs.
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#0a0a14] px-4 py-12">
      <div className="w-full max-w-[400px]">
        <SignUp
          routing="path"
          path={`${basePath}/sign-up`}
          signInUrl={`${basePath}/sign-in`}
        />
      </div>
    </div>
  );
}

function HomeRedirect() {
  return (
    <>
      <Show when="signed-in">
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        </Layout>
      </Show>
      <Show when="signed-out">
        <Suspense fallback={<PageLoader />}>
          <LandingPage />
        </Suspense>
      </Show>
    </>
  );
}

function ProtectedRoutes() {
  return (
    <>
      <Show when="signed-in">
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Switch>
              <Route path="/brands/new" component={BrandWizard} />
              <Route path="/brands/:id/edit" component={BrandEdit} />
              <Route path="/brands/:brandId/social-accounts" component={SocialAccounts} />
              <Route path="/brands/:id/campaigns" component={CampaignList} />
              <Route path="/brands/:id" component={BrandKit} />
              <Route path="/campaigns/:id" component={CampaignWorkspace} />
              <Route path="/analytics" component={Analytics} />
              <Route path="/calendar" component={ContentCalendar} />
              <Route path="/assets" component={Assets} />
              <Route path="/templates" component={Templates} />
              <Route path="/admin" component={Admin} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Layout>
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qClient = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qClient.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qClient]);

  return null;
}

function AppRouter() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl || undefined}
      appearance={clerkAppearance}
      localization={{
        signIn: {
          start: {
            title: "Welcome back",
            subtitle: "Sign in to your workspace",
          },
        },
        signUp: {
          start: {
            title: "Create your workspace",
            subtitle: "Get started with Brand Architect AI Pro",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ClerkQueryClientCacheInvalidator />
          <Switch>
            <Route path="/" component={HomeRedirect} />
            <Route path="/sign-in/*?" component={SignInPage} />
            <Route path="/sign-up/*?" component={SignUpPage} />
            <Route component={ProtectedRoutes} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <AppRouter />
    </WouterRouter>
  );
}

export default App;
