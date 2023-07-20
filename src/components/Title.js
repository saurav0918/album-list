import ListGroup from 'react-bootstrap/ListGroup'

export default function Title({ item, readItem }) {
  const { isRead, id, userId, title } = item
  return (
    <ListGroup.Item
      className='m-1'
      onClick={() => readItem(userId, id)}
      action
      variant={isRead ? 'light' : 'info'}
    >
      {title}
    </ListGroup.Item>
  )
}
