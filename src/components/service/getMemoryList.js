import axios from 'axios';

class GetMemoryList {
  constructor() {
    axios.get('/memory/memories.json').then((data) => {
      this.memories = data;
    });
  }
  getMemories = async () => {
    return this.memories.data;
  };
}
export default GetMemoryList;
