// MapPage.tsx
import React, { useState } from 'react';
import MapBoxComponent from '../components/MapComponent';
import LocationUploadForm from '../components/LocationUploadForm';


const MapPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

    const handleFormSubmit = (formData: FormData) => {
        // Handle form submission here
        console.log('Form data:', formData);
        setShowForm(false);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#f4f4f4' }}>
                <button onClick={() => setShowForm(true)} style={{ padding: '10px', marginBottom: '20px' }}>
                    Upload Location
                </button>
                {/* Here you can add components or elements to display existing locations */}
            </div>
            <div style={{ flex: 3, minHeight: '0' }}>
                <MapBoxComponent />
            </div>
            {showForm && (
                <LocationUploadForm 
                    onClose={() => setShowForm(false)} 
                    onSubmit={handleFormSubmit} 
                />
            )}
        </div>
    );
};

export default MapPage;