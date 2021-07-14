import './Upload.css';
import axios from 'axios';

type A = string[];

type Props = {
  setData: (value: Array<A>) => void;
  userId: string;
};

const Upload = ({ setData, userId }: Props) => {
  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    const text = await file?.text();

    const uploadData = {
      userId,
      data: text
    };
    axios
      .post('/api/csv-data', uploadData)
      .then(function (response) {
        console.log('response: ', response);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="Upload">
      <div className="Upload__title">Upload a CSV file</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        fill="currentColor"
        className="bi bi-file-earmark-arrow-up Upload__icon"
        viewBox="0 0 16 16"
      >
        <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
      </svg>
      <div className="Upload__file">
        <input onChange={handleFileSelected} type="file" />
      </div>
    </div>
  );
};

export default Upload;
