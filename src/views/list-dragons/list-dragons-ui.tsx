export const ListDragonsUI = ({ dragons }) => {
  const dragonsList = dragons.map((dragon) => (
    <ul key={dragon.id}>
      <img src={dragon.flickr_images[0]} width="250" />
      <li>{dragon.name}</li>
      <li>{dragon.type}</li>
      <li>{dragon.description}</li>
    </ul>
  ));

  return <section>{dragonsList}</section>;
};
