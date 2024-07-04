import { useState } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { FaGithub, FaLink } from "react-icons/fa6";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { MdTitle } from "react-icons/md";
import { PiChatCenteredText } from "react-icons/pi";
import GetAllProject from "./GetAllProject";
import { useForm } from "react-hook-form";
import { uploadToImgBB } from "../../Services/Cloud/ImbBB";
import { useCreateProjectMutation } from "../../Redux/features/project/projectApi";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AddProject = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const [loading, serLoading] = useState(false);
  const [technology, setTechnology] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [createProject] = useCreateProjectMutation();

  const [techInput, setTechInput] = useState("");

  const addTechnology = () => {
    if (techInput.trim() !== "") {
      setTechnology([...technology, techInput.trim()]);
      setTechInput("");
    }
  };

  const deleteTechnology = (text) => {
    const deleteTechnology = technology.filter((a) => text !== a);
    setTechnology([...deleteTechnology]);
  };

  const onSubmit = async (data) => {
    serLoading(true);
    const image = await uploadToImgBB(photos[0]);

    const projectData = {
      name: data?.projectName,
      title: data?.projectTitle,
      description: data?.projectDetails,
      tech: technology,
      githubClient: data?.githubClient,
      githubServer: data?.githubServer,
      liveLink: data?.liveLink,
      image,
    };
    const res = await createProject(projectData);
    if (res?.data?.success === true) {
      toast.success(res.data.message);
      serLoading(false);
    }
    reset();
    setTechnology([]);
  };

  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center pb-8">
        <div className="flex items-center gap-3">
          <h1
            onClick={() => setIsVisible(true)}
            className={`${
              isVisible ? "underline text-white" : ""
            } text-xl transition-all cursor-pointer`}
          >
            Create Project
          </h1>
          <h1
            onClick={() => setIsVisible(false)}
            className={`${
              isVisible ? "" : "underline text-white"
            } text-xl transition-all cursor-pointer`}
          >
            See All Project
          </h1>
        </div>
        <Link to={"/"}>
          <h1 className="text-primaryColor underline text-lg hover:text-blue-600 transition-all">
            Back To Home
          </h1>
        </Link>
      </div>
      {isVisible ? (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="flex items-center justify-between gap-5">
                <label className="input input-bordered flex items-center gap-2 w-2/4">
                  <FaProjectDiagram />
                  <input
                    {...register("projectName")}
                    type="text"
                    autoComplete="off"
                    className="grow"
                    placeholder="Project Name"
                  />
                </label>
                {errors.projectName && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.projectName.message}
                  </p>
                )}
                <label className="input input-bordered flex items-center gap-2 w-2/4">
                  <MdTitle size={20} />
                  <input
                    {...register("projectTitle")}
                    type="text"
                    autoComplete="off"
                    className="grow"
                    placeholder="Project Title"
                  />
                </label>
                {errors.projectTitle && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.projectTitle.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between gap-5 mt-5">
                <label className="input input-bordered flex items-center gap-2 w-2/4">
                  <FaGithub />
                  <input
                    {...register("githubClient")}
                    type="text"
                    autoComplete="off"
                    className="grow"
                    placeholder="GitHub Client Link..."
                  />
                </label>
                {errors.githubClient && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.githubClient.message}
                  </p>
                )}
                <label className="input input-bordered flex items-center gap-2 w-2/4">
                  <FaGithub />
                  <input
                    {...register("githubServer")}
                    type="text"
                    autoComplete="off"
                    className="grow"
                    placeholder="GitHub Server Link..."
                  />
                </label>
                {errors.githubServer && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.githubServer.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between gap-5 mt-5">
                <label className="input input-bordered flex items-center gap-2 w-2/4">
                  <FaLink />
                  <input
                    {...register("liveLink")}
                    type="text"
                    className="grow"
                    autoComplete="off"
                    placeholder="Project Live Link..."
                  />
                </label>
                {errors.liveLink && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.liveLink.message}
                  </p>
                )}
                <div className="w-2/4">
                  <input
                    {...register("projectImage")}
                    accept="image/*"
                    onChange={(e) => setPhotos(Array.from(e.target.files))}
                    type="file"
                    className="file-input file-input-bordered w-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-5 mt-5">
                <label className="input input-bordered flex items-center gap-2 w-full relative">
                  <HiSquare3Stack3D />
                  <input
                    type="text"
                    placeholder="Add Technology"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                  />
                  <span
                    onClick={addTechnology}
                    className="bg-blue-800 py-3 px-14 rounded-r-md font-semibold cursor-pointer absolute top-0 right-0"
                  >
                    Add
                  </span>
                </label>
              </div>
              <div className="mt-4">
                {technology.map((tech, index) => (
                  <span
                    key={index}
                    onClick={() => deleteTechnology(tech)}
                    className="inline-block bg-gray-200 text-gray-700 py-1 px-2 m-1 rounded transition-all duration-300 hover:bg-red-500 hover:cursor-pointer hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 relative">
              <PiChatCenteredText className="size-[18px] absolute top-[14px] left-3" />
              <textarea
                {...register("projectDetails")}
                className="textarea textarea-bordered w-full h-28 px-[34px]"
                placeholder="Type Project Details"
              />
            </div>
            <div className="flex items-center justify-center py-5">
              <input
                className="bg-blue-800 py-3 px-14 rounded font-semibold cursor-pointer"
                type="submit"
                value={loading ? "Loading..." : "Create Project"}
              />
            </div>
          </form>
        </div>
      ) : (
        <>
          <GetAllProject />
        </>
      )}
    </div>
  );
};

export default AddProject;
