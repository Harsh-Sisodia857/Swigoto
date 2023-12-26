import React, { Fragment, useEffect, useState } from "react";
import "./Shipping.css";
import { useDispatch } from "react-redux";
import { saveShippingInfo } from "../store/slice/shippingSlice";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [userId, setUserId] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/user/getUser", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token' : localStorage.getItem('token')
                    }
                });
                const json = await response.json();
                console.log("Response Json : ",json);
                if (json.success) {
                    const { location, _id: userId } = json.user;
                    const { address, city, state, pincode, country } = location;
                    setAddress(address);
                    setCity(city);
                    setCountry(country);
                    setPinCode(pincode);
                    setState(state);
                    setUserId(userId)
                } else {
                    console.log("Error fetching User Data");
                }
            } catch (error) {
                console.error("Error fetching User Data", error);
            }
        };

        fetchData();
    }, []);
    

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be 10 digits Long");
            return;
        }
        const shippingInfo = { address, city, state, country, pinCode, phoneNo, userId };
        dispatch(
            saveShippingInfo(shippingInfo)
        );
        navigate("/order/confirm");
    };

    return (
        <Fragment>

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <LocationCityIcon />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <PinDropIcon />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div>
                            <PublicIcon />
                            <input
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <div>
                            <TransferWithinAStationIcon />
                            <input
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;