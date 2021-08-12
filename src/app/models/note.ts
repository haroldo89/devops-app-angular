export default class Note {
    key: string;
    title: string;
    content: string;
    published = false;
  
    constructor() {
      this.title = '';
      this.content = ''
    }
  
  }
  