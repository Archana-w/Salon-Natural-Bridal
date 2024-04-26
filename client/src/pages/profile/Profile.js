import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Form, Input, Flex, Button, Upload } from 'antd';
import './Profile.css';
import ProfileVector from '../../images/default_profile_vector.webp';
import Camera from '../../images/customer_appointment/camera.png'
import { PlusOutlined } from '@ant-design/icons';
import { useAuthToken } from '../../auth';
import { useNavigate } from "react-router-dom";
import PageLoading from '../../components/loading/PageLoading';

function Profile() {

    var token = useAuthToken();
    var navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [profileDetails, setProfileDetails] = useState({});

    //handle profile picture
    var profilePictureUrl = ProfileVector;
    if (profileDetails.profile_pic != null) {
        profilePictureUrl = "http://localhost:5000/image/" + profileDetails.profile_pic;
    }

    console.log(profileDetails);

    useEffect(() => {

        if (token != null) {

            axios.post("http://localhost:5000/user/profile", { token: token }).then((response) => {

                var data = response.data;
                var status = data.status;
                if (status == "success") {
                    setProfileDetails(data);
                    setLoading(false);
                } else if (status == "token_expired" || status == "auth_failed") {
                    navigate("/signout");
                } else {
                    var message = data.message;
                    alert("Error - " + message);
                }

            }).catch((error) => {
                alert("Error 2 - " + error);
            });

        } else {
            navigate("/login");
        }

    }, []);

    function deleteProfile() {

        setLoading(true);

        axios.post("http://localhost:5000/user/delete", { token: token }).then((response) => {

            var data = response.data;
            var status = data.status;
            if (status == "success") {
                navigate("/signout");
            } else if (status == "token_expired" || status == "auth_failed") {
                navigate("/signout");
            } else {
                var message = data.message;
                alert("Error - " + message);
            }

        }).catch((error) => {
            alert("Error 2 - " + error);
        });

    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };



    if (isLoading) {

        return (
            <>
                <PageLoading />
            </>
        );

    } else {

        return (


            <div className='upper-img'>

                <div className='profile-container'>
                    <div className='upper-container'>

                        <div className='image-container'>
                            <img className='profile_img' src={profilePictureUrl} alt="profile" height="100px" width="100px" />
                            <Upload className='camera-upload' showUploadList={false}>
                                <Button className='camera-button'>
                                    <img src={Camera} alt="camera" />
                                </Button>
                            </Upload>
                        </div>

                        <div className='img_text'>

                            <h1 className='pcard-title'>{profileDetails.first_name + " " + profileDetails.last_name}</h1>

                        </div>

                    </div>

                    <div className="lower-container">

                        <div className="profile_details">
                            <div className="profile_details-form card p-2">
                                <h1 className="card-title">User Information</h1>
                                <Form layout="vertical" >
                                    <Form.Item
                                        label="First Name"
                                        name="first_name"
                                    
                                    >
                                        <Input className="profile_input" placeholder="First Name" defaultValue={profileDetails.first_name} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Last Name"
                                        name="last_name"

                                    >
                                        <Input className="profile_input" placeholder="Last Name" defaultValue={profileDetails.last_name}/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Contact Number"
                                        name="mobile_number"

                                    >
                                        <Input className="profile_input" placeholder="Contact Number" defaultValue={profileDetails.mobile_number} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"

                                    >
                                        <Input className="profile_input" placeholder="Email" defaultValue={profileDetails.email} />
                                    </Form.Item>

                                    <Flex className='profile_btn' gap="small" wrap="wrap">


                                        <Button className='edit-profile' type="primary">Edit Profile</Button>
                                        <Button className='delete' onClick={deleteProfile} type="primary">Delete Account</Button>

                                    </Flex>



                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );

    }


}

export default Profile;