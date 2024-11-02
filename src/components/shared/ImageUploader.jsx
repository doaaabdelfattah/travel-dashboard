import { useState } from "react";
import { FaCloudUploadAlt, FaImages } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const ImageUploader = ({ setSelectedFile, setSelectedFiles }) => {
  const [imgPreview, setImgPreview] = useState(null);
  const [imgsPreview, setImgsPreview] = useState([]);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };
  const onImagesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length > 0) {
      setSelectedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles];
        const previews = updatedFiles.map((file) => URL.createObjectURL(file));
        setImgsPreview(previews);
        return updatedFiles;
      });
    }
  };

  const handleRemoveImg = () => {
    setImgPreview(null);
    setSelectedFile(null);
  };

  const handleRemoveImgs = (index) => {
    const updatedPreview = imgsPreview.filter((_, i) => i !== index);
    setImgsPreview(updatedPreview);
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    // const updatedFiles = Array.from(setSelectedFiles).filter(
    //   (_, i) => i !== index
    // );
    // setSelectedFiles(updatedFiles);
  };
  return (
    <>
      <div className="w-full gap-6 flex flex-wrap md:flex-nowrap ">
        <div className="md:w-6/12 w-full">
          <p className="pb-3 font-semibold text-lg">Main image</p>
          <div className="h-[300px] flex md:flex-col justify-center items-center md:gap-2 gap-5 border-dashed border-[1.5px] bg-white border-slate-200 ">
            <div className="p-5 rounded-3xl flex justify-center items-center h-full">
              <div>
                <div className="text-slate-400  text-center flex justify-center">
                  <label htmlFor="imageUrl" className="cursor-pointer">
                    {imgPreview ? (
                      <div className="relative">
                        <img
                          src={imgPreview}
                          className="w-[200px] h-[200px] object-cover rounded-md shadow-md"
                          alt="Preview"
                        />
                        <div
                          className="absolute -top-4 -right-[40px] cursor-pointer"
                          onClick={handleRemoveImg}
                        >
                          <IoIosCloseCircle size="30px" />
                        </div>
                      </div>
                    ) : (
                      <FaImages size="100px" />
                    )}
                  </label>
                  <input
                    type="file"
                    name="imageUrl"
                    onChange={onImageChange}
                    id="imageUrl"
                    className="hidden"
                  />
                </div>
                <div>
                  {!imgPreview && <p className="text-center py-2">Add Image</p>}
                  <p className="text-center py-3">
                    1600 x 1200 (4:3) recommended
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-6/12 w-full">
          <p className="pb-3 font-semibold text-lg">Other Images</p>
          <div className="h-[100px] w-[100px] flex md:flex-col justify-center items-center md:gap-2 gap-5 rounded-sm border-dashed border-[1.5px] bg-white border-slate-200">
            <div className="text-center justify-center items-center">
              <div className="text-slate-400">
                <label htmlFor="imageUrls" className="cursor-pointer">
                  <FaCloudUploadAlt size="40px" color="#94a3b8" />
                </label>
                <input
                  type="file"
                  onChange={onImagesChange}
                  name="imageUrls"
                  id="imageUrls"
                  multiple
                  className="hidden"
                />
              </div>
              {/* <div className=" flex justify-center items-center pt-4">
                 <p className="text-center py-2">Add Image</p> 
                
              </div> */}
            </div>
          </div>
          {imgsPreview.length > 0 && (
            <div className="flex justify-start flex-wrap mt-5 rounded-md  bg-main-grey items-center gap-5 p-4">
              {imgsPreview.map((preview, index) => (
                <div
                  key={index}
                  className="relative rounded-md p-2 flex justify-center"
                >
                  <img
                    src={preview}
                    className="w-[100px] h-[100px] shadow-md object-cover hover:scale-110 duration-500 transition-all "
                    alt={`Preview ${index}`}
                  />
                  <span
                    className="absolute -top-1 -right-[5px] cursor-pointer text-slate-400"
                    onClick={() => handleRemoveImgs(index)}
                  >
                    <IoIosCloseCircle size="25px" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
