import { useState } from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function IncidentReport() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    location: "",
    date: "",
    image: "",
    latitude: null,
    longitude: null,
  });
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [mapViewport, setMapViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });
  const navigate = useNavigate();

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

  const fetchCoordinates = async (location) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          location
        )}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].geometry.coordinates;
        return { latitude, longitude };
      } else {
        throw new Error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coordinates = await fetchCoordinates(formData.location);
    if (coordinates) {
      try {
        const res = await fetch("/api/incident/report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            ...coordinates,
            userId: currentUser._id,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          return;
        }
        navigate("/incidents");
      } catch (error) {
        console.log("Failed to report incident:", error.message);
      }
    } else {
      alert(
        "Failed to get location coordinates. Please check the location name."
      );
    }
  };

  return (
    <div className="p-2 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-4xl my-7 font-bold">
        Report an Incident
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Select
          required
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          value={formData.type}
          className="p-4 text-center placeholder-center m-5"
        >
          <option value="">Select Incident Type</option>
          <option value="Accident">Accident</option>
          <option value="Hazard">Hazard</option>
          <option value="Theft">Theft</option>
          <option value="Other">Other</option>
        </Select>
        <ReactQuill
          theme="snow"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          className="m-5 h-40"
          placeholder="Description of the incident"
        />
        <TextInput
          type="text"
          required
          placeholder="Location"
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="p-4 text-center placeholder-center m-5"
        />
        <TextInput
          type="date"
          required
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          value={formData.date}
          className="p-4 text-center placeholder-center m-5"
        />
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 m-5">
          <FileInput
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
        <Button
          gradientDuoTone="purpleToBlue"
          outline
          className="m-5"
          type="submit"
        >
          Submit Incident
        </Button>
      </form>
      {formData.latitude && formData.longitude && (
        <Map
          {...mapViewport}
          width="100%"
          height="400px"
          onViewportChange={(viewport) => setMapViewport(viewport)}
          mapboxApiAccessToken={mapboxToken}
        >
          <Marker latitude={formData.latitude} longitude={formData.longitude}>
            <div className="marker">
              <img src="/marker-icon.png" alt="Marker" />
            </div>
          </Marker>
        </Map>
      )}
    </div>
  );
}
