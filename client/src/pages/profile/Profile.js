import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import './Profile.css';
import ProfileVector from '../../images/default_profile_vector.webp';
import Camera from '../../images/customer_appointment/camera.png';
import { useAuthToken } from '../../auth';
import { useNavigate } from "react-router-dom";
import PageLoading from '../../components/loading/PageLoading';

function Profile() {
    const token = useAuthToken();
    const navigate = useNavigate();
    const [update, setUpdate] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [profileDetails, setProfileDetails] = useState({});

    var profilePictureUrl = ProfileVector;
    if (profileDetails.profile_pic != null) {
        profilePictureUrl = "http://localhost:5000/image/" + profileDetails.profile_pic;
    }

    useEffect(() => {
        if (token != null) {
            axios.post("http://localhost:5000/user/profile", { token: token }).then((response) => {
                const data = response.data;
                const status = data.status;
                if (status === "success") {
                    setProfileDetails(data);
                    setLoading(false);
                } else if (status === "token_expired" || status === "auth_failed") {
                    navigate("/signout");
                } else {
                    const message = data.message;
                    alert("Error - " + message);
                }
            }).catch((error) => {
                alert("Error 2 - " + error);
            });
        } else {
            navigate("/login");
        }
    }, [update]);

    function deleteProfile() {
        setLoading(true);
        axios.post("http://localhost:5000/user/delete", { token: token }).then((response) => {
            const data = response.data;
            const status = data.status;
            if (status === "success") {
                navigate("/signout");
            } else if (status === "token_expired" || status === "auth_failed") {
                navigate("/signout");
            } else {
                const message = data.message;
                alert("Error - " + message);
            }
        }).catch((error) => {
            alert("Error 2 - " + error);
        });
    }

    const handleProfilePictureUpload = (e) => {
        const form = new FormData();
        form.append("token", token);
        form.append("image", e.file);
        axios.post("http://localhost:5000/user/edit/avatar", form).then((response) => {
            const data = response.data;
            const status = data.status;
            if (status === "success") {
                setUpdate(update + 1);
            } else if (status === "token_expired" || status === "auth_failed") {
                navigate("/signout");
            } else {
                const message = data.message;
                alert("Error - " + message);
            }
        }).catch((error) => {
            alert("Error 2 - " + error);
        });
    };

    const editProfile = () => {
        // Handle profile editing
    };

    if (isLoading) {
        return <PageLoading />;
    } else {
        return (
            <div className='upper-img'>
                <div className='profile-container'>
                    <div className='upper-container'>
                        <div className='image-container'>
                            <img className='profile_img' src={profilePictureUrl} alt="profile" height="100px" width="100px" />
                            <label className='camera-button' htmlFor="file-input">
                                <input id="file-input" type="file" onChange={(e) => handleProfilePictureUpload(e.target.files[0])} style={{ display: "none" }} />
                                <img src={Camera} alt="camera" />
                            </label>
                        </div>
                        <div className='img_text'>
                            <h1 className='pcard-title'>{profileDetails.first_name + " " + profileDetails.last_name}</h1>
                        </div>
                    </div>
                    <div className="lower-container">
                        <div className="profile_details">
                            <div className="profile_details-form card p-2">
                                <h1 className="card-title">User Information</h1>
                                <form className='profile_form'>
                                    <label>First Name</label>
                                    <input className="profile_input" type="text" placeholder="First Name" defaultValue={profileDetails.first_name} />
                                    <label>Last Name</label>
                                    <input className="profile_input" type="text" placeholder="Last Name" defaultValue={profileDetails.last_name} />
                                    <label>Contact Number</label>
                                    <input className="profile_input" type="text" placeholder="Contact Number" defaultValue={profileDetails.mobile_number} />
                                    <label>Email</label>
                                    <input className="profile_input" type="email" placeholder="Email" defaultValue={profileDetails.email} />
                                    <div className='profile_btn'>
                                        <button className='edit-profile' onClick={editProfile}>Edit Profile</button>
                                        <button className='delete' onClick={deleteProfile}>Delete Account</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
