import { NextURL } from "next/dist/server/web/next-url";
import { protectedRoutes, RouteMatch } from "@/config/routeProtectionConfig";

interface HandleAuthorizationParams {
  isSignedIn: boolean;
  nextUrl: NextURL;
}

export default function handleRouteProtection({
  isSignedIn,
  nextUrl,
}: HandleAuthorizationParams): { redirectUrl: NextURL | null } {
  const pathname = nextUrl.pathname;

  const matchesRoute = (route: RouteMatch) =>
    route.type === "exact"
      ? route.path === pathname
      : pathname.startsWith(route.path);

  if (isSignedIn && protectedRoutes.authenticatedRedirects.some(matchesRoute)) {
    const newUrl = new NextURL("/app/play", nextUrl);
    return { redirectUrl: newUrl };
  } else if (
    !isSignedIn &&
    protectedRoutes.nonAuthenticatedRedirects.some(matchesRoute)
  ) {
    const newUrl = new NextURL("/sign-in", nextUrl);
    return { redirectUrl: newUrl };
  }

  return { redirectUrl: null };
}
