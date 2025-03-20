import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="container-default">
        <div className="container">
          <div className="text-center">
            <img src="./青松露營w.svg" alt="logo" style={{ height: "200px" }} />
            <h1 className="d-flex justify-content-center py-12 text-gray-80">
              {`頁面不存在喔  >~<`}
            </h1>
            <p>是不是迷路啦~</p>
            <Link to={"/"} className="notFound">
              點我就帶你回到首頁喔~
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
