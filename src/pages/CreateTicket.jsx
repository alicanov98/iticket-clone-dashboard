import { useState } from "react";

//? Axios
import axios from "axios";

//? React hook form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//? Yup
import { object, string } from "yup";

const CreateTicket = () => {
  //? Local states
  const [cardImg, setCardImg] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);
  const [locationImg, setLocationImg] = useState(null);
  const [infoImg, setInfoImg] = useState(null);
  const [sliderImg, setSliderImg] = useState(null);

  //? Yup schema
  const ticketSchema = object({
    eventTitle: string().required(),
    eventLocation: string().required(),
    venuelocation: string().required(),
    mobil: string().required(),
    ageRestriction: string().required(),
    language: string().required(),
    minimumPrice: string().required(),
    maximumPrice: string().required(),
    eventInfo: string().required(),
    eventDate: string().required(),
    eventDates: string().required(),
    startTime: string().required(),
    endTime: string().required(),
    category: string().required(),
    status: string().required(),
  });

  //? React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ticketSchema),
  });

  //? Send new ticket to api
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("eventTitle", data.eventTitle);
    formData.append("eventLocation", data.eventLocation);
    formData.append("venuelocation", data.venuelocation);
    formData.append("mobil", data.mobil);
    formData.append("ageRestriction", data.ageRestriction);
    formData.append("language", data.language);
    formData.append("minimumPrice", data.minimumPrice);
    formData.append("maximumPrice", data.maximumPrice);
    formData.append("eventInfo", data.eventInfo);
    formData.append("eventDate", data.eventDate);
    formData.append("eventDates", data.eventDates);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    formData.append("category", data.category);
    formData.append("status", data.status);
    formData.append("cardImg", cardImg);
    formData.append("bannerImg", bannerImg);
    formData.append("locationImg", locationImg);
    formData.append("infoImg", infoImg);
    formData.append("sliderImg", sliderImg);
    await axios
      .post(process.env.REACT_APP_CREATE_EVENT, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="createTicket">
      <div className="container">
        <div className="row">
          <h2 className="title">Create new ticket</h2>
          <div className="login-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="user-box">
                <input
                  className={errors.eventTitle && "error"}
                  type="text"
                  name="eventTitle"
                  {...register("eventTitle")}
                />
                <label>Ticket Event Title</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.eventLocation && "error"}
                  type="text"
                  name="eventLocation"
                  {...register("eventLocation")}
                />
                <label>Ticket Event Location</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.venuelocation && "error"}
                  type="text"
                  name="venuelocation"
                  {...register("venuelocation")}
                />
                <label>Ticket Venue location</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.mobil && "error"}
                  type="text"
                  name="mobil"
                  {...register("mobil")}
                />
                <label>Ticket Mobil</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.ageRestriction && "error"}
                  type="text"
                  name="ageRestriction"
                  {...register("ageRestriction")}
                />
                <label>Ticket Age Restriction</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.language && "error"}
                  type="text"
                  name="language"
                  {...register("language")}
                />
                <label>Ticket Language</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.minimumPrice && "error"}
                  type="text"
                  name="minimumPrice"
                  {...register("minimumPrice")}
                />
                <label>Ticket Minimum Price</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.maximumPrice && "error"}
                  type="text"
                  name="maximumPrice"
                  {...register("maximumPrice")}
                />
                <label>Ticket Maximum Price</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.eventInfo && "error"}
                  type="text"
                  name="eventInfo"
                  {...register("eventInfo")}
                />
                <label>Ticket Event Info</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.eventDate && "error"}
                  type="text"
                  name="eventDate"
                  {...register("eventDate")}
                />
                <label>Ticket Event Date</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.eventDates && "error"}
                  type="text"
                  name="eventDates"
                  {...register("eventDates")}
                />
                <label>Ticket Event Dates</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.startTime && "error"}
                  type="text"
                  name="startTime"
                  {...register("startTime")}
                />
                <label>Ticket Start Time</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.endTime && "error"}
                  type="text"
                  name="endTime"
                  {...register("endTime")}
                />
                <label>Ticket End Time</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.category && "error"}
                  type="text"
                  name="category"
                  {...register("category")}
                />
                <label>Ticket Category</label>
              </div>
              <div className="user-box">
                <input
                  className={errors.status && "error"}
                  type="text"
                  name="status"
                  {...register("status")}
                />
                <label>Ticket Status</label>
              </div>
              <div className="user-box">
                <label htmlFor="cImg">Select Card Image</label>
                <input
                  type="file"
                  name="cardImg"
                  id="cImg"
                  onChange={(e) => setCardImg(e.target.files[0])}
                />
                {/* <div className="previewImage">
                  <img src={preview} alt="uploaded-img" />
                </div> */}
              </div>
              <div className="user-box">
                <label htmlFor="bannerImg">Select Banner Image</label>
                <input
                  type="file"
                  name="bannerImg"
                  id="bannerImg"
                  onChange={(e) => setBannerImg(e.target.files[0])}
                />
                {/* <div className="previewImage">
                  <img src={preview} alt="uploaded-img" />
                </div> */}
              </div>
              <div className="user-box">
                <label htmlFor="locationImg">Select Location Image</label>
                <input
                  type="file"
                  name="locationImg"
                  id="locationImg"
                  onChange={(e) => setLocationImg(e.target.files[0])}
                />
                {/* <div className="previewImage">
                  <img src={preview} alt="uploaded-img" />
                </div> */}
              </div>
              <div className="user-box">
                <label htmlFor="infoImg">Select Info Image</label>
                <input
                  type="file"
                  name="infoImg"
                  id="infoImg"
                  onChange={(e) => setInfoImg(e.target.files[0])}
                />
                {/* <div className="previewImage">
                  <img src={preview} alt="uploaded-img" />
                </div> */}
              </div>
              <div className="user-box">
                <label htmlFor="sliderImg">Select Slider Image</label>
                <input
                  type="file"
                  name="sliderImg"
                  id="sliderImg"
                  onChange={(e) => setSliderImg(e.target.files[0])}
                />
                {/* <div className="previewImage">
                  <img src={preview} alt="uploaded-img" />
                </div> */}
              </div>
              <div className="btn">
                <button>
                  Create Ticket
                  <span></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTicket;
