import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const ListCrewUI = ({ data, fetchNextPage, isFetchingNextPage }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

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
      <div ref={ref}>{isFetchingNextPage ? "Loading more..." : null}</div>
    </section>
  );
};
