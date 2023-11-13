// components/LocationUploadForm.tsx
import React, { useState, useEffect } from 'react';

interface LocationUploadFormProps {
    onClose: () => void;
    onSubmit: (data: FormData) => void;
}

const LocationUploadForm: React.FC<LocationUploadFormProps> = ({ onClose, onSubmit }) => {
    const [type, setType] = useState('trash');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude.toString());
                setLongitude(position.coords.longitude.toString());
            },
            () => {
                console.log('Error getting location');
            }
        );
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('type', type);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('description', description);
        if (image) formData.append('image', image);
        onSubmit(formData);
    };

    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</button>
            <form onSubmit={handleSubmit}>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="trash">Trash</option>
                    <option value="recycle">Recycle</option>
                    <option value="compost">Compost</option>
                </select>
                <input type="text" value={latitude} readOnly />
                <input type="text" value={longitude} readOnly />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LocationUploadForm;
