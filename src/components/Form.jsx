import React, { useState, useEffect } from 'react';

const Form = ({ onSubmit, reset }) => {
    const [formData, setFormData] = useState({
        rut: '',
        first_name: '',
        last_name: '',
        address: '',
        buyer_type: 'minorista',
    });

    // Efecto para resetear el formulario cuando el prop `reset` cambie a `true`
    useEffect(() => {
        if (reset) {
            setFormData({
                rut: '',
                first_name: '',
                last_name: '',
                address: '',
                buyer_type: 'minorista',
            });
        }
    }, [reset]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                RUT:
                <input type="text" name="rut" value={formData.rut} onChange={handleChange} required />
            </label>
            <label>
                Nombres:
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </label>
            <label>
                Apellidos:
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </label>
            <label>
                Dirección:
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </label>
            <label>
                Tipo de Comprador:
                <select name="buyer_type" value={formData.buyer_type} onChange={handleChange}>
                    <option value="minorista">Minorista</option>
                    <option value="mayorista">Mayorista</option>
                </select>
            </label>
            <button type="submit">Generar Ticket</button>
        </form>
    );
};

export default Form;
