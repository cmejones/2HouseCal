import React, { Component } from "react";
import { storage } from "../firebase/firebase";

const storageRef = storage.ref();
const imagesRef = storageRef.child('images');

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
        image: null,
        url: "",
        progress: 0
        };
    }

    handleImageChange = e => {
        if (e.target.files[0]) {
        const image = e.target.files[0];
        this.setState(() => ({ image }));
        }
    };

    handleUpload = () => {
        const { image } = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
        "state_changed",
        snapshot => {
            // progress function ...
            const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ progress });
        },
        error => {
            // Error function ...
            console.log(error);
        },
        () => {
            // complete function ...
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                this.setState({ url });
            });
        }
        );
    };
    render() {
        return (
        <div className="center">
            <div className="row">
            <progress value={this.state.progress} max="100" className="progress" />
            </div>

            <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file" onChange={this.handleImageChange} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button
            onClick={this.handleUpload}
            className="btn"
            >
            Upload
            </button>
            <br />
            <img
            src={this.state.url || "https://via.placeholder.com/400x300"}
            alt="Uploaded Images"
            height="300"
            width="400"
            />
        </div>
        );
    }
}

export default ImageUpload;