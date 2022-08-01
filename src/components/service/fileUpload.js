import axios from 'axios';
class FileUpload {
  constructor() {
    this.url = 'https://api.cloudinary.com/v1_1/dyw8drzjh/image/upload';
  }

  onUpload = async (files) => {
    const formData = new FormData();
    const filesArr = [];
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
      formData.append('api_key', '673969612791577');
      formData.append('upload_preset', 'sdlwmuh7');
      const result = await axios.post(this.url, formData);
      filesArr.push(result.data);
    }
    return filesArr;
  };
}

export default FileUpload;
