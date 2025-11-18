import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import config from '../../../config';
import {ToastSuccess, ToastError} from "../../../Admin/components/common/ToastMsg";

const Info = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const url = `${config?.apiUrl}/contactform`;
    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch( url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                ToastSuccess('Your message has been sent successfully!');
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    message: '',
                });
            } else {
                const errorData = await response.json();
                ToastError(errorData.message || 'Failed to send the message.');
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            ToastError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="contactinfo container mt-5">
            <h1 className="main_txt" data-aos="fade-up">How Can We <span>Help?</span></h1>
            <p data-aos="fade-up" data-aos-delay="200">We're here to assist you with any questions or support you may need on your journey at UCAS!</p>
            <div className="info">
                <div className="info-item" data-aos="fade-up" data-aos-delay="200">
                    <div className="icon-ucas">
                        <FaMapMarkerAlt />
                    </div>
                    <Link to='https://www.google.com/maps?ll=11.170482,76.922308&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=14305252792174469772' target="_blank" rel="noopener noreferrer">
                        <p>G. Koundampalayam,<br />Periyanaickenpalayam,<br />Coimbatore - 641020</p>
                    </Link>
                </div>

                <div className="info-item" data-aos="fade-up" data-aos-delay="400">
                    <div className="icon-ucas">
                        <FaPhoneAlt />
                    </div>
                    <p>
                        <Link to='tel:+91 96 888 45 555'>+91 96 888 45 555</Link>
                        <br />
                        <Link to='tel:+91 96 888 88 888'>+91 96 888 88 888</Link>
                    </p>
                </div>

                <div className="info-item" data-aos="fade-up" data-aos-delay="600">
                    <div className="icon-ucas">
                        <FaEnvelope />
                    </div>
                    <p><Link to='mailto:infoucas@uit.ac.in'>infoucas@uit.ac.in</Link></p>
                </div>
            </div>

            <div className="form-map-container">
                <div className="form-section" data-aos="fade-right">
                    <form className='contact-form-container' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            rows="4"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                        <button type="submit" className="info-btn" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                    {/* {successMessage && <p className="success-message">{successMessage}</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>} */}
                </div>

                <div className="map-section" data-aos="fade-left" data-aos-delay="200">
                    <iframe
                        className="contact-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.716784028285!2d76.92089487503026!3d11.170340151804377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f142512d01c1%3A0xdab623e1728fc286!2sUnited%20College%20of%20Arts%20and%20Science!5e1!3m2!1sen!2sin!4v1732250806692!5m2!1sen!2sin"
                        width="600"
                        height="450"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Info;
