// src/controllers/eventController.js
import { createEvent, getAllEvents, getEventById, uploadImage } from "../models/Event";

export const fetchAllEvents = async () => {
    return await getAllEvents()
}

export const fetchEventById = async (id) => {
    return await getEventById(id)
}

export const addEvent = async (event) => {
    return await createEvent(event);
}

export const addImage = async (file, id_folder, id_image) => {
    return await uploadImage(file, id_folder, id_image)
}