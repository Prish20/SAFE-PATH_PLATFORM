import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EducationContent() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div className="relative flex-1">
            <TextInput
              type="text"
              id="Title"
              required
              placeholder="title"
              sizing="sm"
              shadow
              className="p-4 text-center placeholder-center m-5"
            />
            <Select
              sizing="sm"
              className="p-4 text-center placeholder-center m-5"
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
          <FileInput sizing="sm" type="file" accept="image/*" />
          <Button gradientDuoTone="purpleToPink" outline>
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          required
          placeholder="Write something..."
          className="h-72 mb-12 m-5"
        />
        <Button gradientDuoTone="purpleToBlue" outline className="m-5">
          Publish
        </Button>
      </form>
    </div>
  );
}
