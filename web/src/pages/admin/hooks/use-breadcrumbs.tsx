import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const useBreadcrumbs = () => {
  const router = useRouter();
  const route = router.getRoute(router.state.currentLocation.pathname as any);

  const [breadcrumbs, setBreadcrumbs] = useState<typeof route[]>([]);

  useEffect(() => {
    let currentRoute = route;
    const crumbs: typeof breadcrumbs = [];

    while (currentRoute.parentRoute) {
      crumbs.push(currentRoute);
      currentRoute = currentRoute.parentRoute;
    }

    setBreadcrumbs(crumbs.reverse());
  }, [route]);

  return breadcrumbs;
};
