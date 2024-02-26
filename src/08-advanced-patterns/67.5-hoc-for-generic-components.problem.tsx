import { Router, useRouter } from "fake-external-lib";
import { FC } from "react";
import { Equal, Expect } from "../helpers/type-utils";

type C<P = {}> = {
  (props: P, context?: any): React.ReactNode;
};

/**
 * NOTE - This is not actually a real solution. As you return an FC as a C. And later you cannot
 * access the `displayName` property of the returned component. In this solution you cast a lot,
 * just to make TypeScript to not complain. The program will work, but it's not an ideal solution.
 */
export const withRouter = <P,>(Component: C<P>): C<Omit<P, "router">> => {
  const NewComponent: FC<Omit<P, "router">> = (props) => {
    const router = useRouter();
    return <Component {...(props as P)} router={router} />;
  };

  NewComponent.displayName = `withRouter(${(Component as FC<P>).displayName})`;

  return NewComponent;
};

type TableProps<T> = {
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  router: Router;
};

export const Table = <T,>(props: TableProps<T>) => {
  return <table />;
};

const WrappedTable = withRouter(Table);

<>
  {/* @ts-expect-error router is required! */}
  <Table
    data={[1, 2, 3]}
    renderRow={(row) => {
      type test = Expect<Equal<typeof row, number>>;
      return <tr />;
    }}
  />

  <WrappedTable
    data={[1, 2, 3]}
    renderRow={(row) => {
      type test = Expect<Equal<typeof row, number>>;
      return <tr />;
    }}
  />

  <WrappedTable
    data={[1, 2, 3]}
    renderRow={(row) => {
      type test = Expect<Equal<typeof row, number>>;
      return <tr />;
    }}
  />
</>;
