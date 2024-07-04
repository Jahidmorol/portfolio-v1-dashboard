import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiCompass1, CiTimer } from "react-icons/ci";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { MdTitle } from "react-icons/md";
import { PiChatCenteredText } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useCreateExperienceMutation } from "../../Redux/features/experience/experienceApi";
import { toast } from "sonner";
import GetExperience from "./GetExperience";

const AddExperience = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [createExperience] = useCreateExperienceMutation();

  const onSubmit = async (data) => {
    setLoading(true);
    const experienceData = {
      name: data?.companyName,
      type: data?.jobType,
      duration: data?.duration,
      position: data?.position,
      details: data?.jobDetails,
    };
    const res = await createExperience(experienceData);
    if (res?.data?.success === true) {
      toast.success("Experience Add Successfull!");
      setLoading(false);
      reset();
    }
  };
  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center pb-8">
        <div className="flex items-center gap-3">
          <h1
            onClick={() => setIsVisible(true)}
            className={`${
              isVisible ? "underline text-white" : ""
            } text-xl transition-all cursor-pointer`}
          >
            Add Experience
          </h1>
          <h1
            onClick={() => setIsVisible(false)}
            className={`${
              isVisible ? "" : "underline text-white"
            } text-xl transition-all cursor-pointer`}
          >
            See Experience
          </h1>
        </div>
        <Link to={"/"}>
          <h1 className="text-primaryColor underline text-lg hover:text-blue-600 transition-all">
            Back To Home
          </h1>
        </Link>
      </div>
      {isVisible ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex items-center justify-between gap-5">
              <label className="input input-bordered flex items-center gap-2 w-2/4">
                <CiCompass1 />
                <input
                  {...register("companyName")}
                  type="text"
                  autoComplete="off"
                  className="grow"
                  placeholder="Company Name"
                />
              </label>
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.companyName.message}
                </p>
              )}
              <label className="input input-bordered flex items-center gap-2 w-2/4">
                <MdTitle size={20} />
                <input
                  {...register("jobType")}
                  type="text"
                  autoComplete="off"
                  className="grow"
                  placeholder="Job Type.."
                />
              </label>
              {errors.jobType && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.jobType.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between gap-5 mt-5">
              <label className="input input-bordered flex items-center gap-2 w-2/4">
                <CiTimer />
                <input
                  {...register("duration")}
                  type="number"
                  autoComplete="off"
                  className="grow"
                  placeholder="Duration"
                />
              </label>
              {errors.duration && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.duration.message}
                </p>
              )}
              <label className="input input-bordered flex items-center gap-2 w-2/4">
                <HiOutlineSquare3Stack3D />
                <input
                  {...register("position")}
                  type="text"
                  autoComplete="off"
                  className="grow"
                  placeholder="Job Position"
                />
              </label>
              {errors.position && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.position.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-8 relative">
            <PiChatCenteredText className="size-[18px] absolute top-[14px] left-3" />
            <textarea
              {...register("jobDetails")}
              className="textarea textarea-bordered w-full h-28 px-[34px]"
              placeholder="Type Job Details"
            />
          </div>
          <div className="flex items-center justify-center py-5">
            <input
              className="bg-blue-800 py-3 px-14 rounded font-semibold cursor-pointer"
              type="submit"
              value={loading ? "Loading..." : "Add Experience"}
            />
          </div>
        </form>
      ) : (
        <GetExperience />
      )}
    </div>
  );
};

export default AddExperience;
