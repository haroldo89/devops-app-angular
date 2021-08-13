export default class Note {
    _id: string;
    title: string;
    content: string;
    published: boolean;
  
    constructor() {
      this.title = '';
      this.content = '';
      this.published = false;
    }
  
  }
  