import Card from 'react-bootstrap/Card'

export default function Album({ album, onAlbumClick }) {
  const { titles, userName, userId } = album
  return (
    <div className='col album-card'>
      <Card onClick={() => onAlbumClick(userId)} className='bg-info h-100'>
        <span className='text-right position-absolute top-0 end-0 album-title-count'>
          {titles && titles.filter((item) => !item.isRead).length}
        </span>
        <Card.Body>
          <Card.Img src='album.jpg' />
          <Card.Title className='mt-4 h6'>{`${userName} ${userId}`}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  )
}
