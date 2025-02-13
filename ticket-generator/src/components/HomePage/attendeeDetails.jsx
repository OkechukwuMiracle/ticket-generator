import Header from "../Navbar/header";
import { useState, useEffect } from "react";
import DownloadIcon from "../../assets/cloud-download.png";
import Envelop from "../../assets/envelope.png";
import { useNavigate } from "react-router-dom";

const attendeeDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: "",
    textArea: "",
  });

  // Handles file drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  // Handles file selection via click
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("attendeeDetails"));
    if (savedData) setFormData(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("attendeeDetails", JSON.stringify(formData));
  }, [formData]);

  // Handle validations
  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "Full Name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      tempErrors.email = "Invalid Email format";
    if (!formData.avatar.match(/https?:\/\/.*\.(?:png|jpg|jpeg|gif|avif|webp)/))
      tempErrors.avatar = "Invalid Image URL or upload missing";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("attendeeDetails")) || {
      fullName: "",
      email: "",
      avatar: "",
      // textArea: "",
    };
    setFormData(savedData);
  }, []);

  // handles form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/ready");
    }
  };

  // Upload Image to Cloudinary
const uploadImage = async (file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

  try {
      const response = await fetch(import.meta.env.VITE_CLOUDINARY_API, {
          method: "POST",
          body: formData,
      });
      const data = await response.json();
      setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
  } catch (error) {
      console.error("File upload error:", error);
      alert("Failed to upload image. Try again.");
  }
};



  return (
    <div>
      <Header />

      <div className="selection_container max-w-screen-sm  mt-7 p-7 m-auto border-2 rounded-3xl">
        <div className="step_container md:flex justify-between items-center w-full pb-3 relative">
          <h1 className="h1_line text-white text-2xl">Attendee Details</h1>
          <p className="p_line text-gray-300 text-lg">step 2 / 3</p>
          <span className="absolute w-10/12 md:w-1/3"></span>
        </div>

        {/* Handles the image uploading */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border mt-7 px-4 pb-4 rounded-xl"
        >
          {/* Avatar image */}
          <div>
            <div className="profile_container mt-7 mb-10 border p-3 pb-10 rounded-xl relative">
              <label className="block font-medium text-gray-300 mb-9 ">
                Upload Profile Picture
              </label>
              <div className="avatar_container mt-4 py-16">
                {/* Drag & Drop File Upload */}
                <div
                  className="avatar_input border-2 p-2 pt-8 w-3/4 md:w-1/3 h-3/4 rounded-2xl absolute top-12 right-9  md:left-1/3 outline-none text-white"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("fileUpload").click()}
                >
                   {formData.avatar ? (
                    <p className="text-center break-words px-2">{formData.avatar}</p>
        ) : (
          // Show upload instructions
          <div className="text-center">
            <img className="avatar_img mx-auto" src={DownloadIcon} alt="" />
            <p className="pt-3">Drag & Drop to Upload</p>
          </div>
        )}
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            {errors.avatar && (
              <p className="text-red-500 text-sm">{errors.avatar}</p>
            )}
          </div>

          {/* Underline */}
          <div className="span_2 w-full"></div>

          {/* Full name */}
          <div>
            <label className="block font-medium text-gray-300 mb-3">
              Enter your name
            </label>
            <input
              type="text"
              className="inputs border p-2 w-full rounded-md outline-none bg-inherit text-white"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Email address */}
          <div className="relative">
            <label className="block font-medium text-gray-300 mb-3">
              Enter your email address*
            </label>
            <input
              type="email"
              className="inputs border p-2 pl-10 w-full rounded-md outline-none bg-inherit text-white "
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="hello@gmail.com"
            />
            <img src={Envelop} alt="" className="absolute top-11 left-3 " />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Text area */}
          <div>
            <p className="block font-medium text-gray-300 mb-3">
              Send request?
            </p>
            <textarea
              placeholder="Textarea"
              className="bg-inherit border w-full h-40 outline-none p-3 text-white font-semibold rounded-md"
              value={formData.textArea}
        onChange={(e) => setFormData({ ...formData, textArea: e.target.value })}
              required
            ></textarea>
          </div>

            {/* handles buttons */}
          <div className="btn_2 justify-between gap-5 mt-5">
            <button
              onClick={() => navigate("/")}
              className="btn_1 md:w-1/2 border-2 p-3 text-xl rounded-xl"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn_1 md:w-1/2 border-2 p-3 text-xl rounded-xl"
            >
              Get My Free Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default attendeeDetails;
