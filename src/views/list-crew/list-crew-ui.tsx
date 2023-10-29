import { Fragment } from "react";

export const ListCrewUI = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
}) => {
  return (
    <section>
      {data.pages.map((crew, i) => {
        return (
          <Fragment key={i}>
            {crew.docs.map((member) => {
              return (
                <ul key={member.id}>
                  <img src={member.image} width="250" />
                  <li>Full Name: {member.name}</li>
                  <li>Agency: {member.agency}</li>
                  <li>Status: {member.status}</li>
                  <a href={member.wikipedia} target="_blank">
                    Learn more about {member.name}!
                  </a>
                </ul>
              );
            })}
          </Fragment>
        );
      })}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </div>
    </section>
  );
};
