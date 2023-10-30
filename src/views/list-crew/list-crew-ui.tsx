import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

const Card = styled.div`
  background-color: #001d3d;
  border-radius: 3px;
  padding: 1em;
`;

const GridContainer = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(3, 1fr);
`;

export const ListCrewUI = ({
  data,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <section>
      <GridContainer>
        {data.pages.map((crew, i) => {
          return (
            <Fragment key={i}>
              {crew.docs.map((member) => {
                return (
                  <Card key={member.id}>
                    <ul>
                      <img src={member.image} width="250" />
                      <li>Full Name: {member.name}</li>
                      <li>Agency: {member.agency}</li>
                      <li>Status: {member.status}</li>
                      <a href={member.wikipedia} target="_blank">
                        Learn more about {member.name}!
                      </a>
                    </ul>
                  </Card>
                );
              })}
            </Fragment>
          );
        })}
      </GridContainer>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        ref={ref}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </section>
  );
};
