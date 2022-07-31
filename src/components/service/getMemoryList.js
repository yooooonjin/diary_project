import axios from 'axios';

class GetMemoryList {
  constructor() {
    axios.get('/memory/memories.json').then((result) => {
      this.memories = result.data;
    });
    axios.get('/memory/emptyMemory.json').then((result) => {
      this.emptyMemories = result.data;
    });
  }
  getMemories = async () => {
    return this.memories;
  };
  getEmptyMemory = async () => {
    return this.emptyMemories;
  };
}
export default GetMemoryList;
