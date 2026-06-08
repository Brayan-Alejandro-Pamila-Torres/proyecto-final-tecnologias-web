import { useRef, useState } from 'react';
import { useCV } from '../hooks/useCV';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function ProfileImageForm() {
  const { profileImage, updateProfileImage } = useCV();
  const [preview, setPreview] = useState(profileImage || '');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    setError('');

    if (!file) {
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError('Selecciona una imagen JPG, PNG o WEBP.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;
      setPreview(imageData);
      updateProfileImage(imageData);
    };

    reader.onerror = () => {
      setError('No se pudo cargar la imagen. Intenta con otro archivo.');
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreview('');
    setError('');
    updateProfileImage('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="profile-image-form">
      <h2>Foto de perfil</h2>

      {preview && (
        <div className="profile-image-preview">
          <img src={preview} alt="Vista previa de perfil" />
        </div>
      )}

      <label>
        Subir imagen
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      {preview && (
        <button type="button" onClick={handleRemoveImage}>
          Quitar imagen
        </button>
      )}
    </section>
  );
}

export default ProfileImageForm;
