<h1 align="center">
    Bun Voyage
</h1>

Small front-end mini-project consuming the [SpaceX API](https://github.com/r-spacex/SpaceX-API).

## Technologies

- [React](https://react.dev/) with [Typescript](https://www.typescriptlang.org/)
- [Bun and Vite](https://bun.sh/guides/ecosystem/vite)
- [TanStack Query](https://tanstack.com/query/latest)
- [Styled Components](https://styled-components.com/)

## Process

I'll walk through the steps I took in building this.

### TanStack Query and SpaceX API

My first order of business was leveraging TanStack Query's powerful capabilities to
hit a SpaceX endpoint and organize the retrieved data, displaying it nicely on the page.
I chose the `https://api.spacexdata.com/v4/dragons` endpoint to fetch data of the SpaceX Dragon spacecrafts
With the `useQuery` hook I was easily able to fetch the data:

```
const { isPending, isError, data, error } = useQuery({
    queryKey: ["dragons"],
    queryFn: fetchDragons
});
```

In order to avoid writing query functions that were basically the same every time,
I wrote a simple default query function:

```
const defaultQueryFn = async ({ queryKey }) => {
  const data = await fetch(`https://api.spacexdata.com/v4${queryKey[0]}`);
  return data.json();
};
```
