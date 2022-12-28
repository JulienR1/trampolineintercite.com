import { adminRoute } from "../__root";

export const Partners = () => {
  return <>partners</>;
};

export const partnersRoute = adminRoute.createRoute({
  path: "partners",
  component: Partners,
});
