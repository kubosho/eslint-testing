import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();

    this.file = null;

    this.state = {
      errorMessage: '',
      fileDetails: [],
      fileSources: [],
    };

    this.getFileDetail = this.getFileDetail.bind(this);
    this.readFile = this.readFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getFileDetail() {
    return {
      name: this.file.name,
      type: this.file.type || 'N/A',
      size: `${this.file.size} bytes`,
      modified: this.file.lastModifiedDate.toLocaleDateString(),
    };
  }

  readFile() {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = resolve;
      reader.onabort = reject;
      reader.onerror = reject;

      reader.readAsDataURL(this.file);
    });
  }

  handleChange(event) {
    const files = Array.from(event.target.files);

    files.forEach(file => {
      this.file = file;

      this.readFile().then(event => {
        const source = event.target.result;

        this.setState({
          fileDetails: this.state.fileDetails.concat(this.getFileDetail()),
          fileSources: this.state.fileSources.concat(source),
        });
      });
    });
  }

  render() {
    const fileDetailComponent = this.state.fileDetails.map((file, index) => (
      <ul key={index}>
        <li>{file.name}</li>
        <li>{file.type}</li>
        <li>{file.size}</li>
        <li>{file.modified}</li>
      </ul>
    ));

    const thumbnailComponent = this.state.fileSources.map((source, index) => (
      <ul key={index}>
        <li><img src={source} alt="" /></li>
      </ul>
    ));

    return (
      <div className="App">
        <header>
          <h1>LGTM</h1>
        </header>
        <main>
          <p>Upload your image.</p>
          <input
            type="file"
            id="files"
            name="files"
            onChange={this.handleChange}
            multiple
          />
          <output>
            {fileDetailComponent}
            {thumbnailComponent}
          </output>
        </main>
        <footer>
          <p><a href="//github.com/kubosho" rel="noopener noreferrer" target="_blank">© 2017 kubosho</a>.</p>
        </footer>
      </div>
    );
  }
}

export default App;
