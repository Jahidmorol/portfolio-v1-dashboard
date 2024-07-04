import { useState } from "react";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill CSS for proper styling

const Blog = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [detail, setDetail] = useState("");
  const [title, setTitle] = useState("");
  // const [createFunction] = useCreateBlogMutation();

  const handlerSubmit = async () => {
    setLoading(true);
    if (photos.length < 1) {
      setLoading(false);
      return toast.error("Image is missing");
    }

    if (!detail) {
      setLoading(false);
      return toast.error("Detail is missing");
    }
    if (!title) {
      setLoading(false);
      return toast.error("Title is missing");
    }

    // const image = await cloudINary(photos[0]);

    const info = {
      title,
      detail,
    };
    console.log({ info });

    // const res = await createFunction(info);

    setLoading(false);
  };

  return (
    <div className="w-full px-4 pb-24">
      <h2 className="text-[30px] font-semibold text-gray-50 text-center mt-10 pb-4">
        Create Blog
      </h2>
      <h1>{detail}</h1>
      <section className="flex justify-between items-center gap-5">
        <div className="text-center my-5 w-2/4">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter type blog title..."
            className="input input-bordered input-md w-full my-3"
            name="title"
            required
          />
        </div>

        <div className="text-center my-5 w-2/4">
          <input
            onChange={(e) => setPhotos(Array.from(e.target.files))}
            type="file"
            className="file-input input-bordered my-3 w-full"
          />
        </div>
      </section>

      <section>
        <div>
          <p className="text-[18px] font-[500] pb-2">Detail</p>
          <ReactQuill
            value={detail}
            onChange={setDetail}
            className="placeholder:text-gray-300"
            placeholder="Enter your content"
            style={{
              height: "250px",
              width: "100%",
              margin: "auto",
            }}
          />
        </div>
      </section>

      <section onClick={() => handlerSubmit()} className="text-center mt-20">
        {loading ? (
          <button className="w-full md:w-[30%] mx-auto flex justify-center bg-gradient-to-r from-blue-500 to-blue-400 hover:shadow-lg text-gray-100 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500 py-2 px-5">
            <span className="loading loading-dots loading-md"></span>
          </button>
        ) : (
          <button className="w-full md:w-[30%] mx-auto flex justify-center bg-gradient-to-r from-blue-500 to-blue-400 hover:shadow-lg text-gray-100 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500 py-2 px-5">
            Submit
          </button>
        )}
      </section>
    </div>
  );
};

export default Blog;
