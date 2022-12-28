export const config = {
  matcher: "/admin/:path*",
};

export default function middleware(request: Request) {
  const url = new URL(request.url);

  if (
    url.pathname !== "/admin" &&
    url.pathname.startsWith("/admin") &&
    !url.search.includes("redirect")
  ) {
    const targetAdminPage = url.pathname.replace("/admin", "");
    return Response.redirect(
      new URL("/admin?redirect=" + targetAdminPage, request.url).toString(),
    );
  }
}
