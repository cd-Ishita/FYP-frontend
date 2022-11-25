import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

const endpoint = 'http://localhost:3000/uploadFile'

class App extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      loaded: 0,
    }
  }
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  handleUploadBMC = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    try {
        let result = axios
        .post(endpoint+"BMC", data, {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            })
          },
        })
        .then(res => {
          console.log("Output: ", res.statusText)
        })

    } catch (error) {
        console.error(error.response.data)
    }

      
  }

  handleUploadCHC = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    try {
        let result = axios
        .post(endpoint+"CHC", data, {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            })
          },
        })
        .then(res => {
          console.log("Output: ", res.statusText)
        })

    } catch (error) {
        console.error(error.response.data)
    }

      
  }
  render() {
    return (
      <div className="App">
        <input type="file" name="recFile" id="" onChange={this.handleselectedFile} />
        <button onClick={this.handleUploadBMC}>BMC Engine</button>
        <button onClick={this.handleUploadCHC}>CHC Engine</button>
        <div> {Math.round(this.state.loaded, 2)} %</div>
        
      </div>
    )
  }
}

export default App