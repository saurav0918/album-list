import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

export default function Title({ onSearch, searchText }) {
  return (
    <Form inline className='ms-auto me-4'>
      <FormControl
        type='text'
        placeholder='Search'
        value={searchText}
        onChange={(e) => onSearch(e.target.value)}
      />
    </Form>
  )
}
