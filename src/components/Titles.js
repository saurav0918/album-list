import Title from './Title'

import ListGroup from 'react-bootstrap/ListGroup'

export default function Titles({ titles, readItem }) {
  return (
    <ListGroup>
      {titles.map((item) => (
        <Title key={item.id} item={item} readItem={readItem} />
      ))}
    </ListGroup>
  )
}
