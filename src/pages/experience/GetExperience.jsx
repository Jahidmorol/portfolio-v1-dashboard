import { toast } from "sonner";

import {
  useDeleteExperienceMutation,
  useGetExperienceQuery,
} from "../../Redux/features/experience/experienceApi";

const GetExperience = () => {
  const { data, refetch } = useGetExperienceQuery(undefined);
  const [deleteExperience] = useDeleteExperienceMutation();

  const deleteHandler = async (id) => {
    const res = await deleteExperience(id);
    if (res?.data?.success === true) {
      toast.success(res.data.message);
      refetch();
    }
  };

  return (
    <div className="overflow-x-auto border border-gray-500">
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Company Name</th>
            <th>Job Type</th>
            <th>Duration</th>
            <th>Position</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data?.data?.map((project, i) => (
            <tr key={i} className="hover:bg-[#0F172A] transition-all">
              <th>{i + 1}</th>
              <td>{project?.name}</td>
              <td>{project?.type}</td>
              <td>{project?.duration}</td>
              <td>{project?.position}</td>
              <td className="text-center">
                <p
                  onClick={() => deleteHandler(project?._id)}
                  className="cursor-pointer hover:underline w-fit mx-auto"
                >
                  Delete
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetExperience;
