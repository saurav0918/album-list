import Navbar from 'react-bootstrap/Navbar'
import SearchBox from './SearchBox'

export default function Banner({ searchText, onSearch }) {
  return (
    <Navbar bg='info' variant='info'>
      <Navbar.Brand href='#' className='ms-4'>
        Logo
      </Navbar.Brand>
      <SearchBox searchText={searchText} onSearch={onSearch} />
    </Navbar>
  )
}
