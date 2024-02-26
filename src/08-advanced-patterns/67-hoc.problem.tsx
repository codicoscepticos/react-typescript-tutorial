import { Router, useRouter } from "fake-external-lib";
import { FC } from "react";

export const withRouter = <P,>(Component: FC<P>) => {
  const NewComponent: FC<Omit<P, "router">> = (props) => {
    const router = useRouter();
    return <Component {...(props as P)} router={router} />;
  };

  NewComponent.displayName = `withRouter(${Component.displayName})`;

  return NewComponent;
};

const UnwrappedComponent = (props: { router: Router; id: string }) => {
  return null;
};

const WrappedComponent = withRouter(UnwrappedComponent);

<>
  {/* @ts-expect-error needs a router! */}
  <UnwrappedComponent id="123" />

  {/* Doesn't need a router passed in! */}
  <WrappedComponent id="123" />

  <WrappedComponent
    // @ts-expect-error id must be the correct property
    id={123}
  />
</>;
