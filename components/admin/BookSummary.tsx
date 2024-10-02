import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

type Props = {
    value: string;
    setValue: () => void;
}
const BookSummary = ({ value, setValue }: Props) => {
    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill"), { ssr: false }),
        []
      );
  return (
    <ReactQuill theme="snow" value={value} onChange={setValue} style={{height: "100%"}} />
  )
}

export default BookSummary