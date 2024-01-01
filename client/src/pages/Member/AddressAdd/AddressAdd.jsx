import React, { useState, useEffect, useContext } from 'react'
import classNames from "classnames/bind";
import styles from "./AddressAdd.module.scss";
import axios from 'axios';
import GlobalContext from '../../../context/GlobalContext';

const cx = classNames.bind(styles);

const AddressAdd = () => {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [addr, setAddr] = useState("");
    const {apiUrl, user} = useContext(GlobalContext)
    const usedIds = [];
    function generateId() {
        let id;
        do {
            const randomNumber = Math.floor(Math.random() * 90 + 10);
            id = "A" + randomNumber;
        } while (usedIds.includes(id));
        usedIds.push(id);
        return id;
    }
    const idAddress = generateId();

    const handleChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };

    const [citiesData, setCitiesData] = useState([]);
    const [districtsData, setDistrictsData] = useState([]);
    const [wardsData, setWardsData] = useState([]);

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            .then((response) => {
                setCitiesData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleCityChange = (event) => {
        setProvince(event.target.value);
        setDistrict('');
        setWard('');
        setDistrictsData([]);
        setWardsData([]);

        const selectedCity = citiesData.find(city => city.Id === event.target.value);
        if (selectedCity) {
            setDistrictsData(selectedCity.Districts);
        }
    }

    const handleDistrictChange = (event) => {
        setDistrict(event.target.value);
        setWard('');
        setWardsData([]);

        const selectedCity = citiesData.find(city => city.Id === province);
        if (selectedCity) {
            const selectedDistrict = selectedCity.Districts.find(district => district.Id === event.target.value);
            if (selectedDistrict) {
                setWardsData(selectedDistrict.Wards);
            }
        }
    }

    const getProvinceName = (provinceCode) => {
        const selectedCity = citiesData.find(city => city.Id === provinceCode);
        return selectedCity ? selectedCity.Name : '';
    }

    const getDistrictName = (districtCode) => {
        const selectedCity = citiesData.find(city => city.Id === province);
        const selectedDistrict = selectedCity ? selectedCity.Districts.find(district => district.Id === districtCode) : null;
        return selectedDistrict ? selectedDistrict.Name : '';
    }

    const handleSave = async (event) => {
        if (!lastName || !firstName || !phoneNumber || !province || !district || !ward || !addr) {
            alert("Vui lòng điền đầy đủ thông tin");
        }
        else {
            event.preventDefault();
            try {
                const formData = new FormData();
                formData.append('id', idAddress);
                formData.append('username', user.USERNAME);
                formData.append('lastname', lastName);
                formData.append('firstname', firstName);
                formData.append('phonenumber', phoneNumber);
                formData.append('province', getProvinceName(province));
                formData.append('district', getDistrictName(district));
                formData.append('ward', ward);
                formData.append('addr', addr);
                await axios.post(`${apiUrl}/pages/Member/AddressAdd/AddressAdd.php`, formData);
            } catch (error) {
                console.log(error);
            }
            window.location.href = '/member/address';
        }
    };

    return (
        <div className={cx("address-add")}>
            <div className={cx("header")}>
                THÊM ĐỊA CHỈ
            </div>

            <div className={cx("content")}>
                <div className={cx("lastname")}>
                    <div className={cx("field")}>Họ:</div>
                    <div className={cx("info")}>
                        <input type="text" value={lastName} onChange={(event) => handleChange(event, setLastName)} />
                    </div>
                </div>
                <div className={cx("firstname")}>
                    <div className={cx("field")}>Tên:</div>
                    <div className={cx("info")}>
                        <input type="text" value={firstName} onChange={(event) => handleChange(event, setFirstName)} />
                    </div>
                </div>
                <div className={cx("phonenumber")}>
                    <div className={cx("field")}>Số điện thoại:</div>
                    <div className={cx("info")}>
                        <input type="text" value={phoneNumber} onChange={(event) => handleChange(event, setPhoneNumber)} />
                    </div>
                </div>
                <div className={cx("province")}>
                    <label htmlFor="province" className={cx("field")}>Tỉnh / Thành phố:</label>
                    <div className={cx("info")}>
                        <select id="province" value={province} onChange={handleCityChange} required>
                            <option value="">Select Province/City</option>
                            {citiesData.map((city) => (
                                <option key={city.Id} value={city.Id}>
                                    {city.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                <div className={cx("district")}>
                    <label htmlFor="district" className={cx("field")}>Quận / Huyện:</label>
                    <div className={cx("info")}>
                        <select id="district" value={district} onChange={handleDistrictChange} required>
                            <option value="">Select District</option>
                            {districtsData.map((district) => (
                                <option key={district.Id} value={district.Id}>
                                    {district.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={cx("ward")}>
                    <label htmlFor="ward" className={cx("field")}>Phường / Xã:</label>
                    <div className={cx("info")}>
                        <select id="ward" value={ward} onChange={(event) => handleChange(event, setWard)} required>
                            <option value="">Select Ward</option>
                            {wardsData.map((ward) => (
                                <option key={ward.Id} value={ward.Name}>
                                    {ward.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={cx("addr")}>
                    <div className={cx("field")}>Địa chỉ cụ thể:</div>
                    <div className={cx("info")}>
                        <input type="text" value={addr} onChange={(event) => handleChange(event, setAddr)} />
                    </div>
                </div>
                <div className={cx("button")}>
                    <button className={cx("button-cancel")} onClick={() => window.location.href = '/member/address'}>
                        Hủy
                    </button>
                    <button className={cx("button-save")} onClick={handleSave}>
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddressAdd