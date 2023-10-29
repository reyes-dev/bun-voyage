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

I was able to add [infinite queries](https://tanstack.com/query/latest/docs/react/guides/infinite-queries)
pretty easily by upgrading my query function and hitting the `https://api.spacexdata.com/v4/crew/query` endpoint,
which allows for sending a body of options in a `POST` request to limit the amount of data send back.
Then I replaced my `useQuery` hook with an `useInfiniteQuery` hook, which will request the specified amount of
data upon initial page load, and uses the value returned by `getNextPageParam` in its next request.
This next request is triggered by calling `fetchNextPage` function, which was initially done
upon clicking a button:

```
<button
    onClick={() => fetchNextPage()}
    disabled={!hasNextPage || isFetchingNextPage}
>
    {isFetchingNextPage ? 'Loading more...' :  'Load More'}
</button>
```

After this I upgraded to infinite scrolling with the [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)
library. By passing `ref` as an attribute to any element (I chose a simple div)
it allows you to monitor the state of the viewport, and if the element is in view,
you can trigger a function with a useEffect hook, in my case `fetchNextPage()`:

```
const { ref, inView } = useInView();
...
useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);
...
<div ref={ref}>{isFetchingNextPage ? "Loading more..." : null}</div>
```