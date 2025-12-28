// components/ProfilePictureCropper.jsx
import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function ProfilePictureCropper({ image, onCropComplete, onCancel }) {
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
    aspect: 1 // 1:1 ratio
  });
  
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  const handleCropComplete = (crop) => {
    setCompletedCrop(crop);
  };

  const getCroppedImg = () => {
    if (!imgRef.current || !completedCrop) return null;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  const handleSave = async () => {
    const croppedImage = await getCroppedImg();
    onCropComplete(croppedImage);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Crop Profile Picture</h2>
          <p className="text-gray-600 mb-6">
            Drag and resize the square to select the portion you want to use
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="relative">
              {image && (
                <ReactCrop
                  crop={crop}
                  onChange={(newCrop) => setCrop(newCrop)}
                  onComplete={handleCropComplete}
                  aspect={1} // Force 1:1 ratio
                  circularCrop={false}
                  minWidth={100}
                  minHeight={100}
                >
                  <img
                    ref={imgRef}
                    src={image}
                    alt="Crop preview"
                    className="max-w-full max-h-[400px]"
                  />
                </ReactCrop>
              )}
            </div>
          </div>

          {/* Crop Guidelines */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Crop Tips:</h3>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Drag the square to move the selection</li>
              <li>Drag the corners to resize the selection</li>
              <li>The profile picture will be a perfect square (1:1 ratio)</li>
              <li>Make sure your face is centered in the square</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Profile Picture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}