import asyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';
import { validateEmail, validateContactName, validatePhone } from '../utils/validation.js';

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
})

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const nameError = validateContactName(name);
    if (nameError) {
        res.status(400);
        throw new Error(nameError);
    }

    if (!validateEmail(email)) {
        res.status(400);
        throw new Error("Invalid email address format!");
    }

    if (!validatePhone(phone)) {
        res.status(400);
        throw new Error("Phone must be 10–15 digits, numbers only!");
    }

    const contactData = {
        name: name.toUpperCase(),
        email: email.toLowerCase(),
        phone: phone,
        user_id: req.user.id
    }

    const contactExists = await Contact.findOne({
        email: contactData.email,
        phone: contactData.phone,
        user_id: req.user.id
    });

    if (contactExists) {
        res.status(400);
        throw new Error("Contact already exists!");
    }

    const contact = await Contact.create(contactData);
    res.status(201).json(contact);
})

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to access other user contacts");
    }

    res.status(200).json(contact);
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    const nameError = validateContactName(req.body.name);
    if (nameError) {
        res.status(400);
        throw new Error(nameError);
    }

    if (req.body.email && !validateEmail(req.body.email)) {
        res.status(400);
        throw new Error("Invalid email address format!");
    }

    if (req.body.phone && !validatePhone(req.body.phone)) {
        res.status(400);
        throw new Error("Invalid phone number!");
    }

    const newData = {
        name: req.body.name.toUpperCase(),
        email: req.body.email.toLowerCase(),
        phone: req.body.phone,
    }

    const contactExists = await Contact.findOne({
        email: newData.email,
        phone: newData.phone,
        user_id: req.user.id,
        _id: { $ne: req.params.id }
    });

    if (contactExists) {
        res.status(400);
        throw new Error("Contact already exists!");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        newData,
        { new: true }
    )
    res.status(200).json(updatedContact);
})

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    const deletedContact = await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedContact);
})

export { getContacts, createContact, getContact, updateContact, deleteContact };