export const ListCrewUI = ({ crew }) => {
  const crewList = crew.map((member) => (
    <ul key={member.id}>
      <img src={member.image} width="250" />
      <li>Full Name: {member.name}</li>
      <li>Agency: {member.agency}</li>
      <li>Status: {member.status}</li>
      <a href={member.wikipedia} target="_blank">
        Learn more about {member.name}!
      </a>
    </ul>
  ));

  return <section>{crewList}</section>;
};
