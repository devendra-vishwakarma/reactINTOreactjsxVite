import { CCol, CForm, CFormInput, CImage, CRow, CButton } from "@coreui/react";
import axios from "axios";
import React, { useState } from "react";

const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [userImage, setUserImage] = useState();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "userImage" && files.length > 0) {
            setUserImage(URL.createObjectURL(files[0]));
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data:", userData);
        console.log("Selected image:", userImage);

        axios.post("http://localhost:8080/upload")
        .then(res=>{
            console.log(res);
            setUserImage(res.data.imageUrl)
        }).catch(error=>{
            console.log("badahi hoon error ayi hain")
            console.log(error);
        })
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "3rem" }}>
            <div style={{
                border: "1px solid gold",
                padding: "1.5rem",
                borderRadius: "18px",
                boxShadow: "0px 4px 8px rgba(255, 215, 0, 0.9)"
            }}>
                <div>
                    <CForm onSubmit={handleSubmit} style={{
                        border: "1px solid gold",
                        width: "30rem",
                        padding: "3rem",
                        borderRadius: "16px",
                        boxShadow: "0px 4px 8px rgba(255, 215, 0, 0.5)"
                    }}>
                        <div>
                            <h1>User Profile <span>
                                <CImage style={{
                                    borderRadius: "50%",
                                    marginBottom: "2rem",
                                    filter: "drop-shadow(0px 4px 8px rgba(255, 215, 0, 0.5))"
                                }} src={userImage || "./banner2.jpg"} width={150} height={150} />
                            </span>
                            </h1>
                        </div>
                        <CRow>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    id="username"
                                    name="username"
                                    label="Username"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    aria-describedby="exampleFormControlInputHelpInline"
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CFormInput
                                    type="email"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    aria-describedby="exampleFormControlInputHelpInline"
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    id="address"
                                    name="address"
                                    label="Address"
                                    placeholder="Address"
                                    onChange={handleChange}
                                    aria-describedby="exampleFormControlInputHelpInline"
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    id="state"
                                    name="state"
                                    label="State"
                                    placeholder="State"
                                    onChange={handleChange}
                                    aria-describedby="exampleFormControlInputHelpInline"
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    id="city"
                                    name="city"
                                    label="City"
                                    placeholder="City"
                                    onChange={handleChange}
                                    aria-describedby="exampleFormControlInputHelpInline"
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CFormInput
                                    type="file"
                                    id="userImage"
                                    name="userImage"
                                    label="Image"
                                    onChange={handleChange}
                                    aria-describedby="exampleFormControlInputHelpInline"
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol className="d-flex justify-content-center mt-4">
                                <CButton type="submit" style={{ width: "20rem", fontWeight: "bold", fontSize: "1rem" }} color="warning" variant="outline">
                                    Submit
                                </CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
