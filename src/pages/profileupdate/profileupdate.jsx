import React, { useState, useEffect } from "react"; 
import './profileupdate.css';
import assests from '../../assets/assets';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../config/firebase"; 
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { toast } from "react-toastify"; 

const ProfileUpdate = () => {
    const [name, setName] = useState(""); 
    const [bio, setBio] = useState(""); 
    const [uid, setUid] = useState(""); 
    const navigate = useNavigate();

    const profileUpdate = async (event) => {
        event.preventDefault();
        try {
            const docRef = doc(db, "users", uid);
            await updateDoc(docRef, {
                bio: bio,
                name: name
            });

            
            navigate('/chat');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid);
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    if (docSnap.data().name) {
                        setName(docSnap.data().name);
                    }
                    if (docSnap.data().bio) {
                        setBio(docSnap.data().bio);
                    }
                }
            } else {
                navigate("/");
            }
        });
    }, [navigate]);

    return (
        <div className="profile">
            <div className="profile-container">
                <form onSubmit={profileUpdate}> 
                    <h3>Profile Details</h3>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        placeholder="Your name"
                        required
                    />
                    <textarea
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        placeholder="Enter your bio"
                        required
                    ></textarea>
                    <button type="submit">Save</button>
                </form>
                <img src={assests.logo_icon} className="logo" alt="Logo" /> 
            </div>
        </div>
    );
};

export default ProfileUpdate; 
