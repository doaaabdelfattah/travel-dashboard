import { useState } from "react";
import { useDispatch } from "react-redux";
import { addServiceWithImage } from "../../redux/reducers/servicesSlice";
import ImageUploader from "../shared/ImageUploader";
import MainBtn from "../shared/MainBtn";

const AddNewService = () => {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    available: true,
    imageUrl: "",
    imageUrls: [],
  });

  const createFormData = (dataObject) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(dataObject)) {
      formData.append(key, value);
    }
    return formData;
  };

  const handleInput = (e) => {
    setNewService({
      ...newService,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddService = (e) => {
    e.preventDefault();
    const formData = createFormData(newService);
    if (selectedFile) {
      formData.append("imageUrl", selectedFile); // Append the file
    }
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => formData.append("imageUrls", file));
    }
    dispatch(addServiceWithImage(formData));
  };

  return (
    <div className="mb-10">
      <form className="flex flex-wrap flex-col w-full lg:flex-nowrap gap-16">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="font-semibold text-lg">
              Service Name
            </label>
            <input
              onChange={handleInput}
              value={newService.name}
              type="text"
              className="w-full px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color rounded-sm"
              name="name"
              id="name"
              placeholder="Service Name"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="description" className="font-semibold text-lg">
              Description
            </label>
            <input
              onChange={handleInput}
              value={newService.description}
              type="text"
              className="w-full px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color rounded-sm"
              name="description"
              id="description"
              placeholder="Description"
            />
          </div>
          <div className=" w-full">
            <ImageUploader
              setSelectedFile={setSelectedFile}
              setSelectedFiles={setSelectedFiles}
            />
          </div>
        </div>
      </form>
      <MainBtn marginTop={"mt-5"} handleOnClick={handleAddService}>
        Add new Service
      </MainBtn>
    </div>
  );
};

export default AddNewService;
