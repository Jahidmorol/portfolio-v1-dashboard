import { toast } from "sonner";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "../../Redux/features/blog/blogApi";

const GetAllBlog = () => {
  const { data, refetch } = useGetBlogsQuery(undefined);
  const [deleteBlog] = useDeleteBlogMutation();

  const deleteHandler = async (id) => {
    const res = await deleteBlog(id);
    if (res?.data?.success === true) {
      toast.success(res.data.message);
      refetch();
    }
  };
  return (
    <div>
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
            {data?.data?.map((blog, i) => (
              <tr key={i} className="hover:bg-[#0F172A] transition-all">
                <th>{i + 1}</th>
                <td>{blog?.title}</td>
                <td>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        blog?.content.length > 140
                          ? blog?.content.slice(0, 140) + "..."
                          : blog?.content,
                    }}
                  />
                </td>
                <td>{blog?.duration}</td>
                <td>{blog?.position}</td>
                <td className="text-center">
                  <p
                    onClick={() => deleteHandler(blog?._id)}
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
    </div>
  );
};

export default GetAllBlog;
