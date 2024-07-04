import img from "../assets/picture/f.jpg";

function ImgNav() {
  return (
    <div className="text-center mb-7 mt-4">
      <div className="w-full my-4">
        <img
          src={img}
          alt=""
          className="mx-auto w-24 h-24 object-cover  rounded-full"
        />
      </div>
      <p className="text-xl mb-1">Mehedi Hasan Foysal</p>
      <p className="text-[#94A3B8] text-sm">mededihasan22@gmail.com</p>
    </div>
  );
}

export default ImgNav;
