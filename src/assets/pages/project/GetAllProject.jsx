import { toast } from "sonner";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "../../Redux/features/project/projectApi";

const GetAllProject = () => {
  const { data, refetch } = useGetProjectsQuery(undefined);
  const [deleteProject] = useDeleteProjectMutation();

  const deleteHandler = async (id) => {
    const res = await deleteProject(id);
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
            <th>Project Name</th>
            <th>Project Title</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data?.data?.map((project, i) => (
            <tr key={i} className="hover:bg-[#0F172A] transition-all">
              <th>{i + 1}</th>
              <td>{project?.name}</td>
              <td>{project?.title}</td>
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

export default GetAllProject;
