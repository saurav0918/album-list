import { useEffect, useState } from 'react'
import Album from './components/Album'
import Banner from './components/Banner'
import Titles from './components/Titles'

import Container from 'react-bootstrap/Container'

export default function App() {
  const [albums, setAlbums] = useState([])
  const [titles, setTitles] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchedTitles, setSearchedTitles] = useState([])

  const fetchRandomNames = (count) => {
    return fetch(`https://randomuser.me/api/?results=${count}`)
  }

  const formatData = (data) => {
    const res = []
    data.forEach(({ userId, id, title }) => {
      let obj = res.find((item) => item.userId === userId)
      if (obj) {
        obj.titles.push({ title, isRead: false, id, userId })
      } else {
        res.push({ titles: [{ title, isRead: false, id, userId }], userId })
      }
    })
    return res
  }

  const fetchAlbumData = () => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const formattedAlbum = formatData(data)
        fetchRandomNames(formattedAlbum.length)
          .then((res) => {
            return res.json()
          })
          .then(({ results }) => {
            results.forEach((res, idx) => {
              formattedAlbum[idx][
                'userName'
              ] = `${res.name.first} ${res.name.last}`
            })
            setAlbums(formattedAlbum)
          })
      })
  }

  useEffect(() => {
    fetchAlbumData()
  }, [])

  const onSearch = (text) => {
    setSearchText(text)
    let searchedTitles = []
    albums.forEach((album) => {
      let titlesFound = album.titles.find((item) => item.title.includes(text))
      if (titlesFound) searchedTitles.push(titlesFound)
    })
    setSearchedTitles(searchedTitles)
  }

  const onAlbumClick = (userId) => {
    setTitles(
      albums
        .filter((item) => item.userId === userId)
        .map((album) => album.titles)[0]
    )
  }

  const readItem = (userId, itemId) => {
    let updatedAlbumTitles = albums
      .find((album) => album.userId === userId)
      .titles.map((item) =>
        item.id === itemId ? { ...item, isRead: true } : item
      )
    setAlbums(
      albums.map((album) =>
        album.userId === userId
          ? { userId, userName: album.userName, titles: updatedAlbumTitles }
          : album
      )
    )
    setTitles(updatedAlbumTitles)
    if (searchText)
      setSearchedTitles(
        searchedTitles.map((item) =>
          item.id === itemId ? { ...item, isRead: true } : item
        )
      )
  }

  return (
    <>
      <Banner searchText={searchText} onSearch={onSearch} />
      {searchText ? (
        <Container className='mt-3'>
          {searchedTitles && searchedTitles.length > 0 ? (
            <Titles titles={searchedTitles} readItem={readItem} />
          ) : (
            <h6>No titles found</h6>
          )}
        </Container>
      ) : (
        <Container>
          <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mt-3 album-cards'>
            {albums &&
              albums.length > 0 &&
              albums.map((album) => (
                <Album
                  key={album.userId}
                  album={album}
                  onAlbumClick={onAlbumClick}
                />
              ))}
          </div>
          <hr />
          {titles && titles.length > 0 && (
            <Titles titles={titles} readItem={readItem} />
          )}
        </Container>
      )}
    </>
  )
}
