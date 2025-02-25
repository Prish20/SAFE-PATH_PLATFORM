import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useNavigate} from "react-router-dom";
import useWindowSize from "../Hooks/useWindowSize";
import ResponsiveNav from "../components/ResponsiveNav";

export default function EducationContent() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [publishError, setPublishError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});


  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image to upload");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        () => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      } 
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Failed to create post");
    }
  };
  const size = useWindowSize();
  return (
    <>
    {size.width < 768 && <ResponsiveNav />}
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-4xl my-7 font-bold">Create a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div className="relative flex-1">
            <TextInput
              type="text"
              id="title"
              required
              placeholder="Title"
              sizing="sm"
              shadow
              className="p-4 text-center placeholder-center m-5"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Select
              sizing="sm"
              className="p-4 text-center placeholder-center m-5"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Road Safety">Road Safety</option>
              <option value="Driving Tips">Driving Tips</option>
              <option value="Emergency Procedures">Emergency Procedures</option>
            </Select>
          </div>
        </div>
        <div
          className="flex gap-4 items-center justify-between border-4
          border-teal-500 border-dotted p-3 m-5"
        >
          <FileInput
            sizing="sm"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            gradientDuoTone="purpleToPink"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                  strokeWidth={5}
                  styles={{ root: { width: "100%", height: "100%" } }}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center m-5"
            role="alert"
          >
            {imageUploadError}
          </div>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="uploaded"
            className="w-40 h-40 object-cover m-5"
          />
        )}
        <ReactQuill
          theme="snow"
          required
          placeholder="Write something..."
          className="h-72 mb-12 m-5"
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button gradientDuoTone="purpleToBlue" outline className="m-5" type="submit">
          Publish
        </Button>
      </form>
        {publishError && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center m-5"
            role="alert"
          >
            {publishError}
          </div>
        )}
    </div>
    </>
  );
}
