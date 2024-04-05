import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import "../public/Form.css";

import StarRating from "./StarRating";
import ImageInput from "./ImageInput";

function Form() {
  const cloud_name = "dlpwpipf8";
  const upload_preset = "pultzcty";
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    message: "",
  });
  const [rating, setRating] = useState(5);
  const [selectedFile, setSelectedFile] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  // Getting the value of a query parameter named 'id'
  const id = searchParams.get("id");
  console.log(id);

  useEffect(
    function () {
      setFormData((prevFormData) => ({ ...prevFormData, rating: rating }));
    },
    [rating]
  );

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData);
    console.log(formData.message);

    console.log("this is selectedFile");
    console.log(selectedFile);

    if (imageData) {
      console.log("Image uploading ......");
      const image = new FormData();
      image.append("file", imageData);
      image.append("cloud_name", cloud_name);
      image.append("upload_preset", upload_preset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "post",
          body: image,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setImageUrl(data.secure_url);
    }

    const res = await fetch(
      `https://backend.ankitkumar143872.workers.dev/api/v1/feedback`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: formData.rating,
          washroomId: id,
          comment: formData.message,
          imageUrl,
        }),
      }
    );

    if (!res.ok) {
      console.log("response bad");
      throw new Error("response is not ok");
    }

    const json = await res.json();
    console.log("this is json response");
    console.log(json);

    const resp = await fetch("https://twilio-sms-d8db.onrender.com/notify", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipients: json.recipients,
        messageToBeSent: formData.message,
      }),
    });
    if (!resp.ok) {
      throw new Error("Something went wrong");
    }
    const info = await resp.json();
    console.log(info);
    setLoading(false);
    navigate("/submitted");
  };

  // problem with qr: if we would have set the query string for fetching the washroomId as id then anybody can change the query string in the url
  // and there is not point of using specific qrs for the specific washrooms
  // hence find the solution

  return (
    <div>
      <Backdrop className="backdrop" open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="App">
        <div className="content">
          <h1>Your feedback matters.</h1>
          <p>
            Please provide your feedback so that we can continue to improve.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="starRating">
          <label htmlFor="rating">Rating</label>
          <StarRating
            maxRating={5}
            messages={["Terrible", "Bad", "Ok", "Good", "Amazing"]}
            onSetRating={setRating}
            margin={"15px 0 0 -24px"}
            defaultRating={5}
            gap="15px"
          />
        </div>

        {rating <= 3 && (
          <ImageInput
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            setImageData={setImageData}
          />
        )}

        <div className="message">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;