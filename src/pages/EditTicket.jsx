import { useEffect, useState } from "react";

//? React hook form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//? Yup
import { object, string } from "yup";

//? Axios
import axios from "axios";

//? Router
import { useParams } from "react-router-dom";

const EditTicket = () => {
  //? Router
  const { ticketID } = useParams();

  //? Local states
  const [cardImg, setCardImg] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);
  const [locationImg, setLocationImg] = useState(null);
  const [infoImg, setInfoImg] = useState(null);
  const [sliderImg, setSliderImg] = useState(null);
  const [editData, setEditData] = useState({});

  //? Get single event data
  useEffect(() => {
    const getSingleTicketData = async () => {
      await axios
        .get(`${process.env.REACT_APP_EVENT_DETAILS}/${ticketID}`)
        .then((res) => {
          setEditData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSingleTicketData();
  }, [ticketID]);

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
    values: {
      eventTitle: editData?.eventTitle,
      eventLocation: editData?.eventLocation,
      venuelocation: editData?.venuelocation,
      mobil: editData?.mobil,
      ageRestriction: editData?.ageRestriction,
      language: editData?.language,
      minimumPrice: editData?.minimumPrice,
      maximumPrice: editData?.maximumPrice,
      eventInfo: editData?.eventInfo,
      eventDate: editData?.eventDate,
      eventDates: editData?.eventDates,
      startTime: editData?.startTime,
      endTime: editData?.endTime,
      category: editData?.category,
      status: editData?.status,
    },
  });

  //? Send updated data to api
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
      .put(`${process.env.REACT_APP_CREATE_EVENT}/${ticketID}`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="editTicket">
      <div className="container">
        <div className="row">
          <h2 className="title">Edit ticket's data</h2>
          <div className="login-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="eventTitle"
                  defaultValue={editData.eventTitle}
                  {...register("eventTitle")}
                />
                <label>Ticket eventTitle</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="eventLocation"
                  defaultValue={editData.eventLocation}
                  {...register("eventLocation")}
                />
                <label>Ticket Event Location</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="venuelocation"
                  defaultValue={editData.venuelocation}
                  {...register("venuelocation")}
                />
                <label>Ticket Venue Location</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="mobil"
                  defaultValue={editData.mobil}
                  {...register("mobil")}
                />
                <label>Ticket Mobil</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="ageRestriction"
                  defaultValue={editData.ageRestriction}
                  {...register("ageRestriction")}
                />
                <label>Ticket Age Restriction</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="language"
                  defaultValue={editData.language}
                  {...register("language")}
                />
                <label>Ticket Language</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="minimumPrice"
                  defaultValue={editData.minimumPrice}
                  {...register("minimumPrice")}
                />
                <label>Ticket Minimum Price</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="maximumPrice"
                  defaultValue={editData.maximumPrice}
                  {...register("maximumPrice")}
                />
                <label>Ticket Maximum Price</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="eventInfo"
                  defaultValue={editData.eventInfo}
                  {...register("eventInfo")}
                />
                <label>Ticket Event Info</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="eventDate"
                  defaultValue={editData.eventDate}
                  {...register("eventDate")}
                />
                <label>Ticket Event Date</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="eventDates"
                  defaultValue={editData.eventDates}
                  {...register("eventDates")}
                />
                <label>Ticket Event Dates</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="startTime"
                  defaultValue={editData.startTime}
                  {...register("startTime")}
                />
                <label>Ticket Start Time</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="endTime"
                  defaultValue={editData.endTime}
                  {...register("endTime")}
                />
                <label>Ticket End Time</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="category"
                  defaultValue={editData.category}
                  {...register("category")}
                />
                <label>Ticket Category</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
              <div className="user-box">
                <input
                  // className={errors.name && "error"}
                  type="text"
                  name="status"
                  defaultValue={editData.status}
                  {...register("status")}
                />
                <label>Ticket Status</label>
              </div>
              {/* {errors.name && <span>{errors.name.message}</span>} */}
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
                  Edit Ticket
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

export default EditTicket;
