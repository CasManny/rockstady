import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

type Props = {
    value: string;
    setValue: () => void;
}
const BookSummary = ({value, setValue}: Props) => {
  return (
    <ReactQuill theme="snow" value={value} onChange={setValue} />
  )
}

export default BookSummary