import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addServiceWithImage } from "../../redux/reducers/servicesSlice";
import ImageUploader from "../shared/ImageUploader";
import MainBtn from "../shared/MainBtn";
import { fetchCompany } from "../../redux/reducers/companySlice";

const AddNewService = () => {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { company } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    company: "",
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
    // Log each item in the FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
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
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="company" className="font-semibold text-lg">
              Company
            </label>
            <select
              className=" px-3 py-2 border-[1.5px] border-slate-200 outline-none focus:border-main-color  rounded-sm"
              name="company"
              value={newService.company}
              onChange={handleInput}
            >
              <option value="">Select Company</option>
              {company.map((item) => (
                <option value={item._id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
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
