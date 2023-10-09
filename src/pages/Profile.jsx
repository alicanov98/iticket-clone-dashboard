import  { useContext } from "react";
import { Context } from "../utils/MainContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user,setUser } = useContext(Context);

  const changeImage = async(e)=>{
    const token = JSON.parse(localStorage.getItem('token'))

    const body = new FormData()
    body.append('token',token)
    body.append('profileImage',e.target.files[0])

    await axios.put(process.env.REACT_APP_ADD_PROFILE_IMAGE,body).then(res=>{
      setUser(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <section className="profile">
      <div className="container">
        <div className="row">
          <h2 className="title">Welcome dear {user.name}</h2>
          <div className="profileBox">
            <div className="leftSide">
              <div className="image">
                {user.profileImage && (
                  <img
                    src={`http://localhost:7000/${user.profileImage}`}
                    alt={user.name + user.surname}
                  />
                )}
              </div>
              <form className="imgForm">
                <label htmlFor="img">Change Image</label>
                <input type="file" onChange={changeImage}/>
              </form>
            </div>
            <div className="rightSide">
              <ul className="userInfo">
                <li className="infoItem">
                  Name: <span>{user.name}</span>
                </li>
                <li className="infoItem">
                  Surname: <span>{user.surname}</span>
                </li>
                <li className="infoItem">
                  Email: <Link to={`mailto:${user.email}`}>{user.email}</Link>
                </li>
                <li className="infoItem">
                  <Link to="/reset-password">Reset password</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
